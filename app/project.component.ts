import { Component, OnInit } from '@angular/core';

import * as _ from 'lodash';

// Add the RxJS Observable operators.
import './rxjs-operators';

import { ContentService } from './content.service';

@Component({
  selector: 'project',
  templateUrl: 'assets/views/project.html',
  providers: [ ContentService ]
})
export class ProjectComponent implements OnInit {
  errorMessage: string;
  
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
