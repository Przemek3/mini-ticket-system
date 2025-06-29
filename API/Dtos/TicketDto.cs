namespace Api.Models
{
    public class TicketDto
    {
        public int? Id { get; set; } = null;
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public TicketStatus Status { get; set; } = TicketStatus.Open;
    }
    public enum TicketStatus
    {
        Open,
        InProgress,
        Closed
    }

}
