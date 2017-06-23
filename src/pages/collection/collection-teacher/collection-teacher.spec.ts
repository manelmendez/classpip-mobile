import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../../test';
import {CollectionTpage} from "./collection-teacher";

let fixture: ComponentFixture<CollectionTpage> = null;
/* tslint:disable */
let instance: any = null;
/* tslint:enable */

describe('Pages: CollectionTPage', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([CollectionTpage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
  })));

  it('should create the CollectionTPage', async(() => {
    expect(instance).toBeTruthy();
  }));
});
