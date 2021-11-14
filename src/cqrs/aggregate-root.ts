import { IEvent } from './interfaces';

export abstract class AggregateRoot {
  private _uncommittedEvents: IEvent[] = [];

  dispatch<T extends IEvent>(event: T) {
    this._uncommittedEvents.push(event);
  }

  getUncommittedEvents(): IEvent[] {
    return this._uncommittedEvents;
  }
}
