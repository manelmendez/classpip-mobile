import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { SchoolPage } from './school';

let fixture: ComponentFixture<SchoolPage> = null;
/* tslint:disable */
let instance: any = null;
/* tslint:enable */

describe('Pages: SchoolPage', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([SchoolPage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
  })));

  it('should create-collection the SchoolPage', async(() => {
    expect(instance).toBeTruthy();
  }));
});
