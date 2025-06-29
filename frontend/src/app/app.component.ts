import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { SplitterModule } from 'primeng/splitter';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    TicketListComponent,
    SplitterModule,
    ButtonModule,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';
}
