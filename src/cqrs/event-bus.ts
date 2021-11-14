import { Injectable, Type } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { isFunction } from 'util';

import { CommandBus } from './command-bus';
import { EVENTS_HANDLER_METADATA, SAGA_METADATA } from './decorators/constants';
import { InvalidSagaException } from './exceptions';
import { IEvent, IEventHandler, ISaga } from './interfaces';
import { InvalidEventsHandlerException } from './exceptions/invalid-events-handler.exception';

export type EventHandlerType = Type<IEventHandler<IEvent>>;

@Injectable()
export class EventBus {
  protected _subject$ = new Subject<IEvent>();
  protected readonly subscriptions: Subscription[];

  constructor(
    private readonly commandBus: CommandBus,
    private readonly moduleRef: ModuleRef,
  ) {
    this.subscriptions = [];
  }

  onModuleDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  publish(event: IEvent) {
    console.log('Event published', event);
    return this._subject$.next(event);
  }

  publishAll(events: IEvent[]) {
    return events.map((event) => this.publish(event));
  }

  registerSagas(types: Type<unknown>[] = []) {
    console.log('Registering sagas', types);
    const sagas = types
      .map((target) => {
        const metadata = Reflect.getMetadata(SAGA_METADATA, target) || [];

        const instance = this.moduleRef.get(target, { strict: false });

        if (!instance) {
          throw new InvalidSagaException();
        }

        return metadata.map((key: string) => ({
          handler: instance[key].bind(instance),
          class: target.name,
          method: key,
        }));
      })
      .flat();

    sagas.forEach((saga) => this.registerSaga(saga));
  }

  register(handlers: EventHandlerType[] = []) {
    console.log(`Registering event handlers`, handlers);
    handlers.forEach((handler) => this.registerHandler(handler));
  }

  protected registerHandler(handler: EventHandlerType) {
    const instance = this.moduleRef.get(handler, { strict: false });

    if (!instance) {
      throw new InvalidEventsHandlerException();
    }
    const eventsMetadata = Reflect.getMetadata(
      EVENTS_HANDLER_METADATA,
      handler,
    );

    eventsMetadata.map((metadata) => {
      const stream$ = this._subject$.pipe(
        filter((event) => {
          return event.type === metadata;
        }),
      );
      console.log(`Subscribing handler ${handler.name} to event ${metadata}`);
      const subscription = stream$.subscribe((event) => instance.handle(event));
      this.subscriptions.push(subscription);
    });
  }

  protected registerSaga(saga: {
    handler: ISaga<IEvent>;
    class: string;
    method: string;
  }) {
    if (!isFunction(saga.handler)) {
      throw new InvalidSagaException();
    }
    const stream$ = saga.handler(this._subject$);
    if (!(stream$ instanceof Observable)) {
      throw new InvalidSagaException();
    }

    console.log(`Subscribing saga ${saga.class}.${saga.method}`);
    const subscription = stream$
      .pipe(filter((command) => !!command))
      .subscribe((command) => {
        this.commandBus.execute(command);
      });

    this.subscriptions.push(subscription);
  }
}
