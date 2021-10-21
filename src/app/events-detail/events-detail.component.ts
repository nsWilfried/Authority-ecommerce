import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event/event.service';
import {DomSanitizer} from '@angular/platform-browser'
import { ProductService } from '../services/product/product.service';
@Component({
  selector: 'app-events-detail',
  templateUrl: './events-detail.component.html',
  styleUrls: ['./events-detail.component.scss'], 
encapsulation: ViewEncapsulation.None,

})

export class EventsDetailComponent implements OnInit, AfterViewInit {

  event: any = {}
  constructor(
    private eventService: EventService, 
    private route: ActivatedRoute, 
    public sanitizer: DomSanitizer, 
    private productService:ProductService
  ) { 

    this.getSingleEvent()

  }

  ngOnInit(): void {
  }

  getSingleEvent(){
    return this.route.data.subscribe(response => {
      this.event = response.event
    })
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.productService.goTop()
  }
}
