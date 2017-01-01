import { Component, OnInit } from '@angular/core';

import * as _ from 'lodash';

// Add the RxJS Observable operators.
import './rxjs-operators';

import { ContentService } from './content.service';

@Component({
  selector: 'app',
  templateUrl: 'assets/views/body.html',
  providers: [ ContentService ]
})
export class AppComponent implements OnInit {
  errorMessage: string;
  name = 'Angular';

  meta: any = {}
  
  constructor (private contentService: ContentService) {}

  ngOnInit() { this.getContent(); }

  getContent() {
    this.contentService.getContent()
    .then(
      meta => {
        _.extend(this, meta.reset, meta)
        console.log(this)
      }
    );
  }
}
