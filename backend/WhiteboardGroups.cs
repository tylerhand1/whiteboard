namespace backend
{
    public static class WhiteboardGroups
    {
        public static List<WhiteboardGroup> Groups = new List<WhiteboardGroup>();

        public static WhiteboardGroup? FindWhiteboardGroupByGroupName(string groupName)
        {
            return Groups.Find(group => group.GroupName.Equals(groupName));
        }

        public static WhiteboardGroup? FindWhiteboardGroupBySocket(string socket)
        {
            WhiteboardGroup foundWhiteboardGroup = null;
            Groups.ForEach(group =>
            {
                group.SocketsList.ForEach(socketName =>
                {
                    if (socketName.Equals(socket))
                    {
                        foundWhiteboardGroup = group;
                    }
                });
            });

            return foundWhiteboardGroup;
        }
    }
}
