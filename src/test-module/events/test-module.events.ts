import { TestEntityEventCreators } from './../domain/test.entity';

const TestModuleEventCreators = {
  ...TestEntityEventCreators,
};

export const TestModuleEvents = Object.values(TestModuleEventCreators).reduce(
  (memo, item) => {
    memo[item.type] = item.type;
    return memo;
  },
  {} as {
    [K in keyof typeof TestEntityEventCreators as `TestEntity/${K}`]: `TestEntity/${K}`;
  },
);

export type TestModuleEvents = typeof TestModuleEvents;

type TestDomainEventMapOriginal = {
  [K in keyof typeof TestModuleEventCreators]: unknown;
};

export type TestDomainEventMap = {
  [K in keyof typeof TestModuleEventCreators as `TestEntity/${K}`]: {
    type: `TestEntity/${K}`;
    payload: Parameters<typeof TestModuleEventCreators[K]>[0];
  };
};

export type TestDomainEvent = {
  [K in keyof TestDomainEventMapOriginal]: {
    type: `TestEntity/${K}`;
    payload: Parameters<typeof TestModuleEventCreators[K]>[0];
  };
}[keyof TestDomainEventMapOriginal];

export type PickEvent<Key extends keyof TestDomainEventMap> =
  TestDomainEventMap[Key];
