import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-community-management',
  templateUrl: './community-management.component.html',
  styleUrls: ['./community-management.component.scss']
})
export class CommunityManagementComponent implements OnInit {
  public config: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 3,
    navigation: true,
    pagination: false,
    autoplay: {
      delay:3000
    },
    breakpoints:{
       320:{
            slidesPerView: 1, 
            navigation: true,
           }, 

      600: {
        slidesPerView: 2,
        navigation: true,
      }
      , 
      900: {
        slidesPerView: 3,
        navigation: true,
      }
       
    }
};
  team :any[] = [
    {
      name: 'Gédéon CREPPY', 
      role: 'ceo'
    }, 
    {
      name: 'Benjamin Franklin', 
      role: 'ceo',
    }, 
    {
      name: 'Benjamin Franklin', 
      role: 'Directeur technique',
    }, 
    {
      name: 'Benjamin Franklin', 
      role: 'Directeur artistique',
    }, 
    {
      name: 'Benjamin Franklin', 
      role: 'Designer',
    }
  ]
  constructor(
    private http:HttpClient, 
    private productService:ProductService
  ) {

    
   }

  ngOnInit(): void {
  }

 

}
