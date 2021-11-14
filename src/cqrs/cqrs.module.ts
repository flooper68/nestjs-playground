import { Module, OnApplicationBootstrap } from '@nestjs/common';

import { CommandBus } from './command-bus';
import { EventBus } from './event-bus';
import { ExplorerService } from './services/explorer.service';

@Module({
  providers: [CommandBus, EventBus, ExplorerService],
  exports: [CommandBus, EventBus],
})
export class CqrsModule implements OnApplicationBootstrap {
  constructor(
    private readonly explorerService: ExplorerService,
    private readonly eventsBus: EventBus,
    private readonly commandsBus: CommandBus,
  ) {}

  onApplicationBootstrap() {
    console.log('Bootstrapping cqrs module');
    const { events, sagas, commands } = this.explorerService.explore();

    this.eventsBus.register(events);
    this.commandsBus.register(commands);
    this.eventsBus.registerSagas(sagas);
  }
}
