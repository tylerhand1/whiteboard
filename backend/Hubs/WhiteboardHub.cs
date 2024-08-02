using Microsoft.AspNetCore.SignalR;
using System.Diagnostics;

namespace backend.Hubs
{
    public class WhiteboardHub : Hub
    {

       public async Task Draw(DrawInfo drawInfo)
       {
            WhiteboardGroup? foundGroup = WhiteboardGroups.FindWhiteboardGroupBySocket(Context.ConnectionId);
            await Clients.GroupExcept(foundGroup?.GroupName!, Context.ConnectionId).SendAsync("draw", drawInfo);
        }

        public async Task RequestLobby()
        {
            string? groupName = WhiteboardGroups.GenerateWhiteboardGroupName();
            if (groupName == null)
            {
                await Clients.Caller.SendAsync("requestFail", "No groups available");
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

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            // Remove client from group
            WhiteboardGroup? groupFound = WhiteboardGroups.FindWhiteboardGroupBySocket(Context.ConnectionId);
            if (groupFound != null)
            {
                groupFound.SocketsList.Remove(Context.ConnectionId);

                if (!groupFound.SocketsList.Any()) // should delete the group in WhiteboardGroups if there are no more sockets
                {
                    WhiteboardGroups.Groups.Remove(groupFound);
                }

                await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupFound.GroupName!);
            }
            await base.OnDisconnectedAsync(null);
        }
    }
}
