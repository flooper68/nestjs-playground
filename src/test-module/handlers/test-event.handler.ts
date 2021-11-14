import { EventsHandler, IEventHandler } from '../../cqrs';
import { PickEvent, TestModuleEvents } from '../events/test-module.events';

type EventType = PickEvent<TestModuleEvents['TestEntity/TestEvent']>;

@EventsHandler(TestModuleEvents['TestEntity/TestEvent'])
export class TestEventHandler implements IEventHandler<EventType> {
  handle(event: EventType) {
    console.log('Handling event', event);
  }
}
