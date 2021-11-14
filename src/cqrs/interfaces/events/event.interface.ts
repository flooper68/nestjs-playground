export interface IEvent<Type extends string = any, Payload = unknown> {
  type: Type;
  payload: Payload;
}
