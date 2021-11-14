import { EventsHandler, IEventHandler } from '../../cqrs';
import { TestEvent } from '../events/test.event';

@EventsHandler('TestEvent')
export class TestEventHandler implements IEventHandler<TestEvent> {
  handle(event: TestEvent) {
    console.log('Handling event', event);
  }
}
