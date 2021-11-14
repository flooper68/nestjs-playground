import { IEvent } from '../../cqrs';

export interface TestEvent extends IEvent {
  type: 'TestEvent';
  payload: { uuid: string };
}
