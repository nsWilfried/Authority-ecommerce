import { Inject, Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {Event} from '../models/event.model'; 
import {EventService} from '../services/event/event.service'; 
import {PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
    providedIn: 'root'
})
export class EventsResolver implements Resolve<Event> {
    page:number = 1;
    constructor(
        private eventService: EventService, 
        @Inject(PLATFORM_ID) private platformId,
    ){}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Event> | Promise<Event> | any {
        if(isPlatformBrowser(this.platformId)){
            return this.eventService.getEvents(this.page);

        }
    }
}
