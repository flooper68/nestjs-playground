import { NestFactory } from '@nestjs/core';
import express, { Request, Response } from 'express';

import { AppModule } from './app.module';
import { TestQueries } from './test-module/queries/test-query.handler';
import { TestCommands } from './test-module/commands/test-commands.commands';

async function bootstrap() {
  const context = await NestFactory.createApplicationContext(AppModule);
  const [testCommands, testQueries] = await Promise.all([
    context.resolve(TestCommands),
    context.resolve(TestQueries),
  ]);

  const server = express();

  server.post('/', async (req: Request, res: Response) => {
    await testCommands.testCommand('test');
    res.sendStatus(200);
  });

  server.get('/', async (req: Request, res: Response) => {
    res.json(testQueries.getTestData());
  });

  server.listen(3000);
}

bootstrap();
