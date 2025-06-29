import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TicketService } from '../../services/ticket.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Ticket } from '../../models/ticket.model';
import { Status } from '../../models/status.enum';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-existing-ticket',
  imports: [ReactiveFormsModule, FormsModule, SelectModule, ButtonModule],
  templateUrl: './existing-ticket.component.html',
  styleUrls: ['./existing-ticket.component.scss'],
})
export class ExistingTicketComponent implements OnInit {
  newStatus: Status = Status.Open;
  ticket: Ticket = {
    id: 0,
    title: 'First Ticket',
    description: 'stubbfyour description',
    status: Status.Open, // Assuming 'Open' is a valid status
  };
  options: string[] = ['Open', 'InProgress', 'Closed'];

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      const parameter = paramMap.get('ticketId');
      if (parameter !== null && Number.isInteger(+parameter)) {
        const ticketId = Number(parameter);
        this.ticketService.getTicketDetails(ticketId).subscribe(
          (ticket) => {
            this.ticket = ticket;
            this.newStatus = ticket.status;
          },
          (err) => {
            console.error('Błąd podczas pobierania szczegółów ticketu:', err);
          }
        );
      } else {
        console.warn('Nieprawidłowe ticketId:', parameter);
      }
    });
  }

  constructor(
    private ticketService: TicketService,
    private route: ActivatedRoute
  ) {}

  save() {
    this.ticketService
      .updateTicketStatus(this.ticket.id, this.newStatus)
      .subscribe({
        next: () => {
          // Po aktualizacji statusu na backendzie, zaktualizuj lokalny signal
          this.ticketService.updateLocalTicketStatus(
            this.ticket.id,
            this.newStatus
          );
          this.ticket.status = this.newStatus;
          console.log('Zaktualizowano status ticketu');
        },
        error: (err) => {
          console.error('Błąd przy aktualizacji ticketu:', err);
        },
      });
  }
}
