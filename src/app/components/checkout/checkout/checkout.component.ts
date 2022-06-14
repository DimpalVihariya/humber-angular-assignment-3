import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { filter } from 'rxjs';
import { take } from 'rxjs';
import { from, map, mergeMap, Observable, reduce, Subscription } from 'rxjs';
import { OrderData } from 'src/app/models/order.interface';
import { ProductData } from 'src/app/models/product.interface';
import { DataStoreService } from 'src/app/services/data-store.service';
import { ProductsService } from 'src/app/services/products.service';
import { ItemComponent } from '../../item/item.component';


@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private dataStore: DataStoreService, private productsService : ProductsService) { }
  formSubmitted: boolean = false;
  submitted : boolean = false;
  buttondisable: boolean = true;
  checkoutForm: FormGroup | any;
  cartItems$!: Observable<ProductData[]>;
  list$!: Observable<ProductData[]>;
  productSubscription!: Subscription;
  ///total$!: Observable<number>;
  products: ProductData[] | any;
  Country: any = ['Canada', 'USA'];
  CardType: any = ['Visa', 'Master'];
 total :number|string = 0;
 OrderNumber :number|string = 0;
 orders!: OrderData[]|any;
  ngOnInit(): void {

    this.checkoutForm = this.formBuilder.group({
      fname: new FormControl('', [Validators.required]),
      lname: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      city : new FormControl('', [Validators.required]),
      postalcode : new FormControl('', [Validators.required]),
      cname : new FormControl('', [Validators.required]),
      ccnum : new FormControl('', [Validators.required,Validators.minLength(16), Validators.maxLength(16) , Validators.pattern('^[0-9]{16}$')]),
      cvv : new FormControl('', [Validators.required, Validators.minLength(4) ,Validators.pattern('^[0-9]{4}$')]),
      expdate : new FormControl('', [Validators.required, Validators.pattern(/^\d{4}\-(0[1–9]|1[012])\-(0[1–9]|[12][0–9]|3[01])$/)]),
      country : new FormControl('', [Validators.required])
    });

    this.cartItems$ = this.dataStore.cartItems$;
 
  this.dataStore.cartItems$.pipe(
  filter( (x: any) => x.length > 0),
  take(2)
).subscribe((cartItems: ProductData[]) => {
    cartItems.forEach(item => {
   this.total = +this.total + item.price;
  })
  this.total = '$' + this.total
  ///////

  this.OrderNumber = Math.ceil(Math.random()*1000000).toString();
 this.orders.orderNumber = this.OrderNumber;
 this.dataStore.cartItems$.pipe(
filter((x:any) => x.length > 0),
take(1)).subscribe((cartItem: ProductData[]) => {
cartItem.forEach(element => {
  this.orders.total=+element.price.substring(1,element.price.length)+this.orders.total
});
this.dataStore.addToOrder(this.orders);
console.log(this.orders);

})

})
  
  }

  get f(): { [key: string]: AbstractControl } {
    return this.checkoutForm.controls;
  }
  onSubmit(): void {
    this.submitted = true;

    if (this.checkoutForm.invalid) {
      return;
    }



   //generate random order number and add in data store here

    console.log(JSON.stringify(this.checkoutForm.value, null, 2));
  }

}
