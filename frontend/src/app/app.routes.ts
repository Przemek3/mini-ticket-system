import { Routes } from '@angular/router';
import { TicketFormComponent } from './components/ticket-form/ticket-form.component';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { ExistingTicketComponent } from './components/existing-ticket/existing-ticket.component';

export const routes: Routes = [
  {
    path: 'new',
    component: TicketFormComponent,
  },
  {
    path: 'tickets/:ticketId',
    component: ExistingTicketComponent,
  },
];
