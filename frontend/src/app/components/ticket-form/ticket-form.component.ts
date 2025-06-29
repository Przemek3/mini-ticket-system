import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { TicketService } from '../../services/ticket.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone: true,
  selector: 'app-ticket-form',
  imports: [ReactiveFormsModule, ButtonModule],
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.scss'],
})
export class TicketFormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private ticketService: TicketService) {
    this.form = this.fb.group({
      title: [''],
      description: [''],
      status: ['Open'],
    });
  }

  submit() {
    if (this.form.valid) {
      this.ticketService.createTicket(this.form.value).subscribe(() => {
        this.form.reset({ status: 'Open' });
      });
    }
  }
}
