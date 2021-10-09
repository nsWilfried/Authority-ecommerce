import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {Event} from '../models/event.model'; 
import {EventService} from '../services/event/event.service'
@Injectable({
    providedIn: 'root'
})
export class EventsResolver implements Resolve<Event> {
    page:number = 1;
    constructor(
        private eventService: EventService
    ){}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Event> | Promise<Event> | any {
        return this.eventService.getEvents(this.page);
    }
}
