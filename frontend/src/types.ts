export interface IConnection {
  connectionState: boolean,
  socketId: string,
  groupName: number
}

export interface IState {
  size: number,
  color: string,
  connection: IConnection
}