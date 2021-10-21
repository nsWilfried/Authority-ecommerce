import { Component,Inject,OnInit } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';

// import Swiper core and required modules
import SwiperCore, { Pagination ,  Navigation, Autoplay} from "swiper";
import { DOCUMENT } from '@angular/common';
import { transition, trigger, useAnimation } from '@angular/animations';
import { rotateCubeToLeft,moveFromRight, moveFromLeft } from 'ngx-router-animations';
// install Swiper modules
SwiperCore.use([Pagination, Autoplay,  Navigation]);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'], 
  animations: [
    trigger('moveFromRight', [
      transition('home <=> checkout', useAnimation(moveFromRight)),
      transition('home <=> cart', useAnimation(moveFromRight)),
      transition('home <=> cm', useAnimation(moveFromRight)),
      transition('home <=> menu', useAnimation(moveFromRight)),
      transition('home <=> contact', useAnimation(moveFromRight)), 
      transition('home <=> events', useAnimation(moveFromRight)),
      transition('home <=> event-detail', useAnimation(moveFromRight)),
      transition('home <=> product-detail', useAnimation(moveFromRight)),
      transition('home <=> account', useAnimation(moveFromRight)),
      transition('home <=> user', useAnimation(moveFromRight)),


    ])
  ]
})

export class AppComponent implements OnInit {

  title = 'Bricia';
  state = this.loader.useRef('http')
  constructor(
    private loader: LoadingBarService, 
    private router:Router, 
    @Inject(DOCUMENT) public document: Document

  ){

    this.router.events.subscribe(ev => {
      if (ev instanceof NavigationStart) {
        this.state.start();
      }
      if (
        ev instanceof NavigationEnd ||
        ev instanceof NavigationCancel ||
        ev instanceof NavigationError
      ) {
        this.state.complete();
      }
    })
  
   
		  

  }

  getAnimation(outlet){
    return outlet.activatedRouteData.animation
  }
	
  ngOnInit(){

    
	
	

	
  }

}
