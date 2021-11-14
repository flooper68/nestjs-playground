export class CommandHandlerExistsException extends Error {
  constructor(commandName: string) {
    super(`The command handler ${commandName} already exists!`);
  }
}
