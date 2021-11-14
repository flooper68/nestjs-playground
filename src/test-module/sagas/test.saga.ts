import { Injectable } from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';

import { TestEvent } from '../events/test.event';
import { ResolveSagaCommand } from '../commands/resolve-saga.command';
import { ICommand, ofType, Saga } from '../../cqrs';
import { IEvent } from './../../cqrs/interfaces/events/event.interface';

@Injectable()
export class TestSagas {
  @Saga()
  testSaga = (events$: Observable<IEvent>): Observable<ICommand> => {
    return events$.pipe(
      ofType<TestEvent>('TestEvent'),
      tap((event) => console.log('Running saga testSaga', event)),
      map((event) => new ResolveSagaCommand({ uuid: event.payload.uuid })),
    );
  };

  @Saga()
  test2Saga = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType<TestEvent>('TestEvent'),
      tap((event) => console.log('Running saga testSaga', event)),
      map((event) => new ResolveSagaCommand({ uuid: event.payload.uuid })),
    );
  };
}
