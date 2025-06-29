using Api.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net.Sockets;

namespace api.Controllers
{


    [ApiController]
    [Route("tickets")]
    public class TicketsController : ControllerBase
    {
        private static readonly List<TicketDto> Tickets = new();
        private static int _nextId = 1;

        [HttpGet]
        public ActionResult<IEnumerable<TicketDto>> GetAll()
        {
            return Ok(Tickets);
        }

        [HttpGet("{id}")]
        public ActionResult<TicketDto> GetById(int id)
        {
            var ticket = Tickets.FirstOrDefault(t => t.Id == id);
            if (ticket == null)
                return NotFound();

            return Ok(ticket);
        }

        //  Rezygnuję z asynchroniczności, bo i tak nie łączy się to obecnie z bazą danych.
        //  Zdecydowałbym się na asynchroniczność w sytuacji w której wiedziałbym, że aplikacja będzie w ten sposób rozwijana.
        [HttpPost]
        public ActionResult<TicketDto> Create([FromBody] TicketDto ticket)
        {
            ticket.Id = _nextId++;
            Tickets.Add(ticket);
            return CreatedAtAction(nameof(GetAll), new { id = ticket.Id }, ticket);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateStatus(int id, [FromBody] TicketDto updatedTicket)
        {
            var ticket = Tickets.FirstOrDefault(t => t.Id == id);
            if (ticket == null)
                return NotFound();

            ticket.Status = updatedTicket.Status;
            return NoContent();
        }
    }
}