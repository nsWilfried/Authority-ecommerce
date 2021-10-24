import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import {EventService} from '../services/event/event.service'
import {DomSanitizer} from '@angular/platform-browser'
import { Event } from '../models/event.model';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ProductService } from '../services/product/product.service';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit, AfterViewInit {

  events: any[] = []
  eventId!: number
  research!: string
  showLoader!:boolean
  constructor(
    private eventService: EventService,
    public sanitizer: DomSanitizer, 
    private route: ActivatedRoute, 
    private productService:ProductService,
    @Inject(PLATFORM_ID) private platformId: object
  ) { 
    this.getAllEvents()

  }

  ngOnInit(): void {

  
  }

  getAllEvents(){

    // tant que la page courante est inférieure au nombre de pages alors je récupère mes events

    if(isPlatformBrowser(this.platformId)){
      this.route.data.subscribe(response => {
        this.events = response.events.events
      })
    }
     
    }
  


  searchEvents(search:string){
    this.showLoader = true
    
    if(search) {
       this.eventService.searchEvents(search).subscribe(response => {
        this.events = response.events
      this.showLoader= false

      })
    }
   
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.productService.goTop()
  }
    
    
  
}
