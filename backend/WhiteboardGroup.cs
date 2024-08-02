namespace backend
{
    public class WhiteboardGroup
    {
        public string? GroupName { get; set; }
        public List<string> SocketsList { get; set; }

        public WhiteboardGroup()
        {
            SocketsList = new List<string>();
        }
    }
}
