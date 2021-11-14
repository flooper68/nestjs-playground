import { ICommand } from './command.interface';

export interface ICommandHandler<Command extends ICommand> {
  execute(command: Command): Promise<void>;
}
