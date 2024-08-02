namespace backend
{
    public static class ConnectedSockets
    {
        public static List<string> ConnectedSocketsList = new List<string>();

        public static string? FindConnectedSocket(string socket)
        {
            return ConnectedSocketsList.Find(connectedSocket => connectedSocket.Equals(socket));
        }
    }
}
