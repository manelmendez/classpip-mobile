import { Component } from '@angular/core';

export class Page {

  private _title: string;
  private _component: Component;

  constructor(component: Component, title?: string) {
    this._component = component;
    this._title = title;
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
