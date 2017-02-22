import { Component, Inject, OnInit } from '@angular/core';

import * as _ from 'lodash';

// Add the RxJS Observable operators.
import './rxjs-operators';

import { ContentService } from './content.service';
import { ImgPipe } from './path.pipe';

@Component({
  selector: 'project',
  templateUrl: 'assets/views/project.html',
  providers: [ ContentService ],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class ProjectComponent implements OnInit {
  errorMessage: string;
  
  constructor (private contentService: ContentService, @Inject('Window') private window: Window, private imgPipe: ImgPipe) {}

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

  bgImgStyle(img: any): any {
    if( ! img) {
      console.error('Img has no path')
      return {}
    }
    return {
      'background-image': 'url(' + this.scaleBg(img.path) + ')'
    }
  }

  scaleBg(path: any): any {
    if( ! path) return false
    var dim: any

    // Large devices: Desktops (>1200px)
    if(this.window.innerWidth >= 1200) {
      dim = {w: 1920, h: 300}
    }
    // Medium devices: Desktops (>992px)
    else if(this.window.innerWidth >= 992) {
      dim = {w: 1200, h: 300}
    }
    // Small devices: Tablets (>768px)
    else if(this.window.innerWidth >= 762) {
      dim = {w: 1000, h: 200}
    }
    // Tiny devices: Phones (<768px)
    else {
      dim = {w: 768, h: 200}
    }
    return this.imgPipe.transform(path, dim)
  }

  onResize(event: any){
    // event.target.innerWidth
  }
}
