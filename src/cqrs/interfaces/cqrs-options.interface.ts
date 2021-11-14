import { Type } from '@nestjs/common';

import { ICommand } from '.';
import { ICommandHandler } from './commands/command-handler.interface';
import { IEventHandler } from './events/event-handler.interface';

export interface CqrsOptions {
  events?: Type<IEventHandler<any>>[];
  commands?: Type<ICommandHandler<ICommand<any>>>[];
  sagas?: Type<any>[];
}
