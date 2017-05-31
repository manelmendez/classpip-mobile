import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { UtilsService } from './utils.service';


@Injectable()
export class CollectionService {

  constructor(
    public http: Http,
    public utilsService: UtilsService) { }



}
