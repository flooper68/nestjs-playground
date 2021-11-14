export interface ICommand<Payload = unknown, Type extends string = any> {
  type: Type;
  payload: Payload;
}
