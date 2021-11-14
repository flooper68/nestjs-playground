import { EventBus } from './../../cqrs/event-bus';
import { CommandHandler, ICommandHandler } from '../../cqrs';
import { TestCommand } from '../commands/test.command';
import { TestEntity } from '../domain/test.entity';

@CommandHandler(TestCommand)
export class TestCommandHandler implements ICommandHandler<TestCommand> {
  constructor(private eventBus: EventBus) {}

  async execute(command: TestCommand) {
    console.log('Executing command', command);
    const entity = new TestEntity();
    entity.test(command.payload.uuid);
    this.eventBus.publishAll(entity.getUncommittedEvents());
  }
}
