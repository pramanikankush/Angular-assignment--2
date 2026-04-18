import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly dataUrl = 'assets/db.json';
  private readonly productsSubject = new BehaviorSubject<Product[]>([]);
  private loaded = false;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    if (!this.loaded) {
      this.loaded = true;
      this.http.get<Product[]>(this.dataUrl).subscribe((products) => {
        this.productsSubject.next(products);
      });
    }

    return this.productsSubject.asObservable();
  }

  deleteProduct(pid: number): void {
    const updatedProducts = this.productsSubject.value.filter((product) => product.pid !== pid);
    this.productsSubject.next(updatedProducts);
  }
}
