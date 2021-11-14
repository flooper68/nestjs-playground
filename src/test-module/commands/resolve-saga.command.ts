import { ICommand } from '../../cqrs';

interface Payload {
  uuid: string;
}

export class ResolveSagaCommand
  implements ICommand<Payload, 'ResolveSagaCommand'>
{
  type = 'ResolveSagaCommand' as const;
  constructor(public readonly payload: Payload) {}
}
