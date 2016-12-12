// IONIC:

export class ConfigMock {
  /* tslint:disable */
  public get(): any {
    /* tslint:enable */
    return '';
  }

  public getBoolean(): boolean {
    return true;
  }

  public getNumber(): number {
    return 1;
  }
}

export class FormMock {
  /* tslint:disable */
  public register(): any {
    /* tslint:enable */
    return true;
  }
}

export class NavMock {

  /* tslint:disable */
  public pop(): any {
    /* tslint:enable */
    return new Promise(function (resolve: Function): void {
      resolve();
    });
  }

  /* tslint:disable */
  public push(): any {
    /* tslint:enable */
    return new Promise(function (resolve: Function): void {
      resolve();
    });
  }

  /* tslint:disable */
  public getActive(): any {
    /* tslint:enable */
    return {
      'instance': {
        'model': 'something',
      },
    };
  }

  /* tslint:disable */
  public setRoot(): any {
    /* tslint:enable */
    return true;
  }
}

export class PlatformMock {
  /* tslint:disable */
  public ready(): any {
    /* tslint:enable */
    return new Promise((resolve: Function) => {
      resolve();
    });
  }
}

export class MenuMock {
  /* tslint:disable */
  public close(): any {
    /* tslint:enable */
    return new Promise((resolve: Function) => {
      resolve();
    });
  }
}
