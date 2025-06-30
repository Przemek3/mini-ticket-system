using Api.Models;

namespace Api.Services
{
    public class TicketService
    {
        private readonly List<TicketDto> _tickets = new();
        private int _nextId = 1;

        public IEnumerable<TicketDto> GetAll() => _tickets;

        public TicketDto? GetById(int id) =>
            _tickets.FirstOrDefault(t => t.Id == id);

        public TicketDto Create(TicketDto ticket)
        {
            ticket.Id = _nextId++;
            _tickets.Add(ticket);
            return ticket;
        }

        public bool UpdateStatus(int id, TicketStatus newStatus)
        {
            var ticket = GetById(id);
            if (ticket == null) return false;
            ticket.Status = newStatus;
            return true;
        }
    }
}
