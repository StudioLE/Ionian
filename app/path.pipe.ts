import { Pipe, PipeTransform } from '@angular/core';
// import * as _ from 'lodash';

@Pipe({ name: 'img' })
export class ImgPipe implements PipeTransform {
  transform(path: string, params: any): string {
    path = path || ''
    var prefix = ''
    // if(_.isObject(params) && (params.w || params.h)) {
    if(params.w || params.h) {
      prefix = (params.w || '') + 'x' + (params.h || '') + '/'
      if(params.align) {
        prefix += '-' + params.align
      }
    }
    if(path.indexOf('https://') >= 0) {
      path = path.substr('https://'.length)
    }
    else if(path.indexOf('http://') >= 0) {
      path = path.substr('http://'.length)
    }
    return 'http://img.studiole.uk/' + prefix + path
  }
}

@Pipe({ name: 'doc' })
export class DocPipe implements PipeTransform {
  transform(path: string): string {
    return '/doc/' + path
  }
}

@Pipe({ name: 'dl' })
export class DlPipe implements PipeTransform {
  transform(path: string): string {
    return '/dl/' + path
  }
}
