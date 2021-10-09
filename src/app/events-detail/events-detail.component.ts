import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event/event.service';
import {DomSanitizer} from '@angular/platform-browser'
@Component({
  selector: 'app-events-detail',
  templateUrl: './events-detail.component.html',
  styleUrls: ['./events-detail.component.scss'], 
encapsulation: ViewEncapsulation.None,

})

export class EventsDetailComponent implements OnInit {

  event: any = {}
  constructor(
    private eventService: EventService, 
    private route: ActivatedRoute, 
    public sanitizer: DomSanitizer
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

}
