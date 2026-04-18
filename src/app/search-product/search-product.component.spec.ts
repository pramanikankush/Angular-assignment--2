import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { SearchProductComponent } from './search-product.component';
import { ProductService } from '../product.service';

describe('SearchProductComponent', () => {
  let component: SearchProductComponent;
  let fixture: ComponentFixture<SearchProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchProductComponent],
      providers: [
        {
          provide: ProductService,
          useValue: {
            getProducts: () =>
              of([
                { pid: 1001, pname: 'peter england Jacket', price: 4500.2345 },
                { pid: 1005, pname: 'iphone i7', price: 75000.2345 }
              ])
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
