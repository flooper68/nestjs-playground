import { Module } from '@nestjs/common';

import { CqrsModule } from './cqrs';
import { TestModule } from './test-module/test.module';

@Module({
  imports: [TestModule, CqrsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
