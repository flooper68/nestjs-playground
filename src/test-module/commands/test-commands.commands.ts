import { Injectable } from '@nestjs/common';

import { CommandBus } from '../../cqrs';
import { TestCommand } from './test.command';

@Injectable()
export class TestCommands {
  constructor(private readonly bus: CommandBus) {}

  testCommand(uuid: string) {
    this.bus.execute(new TestCommand({ uuid }));
  }
}
