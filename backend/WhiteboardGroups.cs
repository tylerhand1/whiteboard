namespace backend
{
    public static class WhiteboardGroups
    {
        public static List<WhiteboardGroup> Groups = new List<WhiteboardGroup>();
        private static readonly Random rand = new Random();

        public static WhiteboardGroup? FindWhiteboardGroupByGroupName(string groupName)
        {
            return Groups.Find(group => group.GroupName!.Equals(groupName));
        }

        public static WhiteboardGroup? FindWhiteboardGroupBySocket(string socket)
        {
            WhiteboardGroup? foundWhiteboardGroup = null;
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

        public static string? GenerateWhiteboardGroupName()
        {
            int groupNumber;

            if (Groups.Count == 90000) // Max of 90000
            {
                return null;
            }

            while(true)
            {
                if (Groups.Count == 90000) // Check again in case count becomes 90,000 while searching for a room
                {
                    return null;
                }

                groupNumber = rand.Next(10000, 99999);
                string groupName = groupNumber.ToString();

                bool isUnique = true;

                Groups.ForEach(group =>
                {
                    if (group.GroupName!.Equals(groupName))
                    {
                        isUnique = false;
                    }
                });

                if (isUnique)
                {
                    break;
                }
            }

            return groupNumber.ToString();
        }
    }
}
