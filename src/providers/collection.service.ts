import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { UtilsService } from './utils.service';
import {CollectionCard} from "../model/collectionCard";
import {AppConfig} from "../app/app.config";
import {Student} from "../model/student";
import {Avatar} from "../model/avatar";
import {Card} from "../model/card";


@Injectable()
export class CollectionService {

  constructor(public http: Http,
              public utilsService: UtilsService) {
  }


  /**
   * This method returns the list of CollectionCards in the school of the
   * current logged in user
   * @return {CollectionCard} returns an array of collectionCards
   */
  public getMyCollections(): Observable<Array<CollectionCard>> {
    var count = 0;

    let options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });

    let url: string = this.utilsService.getMyUrl() + AppConfig.COLLECTIONS_URL;
    console.log(url);

    return this.http.get(url, options)
      .map((response: Response, index: number) => CollectionCard.toObjectArray(response.json()));

  }
  /**
   * This method returns the list of cards of a certain collectionCard
   * @return {Card} returns an array of Cards
   */
  public getCollectionDetails(id): Observable<Array<Card>> {
    var count = 0;

    let options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });

    let url: string = this.utilsService.getMyApiUrl() + AppConfig.COLLECTIONS_URL +"/"+id+"/cards";
    console.log(url);

    return this.http.get(url, options)
      .map((response: Response, index: number) => Card.toObjectArray(response.json()));

  }
  public postCollection(name, num, image){
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(headers, this.utilsService.currentUser.id)
    });
    alert(JSON.stringify(headers));
    /*let options = new RequestOptions({
      headers: headers
    });*/
    let body = JSON.stringify({
      name:name,
      num:num,
      image:image,
      createdBy:this.utilsService.currentUser.id
    });


    let url: string = AppConfig.SERVER_URL + AppConfig.COLLECTIONS_URL;
    return this.http.post(url,body,options)
      .map(response => {
        alert(response);
        return response.json()
      })
      .catch((error: Response) => this.utilsService.handleAPIError(error));
  }
}
