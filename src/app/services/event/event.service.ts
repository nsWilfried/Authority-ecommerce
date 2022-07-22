import { Injectable } from '@angular/core';
import {environment as env} from 'src/environments/environment'
import {HttpClient}  from '@angular/common/http'
import { Observable } from 'rxjs';
import { Event } from 'src/app/models/event.model';
@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    private http: HttpClient
  ) { }


  /**
   * 
   * @param page la page courante
   * @param per_page le nombre de pages total de la requête
   * @returns une observable contenant l'ensemble de nos évènements
   */
  getEvents(page, per_page = 12): Observable<Event>{
    return this.http.get<Event>(`${env.origin}/${env.eventEndpoint}/?page=${page}&per_page=${per_page}`)
  }

  /**
   * 
   * @param id id de l'event
   * @returns  retourner un évènement en fonction de son id
   */

  getEventById(id: number): Observable<Event>{
    return this.http.get<Event>(`${env.origin}/${env.eventEndpoint}/${id}`)
  }

  /**
   * 
   * @param searchText la recherche de l'utilisateur
   * @returns retourner l'évènement correspondant à la recherche utilisateur
   */
  searchEvents(searchText: string ): Observable<Event>{
    return this.http.get<Event>(`${env.origin}/${env.eventEndpoint}/?search=${searchText}`)
  }
}
