export interface IConnection {
  connectionState: boolean,
  socketId: string,
  groupName: number,
  isLoaded: boolean,
  error: boolean,
}

export interface IState {
  size: number,
  color: string,
  connection: IConnection
}

export interface IDrawArgs {
  prevX: number,
  prevY: number,
  currentX: number,
  currentY: number,
  lineWidth: number,
  strokeStyle: string
}