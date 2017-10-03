import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { UtilsService } from './utils.service';
import {CollectionCard} from "../model/collectionCard";
import {AppConfig} from "../app/app.config";
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

    let options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });

    let url: string = this.utilsService.getMyApiUrl() + AppConfig.COLLECTIONS_URL +"/"+id+"/cards";
    console.log(url);

    return this.http.get(url, options)
      .map((response: Response, index: number) => Card.toObjectArray(response.json()));

  }

  /**
   * This method saves the new Collection on DB
   * @param {CollectionCard} collectionCard
   * @returns {Observable<any>}
   */
  public postCollection(collectionCard: CollectionCard){

    let options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });

    let url: string = this.utilsService.getMyUrl() + AppConfig.COLLECTIONS_URL;
    let body = {
      "name": collectionCard.name,
      "num": collectionCard.num,
      "image": collectionCard.image,
      "createdBy": collectionCard.createdBy
    };

    return this.http.post(url,body,options)
      .map(response => {
        return response.json()
      })
      .catch ((error : Response) => this.utilsService.handleAPIError(error));
  }

  public assignCollection(collectionId, groupId) {
    let options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });
    let url: string = AppConfig.COLLECTION_URL+'/'+collectionId+AppConfig.GROUPS_URL+'/rel/'+groupId;

    return this.http.put(url,options)
      .map(response => {
        return response.json()
      })
      .catch ((error : Response) => this.utilsService.handleAPIError(error));
  }
}
