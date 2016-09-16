import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SampleService, SamplePipe, SampleComponent } from 'classpip-utils'

@Component({
  templateUrl: 'build/pages/home/home.html',
  directives: [SampleComponent],
  pipes: [SamplePipe],
  providers: [SampleService]
})
export class HomePage {

  constructor(private navCtrl: NavController,
    sampleService: SampleService) {

    console.log(sampleService.getElements());
  }

}
