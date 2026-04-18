import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-search-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit {
  searchText: string = '';
  products: Product[] = [];
  filteredProducts: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.applyFilter();
    });
  }

  searchProduct(): void {
    this.applyFilter();
  }

  private applyFilter(): void {
    if (this.searchText.trim() === '') {
      this.filteredProducts = this.products;
      return;
    }

    const searchLower = this.searchText.toLowerCase();
    this.filteredProducts = this.products.filter(p =>
      p.pname.toLowerCase().includes(searchLower) ||
      p.category.toLowerCase().includes(searchLower)
    );
  }
}
