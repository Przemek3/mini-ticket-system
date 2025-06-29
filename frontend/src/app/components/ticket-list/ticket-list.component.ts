// components/ticket-list/ticket-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Ticket } from '../../models/ticket.model';
import { TicketService } from '../../services/ticket.service';
import { Status } from '../../models/status.enum';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { tick } from '@angular/core/testing';

@Component({
  standalone: true,
  imports: [CommonModule, SelectModule, FormsModule, RouterModule],
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],
})
export class TicketListComponent implements OnInit {
  selectedTicket: Ticket | null = null;

  constructor(public ticketService: TicketService, private router: Router) {}

  ngOnInit() {
    this.ticketService.loadTickets().subscribe();
  }

  get tickets() {
    return this.ticketService.tickets();
  }

  loadTickets() {}

  selectTicket(ticket: Ticket) {
    this.selectedTicket = ticket;
    this.router.navigate(['/tickets', ticket.id]);
  }
}
