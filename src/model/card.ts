/**
 * Created by manel on 27/4/17.
 */
export class Card {

  private _id: string;
  private _image: string;
  private _collection: string;
  private _ratio: string;
  private _rank: string;

  constructor(id?: string, image?: string, collection?: string, ratio?: string, rank?: string) {
    this._id = id;
    this._image = image;
    this._collection = collection;
    this._ratio = ratio;
    this._rank = rank;
  }

  /* tslint:disable */
  static toObject(object: any): Card {
    /* tslint:enable */
    let result: Card = new Card();
    if (object != null) {
      result.id = object.id;
      result.image = object.image;
      result.collection = object.collection;
      result.ratio = object.ratio;
      result.rank = object.rank;
    }
    return result;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get image(): string {
    return this._image;
  }

  set image(value: string) {
    this._image = value;
  }

  get collection(): string {
    return this._collection;
  }

  set collection(value: string) {
    this._collection = value;
  }

  get ratio(): string {
    return this._ratio;
  }

  set ratio(value: string) {
    this._ratio = value;
  }

  get rank(): string {
    return this._rank;
  }

  set rank(value: string) {
    this._rank = value;
  }
}
