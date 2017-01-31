export class Student {

  private _id: string;

  constructor(id?: string) {
    this._id = id;
  }

  /* tslint:disable */
  static toObject(object: any): Student {
    /* tslint:enable */
    let result: Student = new Student();
    if (object != null) {
      result.id = object.id;
    }
    return result;
  }

  /* tslint:disable */
  static toObjectArray(object: any): Array<Student> {
    /* tslint:enable */
    let resultArray: Array<Student> = new Array<Student>();
    if (object != null) {
      for (let i = 0; i < object.length; i++) {
        resultArray.push(Student.toObject(object[i]));
      }
    }
    return resultArray;
  }

  public get id(): string {
    return this._id;
  }

  public set id(value: string) {
    this._id = value;
  }

}
