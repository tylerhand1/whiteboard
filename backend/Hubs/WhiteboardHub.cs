using Microsoft.AspNetCore.SignalR;

namespace backend.Hubs
{
    public class WhiteboardHub : Hub
    {
        public async Task NewMessage(long username, string message) =>
            await Clients.All.SendAsync("messageReceived", username, message);

       public async Task Draw(DrawInfo drawInfo)
       {
            WhiteboardGroup? foundGroup = WhiteboardGroups.FindWhiteboardGroupBySocket(Context.ConnectionId);
            if (foundGroup != null)
            {
                await Clients.Group(foundGroup.GroupName).SendAsync("Send", "Draw");
            }
        }

        public async Task AddToGroup(string groupName)
        {
            string? socketFound = ConnectedSockets.FindConnectedSocket(Context.ConnectionId);
            if (socketFound != null)
            {
                await Clients.Caller.SendAsync("Send", "Client is already in a room");
                return;
            }

            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            WhiteboardGroup group;
            WhiteboardGroup? groupFound = WhiteboardGroups.FindWhiteboardGroupByGroupName(groupName);
            if (groupFound == null)
            {
                WhiteboardGroup newGroup = new WhiteboardGroup() { GroupName = groupName };
                group = newGroup;
            }
            else
            {
                group = groupFound;
            }
            ConnectedSockets.ConnectedSocketsList.Add(Context.ConnectionId);
            group.SocketsList.Add(Context.ConnectionId);
            WhiteboardGroups.Groups.Add(group);

            await Clients.Group(groupName).SendAsync("Send", $"{Context.ConnectionId} has joined the group {groupName}");

        }
        public async Task RemoveFromGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);

            await Clients.Group(groupName).SendAsync("Send", $"{Context.ConnectionId} has left the group {groupName}.");
        }
    }
}
