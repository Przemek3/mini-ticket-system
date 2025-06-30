import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { TicketService } from '../../services/ticket.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-ticket-form',
  imports: [ReactiveFormsModule, ButtonModule],
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.scss'],
})
export class TicketFormComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ticketService: TicketService,
    private router: Router
  ) {
    this.form = this.fb.group({
      title: [''],
      description: [''],
      status: ['Open'],
    });
  }

  submit() {
    if (this.form.valid) {
      this.ticketService.createTicket(this.form.value).subscribe(
        (ticket) => {
          this.form.reset({ status: 'Open' });
          this.ticketService.updateTickets(ticket);
          this.router.navigate(['/tickets', ticket.id]);
        },
        (error) => {
          console.error('Error creating ticket:', error);
        }
      );
    }
  }
}
