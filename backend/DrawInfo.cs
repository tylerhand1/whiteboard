namespace backend
{
    public class DrawInfo
    {
        public int PrevX { get; set; }
        public int PrevY { get; set; }
        public int CurrentX { get; set; }
        public int CurrentY { get; set; }
        public int LineWidth { get; set; }
        public string? StrokeStyle { get; set; }
    }
}
