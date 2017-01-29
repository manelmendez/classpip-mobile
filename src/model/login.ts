export class Login {

  private _id: string;
  private _ttl: number;
  private _created: Date;
  private _userId: number;

  constructor(id?: string, ttl?: number, created?: Date, userId?: number) {
    this._id = id;
    this._ttl = ttl;
    this._created = created;
    this._userId = userId;
  }

  /* tslint:disable */
  static toObject(object: any): Login {
    /* tslint:enable */
    let result: Login = new Login();
    if (object != null) {
      result.id = object.id;
      result.ttl = object.ttl;
      result.created = object.created;
      result.userId = object.userId;
    }
    return result;
  }

  public get id(): string {
    return this._id;
  }

  public set id(value: string) {
    this._id = value;
  }

  public get ttl(): number {
    return this._ttl;
  }

  public set ttl(value: number) {
    this._ttl = value;
  }

  public get created(): Date {
    return this._created;
  }

  public set created(value: Date) {
    this._created = value;
  }

  public get userId(): number {
    return this._userId;
  }

  public set userId(value: number) {
    this._userId = value;
  }
}
