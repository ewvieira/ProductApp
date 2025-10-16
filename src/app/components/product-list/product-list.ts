import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmDialogComponent } from '../confirm-dialog.component';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    CurrencyPipe
  ],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductListComponent implements OnInit {
  @Input() filterId: number | null = null;

  products$!: Observable<Product[]>;
  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'stock', 'actions'];
  

  constructor(private productService: ProductService, private dialog: MatDialog, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    if (this.filterId) {
      this.products$ = this.productService.getProductById(this.filterId).pipe(
        map(product => (product ? [product] : []))
      );
    } else {
      this.products$ = this.productService.getProducts();
    }
  }

  onEdit(product: Product) {
    this.router.navigate(['/edit', product.id!]);
  }

  onDelete(product: Product) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.deleteProduct(product.id!).subscribe(() => {
          this.loadProducts();
          this.cdr.detectChanges();
        });
      }
    });
  }
}