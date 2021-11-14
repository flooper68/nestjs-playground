import { Injectable, Type } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import 'reflect-metadata';

import { COMMAND_HANDLER_METADATA } from './decorators/constants';
import { CommandHandlerNotFoundException } from './exceptions/command-not-found.exception';
import { ICommand, ICommandHandler } from './interfaces/index';
import { CommandHandlerExistsException } from '.';
import { InvalidCommandHandlerException } from './exceptions/invalid-command-handler.exception';

export type CommandHandlerType = Type<ICommandHandler<ICommand<unknown, any>>>;

@Injectable()
export class CommandBus {
  private _handlers = new Map<string, ICommandHandler<any>>();

  constructor(private readonly moduleRef: ModuleRef) {}

  async execute(command: ICommand<unknown, any>): Promise<void> {
    const handler = this._handlers.get(command.constructor.name);

    if (!handler) {
      throw new CommandHandlerNotFoundException(command.constructor.name);
    }

    await handler.execute(command);
  }

  register(handlers: CommandHandlerType[] = []) {
    console.log('Registering command handlers', handlers);
    handlers.forEach((handler) => this.registerHandler(handler));
  }

  protected registerHandler(handler: CommandHandlerType) {
    const instance = this.moduleRef.get(handler, { strict: false });

    if (!instance) {
      throw new InvalidCommandHandlerException();
    }
    const target = Reflect.getMetadata(COMMAND_HANDLER_METADATA, handler);

    if (!target) {
      throw new InvalidCommandHandlerException();
    }

    if (this._handlers.get(target.name)) {
      throw new CommandHandlerExistsException(target.name);
    }

    console.log(
      `Subscribing command handler ${
        Object.getPrototypeOf(instance).constructor.name
      } to command ${target.name}`,
    );
    this._handlers.set(target.name, instance);
  }
}
