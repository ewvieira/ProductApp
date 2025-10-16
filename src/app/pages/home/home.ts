import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProductListComponent } from '../../components/product-list/product-list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ProductListComponent
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})

export class HomeComponent {
  filterId: number | null = null;

  constructor(private router: Router) {}

  onNewProduct() {
    this.router.navigate(['/create']);
  }
}
