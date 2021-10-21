import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-page-contact',
  templateUrl: './page-contact.component.html',
  styleUrls: ['./page-contact.component.scss']
})
export class PageContactComponent implements OnInit, AfterViewInit {

  constructor(
    private productService:ProductService

  ) { }

  ngOnInit(
  ): void {
  }

  ngAfterViewInit(){
    this.productService.goTop()
  }

}
