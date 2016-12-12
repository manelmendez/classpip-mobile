import { Component } from '@angular/core';

/**
 * This data model object is used to store the pages of
 * the application to display on the menu.
 */
export class Page {

  private _title: string;
  private _component: Component;

  constructor(title: string, component: Component) {
    this._title = title;
    this._component = component;
  }

  public get title(): string {
    return this._title;
  }

  public set title(value: string) {
    this._title = value;
  }

  public get component(): Component {
    return this._component;
  }

  public set component(value: Component) {
    this._component = value;
  }

}
