import { Inject, Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { EventService } from '../services/event/event.service';
import {PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
    providedIn: 'root'
})
export class EventDetailResolver implements Resolve<Event> {
    constructor(
        private eventService: EventService,
        @Inject(PLATFORM_ID) private platformId,
    ){}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Event> | Promise<Event> | any {
        const id : any  = route.paramMap.get('id')
        if(isPlatformBrowser(this.platformId)){
            return this.eventService.getEventById(id);
        }
        
    }
}
