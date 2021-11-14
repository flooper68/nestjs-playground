import { CommandHandler, ICommandHandler } from '../../cqrs';
import { ResolveSagaCommand } from '../commands/resolve-saga.command';

@CommandHandler(ResolveSagaCommand)
export class ResolveSageCommandHandler
  implements ICommandHandler<ResolveSagaCommand>
{
  async execute(command: ResolveSagaCommand) {
    console.log('Executing command', command);
  }
}
