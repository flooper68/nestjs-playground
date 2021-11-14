import { ICommand } from '../../cqrs';

interface Payload {
  uuid: string;
}

export class TestCommand implements ICommand<Payload, 'TestCommand'> {
  public type = 'TestCommand' as const;
  constructor(public readonly payload: Payload) {}
}
