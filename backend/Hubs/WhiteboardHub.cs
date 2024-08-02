using Microsoft.AspNetCore.SignalR;

namespace backend.Hubs
{
    public class WhiteboardHub : Hub
    {

       public async Task Draw(DrawInfo drawInfo)
       {
            WhiteboardGroup? foundGroup = WhiteboardGroups.FindWhiteboardGroupBySocket(Context.ConnectionId);
            if (foundGroup != null)
            {
                await Clients.Group(foundGroup.GroupName!).SendAsync("draw", drawInfo);
            }
        }

        public async Task RequestLobby()
        {
            string? groupName = WhiteboardGroups.GenerateWhiteboardGroupName();
            if (groupName == null)
            {
                await Clients.Caller.SendAsync("RequestFail", "No groups available");
                return;
            }

            await AddToGroup(groupName);
        }

        public async Task JoinLobby(string groupName)
        {
            WhiteboardGroup? groupFound = WhiteboardGroups.FindWhiteboardGroupByGroupName(groupName);
            if (groupFound != null)
            {
                await AddToGroup(groupName);
            }
            else
            {
                await Clients.Caller.SendAsync("joinFail", "Lobby does not exist");
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

            await Clients.Caller.SendAsync("joinSuccess", Context.ConnectionId, groupName);

        }
        public async Task RemoveFromGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);

            await Clients.Group(groupName).SendAsync("Send", $"{Context.ConnectionId} has left the group {groupName}.");
        }
    }
}
