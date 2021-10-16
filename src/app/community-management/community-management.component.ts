import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-community-management',
  templateUrl: './community-management.component.html',
  styleUrls: ['./community-management.component.scss']
})
export class CommunityManagementComponent implements OnInit {
  constructor(
    private http:HttpClient, 
    private productService:ProductService
  ) {

    
   }

  ngOnInit(): void {
  }

 

}
