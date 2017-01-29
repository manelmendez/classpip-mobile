export class Profile {

  private _id: string;
  private _username: string;
  private _name: string;
  private _surname: string;
  private _email: string;

  constructor(id?: string, username?: string, name?: string, surname?: string, email?: string) {
    this._id = id;
    this._username = username;
    this._name = name;
    this._surname = surname;
    this._email = email;
  }

  /* tslint:disable */
  static toObject(object: any): Profile {
    /* tslint:enable */
    let result: Profile = new Profile();
    if (object != null) {
      result.id = object.id;
      result.username = object.username;
      result.name = object.name;
      result.surname = object.surname;
      result.email = object.email;
    }
    return result;
  }

  public get id(): string {
    return this._id;
  }

  public set id(value: string) {
    this._id = value;
  }

  public get username(): string {
    return this._username;
  }

  public set username(value: string) {
    this._username = value;
  }

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

  public get surname(): string {
    return this._surname;
  }

  public set surname(value: string) {
    this._surname = value;
  }

  public get email(): string {
    return this._email;
  }

  public set email(value: string) {
    this._email = value;
  }

}
