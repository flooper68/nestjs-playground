import { filter } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';

import { ResolveSagaCommand } from '../commands/resolve-saga.command';
import { ICommand, Saga } from '../../cqrs';
import {
  TestDomainEvent,
  TestModuleEvents,
} from '../events/test-module.events';

@Injectable()
export class TestSagas {
  @Saga()
  testSaga = (events$: Observable<TestDomainEvent>): Observable<ICommand> => {
    return events$.pipe(
      map((event) => {
        if (event.type === TestModuleEvents['TestEntity/TestEvent']) {
          return event;
        }
        return undefined;
      }),
      filter((event) => !!event),
      tap((event) => console.log('Running saga testSaga', event)),
      map((event) => new ResolveSagaCommand({ uuid: event.payload.uuid })),
    );
  };

  @Saga()
  test2Saga = (events$: Observable<TestDomainEvent>): Observable<ICommand> => {
    return events$.pipe(
      map((event) => {
        if (event.type === TestModuleEvents['TestEntity/TestEvent']) {
          return event;
        }
        return undefined;
      }),
      filter((event) => !!event),
      tap((event) => console.log('Running saga testSaga', event)),
      map((event) => new ResolveSagaCommand({ uuid: event.payload.uuid })),
    );
  };
}
