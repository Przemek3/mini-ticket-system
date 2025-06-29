// services/ticket.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Ticket } from '../models/ticket.model';
import { Observable, tap } from 'rxjs';
import { Status } from '../models/status.enum';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private apiUrl = 'https://localhost:7275/tickets';
  tickets = signal<Ticket[]>([]);

  constructor(private http: HttpClient) {}

  updateLocalTicketStatus(ticketId: number, newStatus: Ticket['status']) {
    const updated = this.tickets().map((ticket) =>
      ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
    );
    this.tickets.set(updated);
  }

  loadTickets(): Observable<Ticket[]> {
    return this.http
      .get<Ticket[]>(this.apiUrl)
      .pipe(tap((tickets) => this.tickets.set(tickets)));
  }

  getTickets(): Observable<any> {
    return this.loadTickets();
  }

  getTicketDetails(id: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.apiUrl}/${id}`);
  }

  createTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(this.apiUrl, ticket);
  }

  updateTicketStatus(id: number, status: Status): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, { status });
  }
}
