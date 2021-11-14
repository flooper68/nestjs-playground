import { Module } from '@nestjs/common';

import { TestCommandHandler } from './handlers/test-command.handler';
import { TestEventHandler } from './handlers/test-event.handler';
import { ResolveSageCommandHandler } from './handlers/resolve-saga.handler';
import { TestSagas } from './sagas/test.saga';
import { TestQueries } from './queries/test-query.handler';
import { CqrsModule } from '../cqrs';
import { TestCommands } from './commands/test-commands.commands';

@Module({
  imports: [CqrsModule],
  providers: [
    TestCommandHandler,
    ResolveSageCommandHandler,
    TestEventHandler,
    TestSagas,
    TestQueries,
    TestCommands,
  ],
})
export class TestModule {}
