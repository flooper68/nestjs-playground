import { AggregateRoot } from '../../cqrs';
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { noop } from 'rxjs';

interface State {
  test: string;
}

export const { reducer, actions: events } = createSlice({
  name: 'TestEntity',
  initialState: { test: '' } as State,
  reducers: {
    TestEvent: (state, action: PayloadAction<{ uuid: string }>) => {
      state.test = action.payload.uuid;
    },
    SecondEvent: (_state, _action: PayloadAction<{ name: string }>) => {
      noop();
    },
  },
});

export const TestEntityEventCreators = events;

export const store = configureStore({ reducer });

export class TestEntity extends AggregateRoot {
  test(uuid: string) {
    this.dispatch(events.TestEvent({ uuid }));
  }
}
