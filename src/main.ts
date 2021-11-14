import { NestFactory } from '@nestjs/core';
import express, { Request, Response } from 'express';

import { AppModule } from './app.module';
import { TestQueries } from './test-module/queries/test-queries';
import { TestCommands } from './test-module/commands/test-commands.commands';

async function bootstrap() {
  const context = await NestFactory.createApplicationContext(AppModule);
  const [TestModuleCommands, TestModuleQueries] = await Promise.all([
    context.resolve(TestCommands),
    context.resolve(TestQueries),
  ]);

  const server = express();

  server.post('/', async (req: Request, res: Response) => {
    await TestModuleCommands.testCommand('test');
    res.sendStatus(200);
  });

  server.get('/', async (req: Request, res: Response) => {
    res.json(await TestModuleQueries.getTestData());
  });

  server.listen(3000);
}

bootstrap();
