import { AggregateRoot } from '../../cqrs';

export class TestEntity extends AggregateRoot {
  test(uuid: string) {
    this.dispatch({ payload: { uuid }, type: 'TestEvent' });
  }
}
