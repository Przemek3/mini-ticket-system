using Api.Models;
using Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("tickets")]
    public class TicketsController : ControllerBase
    {
        private readonly TicketService _service;

        public TicketsController(TicketService service)
        {
            _service = service;
        }

        [HttpGet]
        public ActionResult<IEnumerable<TicketDto>> GetAll() => Ok(_service.GetAll());

        [HttpGet("{id}")]
        public ActionResult<TicketDto> GetById(int id)
        {
            var ticket = _service.GetById(id);
            return ticket == null ? NotFound() : Ok(ticket);
        }

        [HttpPost]
        public ActionResult<TicketDto> Create([FromBody] TicketDto ticket)
        {
            var created = _service.Create(ticket);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateStatus(int id, [FromBody] TicketDto updated)
        {
            var success = _service.UpdateStatus(id, updated.Status);
            return success ? NoContent() : NotFound();
        }
    }
}
