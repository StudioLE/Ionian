import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

// import { Content } from './content';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import * as _ from 'lodash';
import * as toml from 'toml';

@Injectable()
export class ContentService {
  // private contentUrl = 'app/pages/index.htm';
  private contentUrl = 'assets/pages/architecture/the-sill.htm';
  
  constructor (private http: Http) {}
  
  getContent (): Promise<any> {
      // var path = 'pages'

      // if( ! route || route == '/' || route == ' ') {
      //   path += '/index'
      // }
      // else if(_.isString(route)) {
      //   path += route.trim()
      // }
      // else {
      //   _.each(route, function(param) {
      //     path += '/' + param
      //   })
      // }
      // path += '.htm'

    return this.http.get(this.contentUrl)
      .toPromise()
      .then(this.extractData)
      // .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let content: string[] = res.text().replace(/\r\n/g, '\n').split('\n==\n')
    
    content[0] = content[0].replace(/\[(\w*) (\w*)\]/g, function(match: any, p1: string, p2: string) {
      return '[' + p1 + p2 + ']'
    })

    var meta = toml.parse(content[0])

    content = content[1].split('\n<!--more-->\n')

    meta.intro = content[0]
    meta.body = content[1]

    // For every meta item
    _.each(meta, function(value, key) {
      // Check if item key begins with one of:
      _.each(['alert', 'image', 'download', 'link', 'skill', 'screenshot', 'video'], function(correct_key) {
        if(_.startsWith(key, correct_key)) {
          // Create correct_keys array if it doesn't exist
          if( ! _.isArray(meta[correct_key + 's'])) meta[correct_key + 's'] = []

          // If it does push it to a concatenated array
          meta[correct_key + 's'].push(value)

          // And remove the original
          delete meta[key]
        }
      })
    })

    // Get photoset
    if(meta.photoset) {
      meta.photoset.id = meta.photoset.photoset
      delete meta.photoset.photoset

      if( ! _.isArray(meta.links)) meta.links = []
      meta.links.push({
        title: meta.title + ' Photoset on Flickr',
        path: 'http://www.flickr.com/photos/ispy_creativity/sets/' + meta.photoset.id
      })
    }

    // Group skills
    meta.skills = _.groupBy(meta.skills, function(skill: any) {
      return skill.section
    })

    // Sort projects
    if(meta.projects && meta.projects.style == 'index') {
      meta.layout = 'index'
    }
    else {
      meta.layout = 'standard'
    }
    if(meta.projects) {
      var paths = meta.projects.paths.split(',')
      meta.projects = []
      _.each(paths, function(path) {
        if(path.trim()) meta.projects.push(path.trim())
      })
    }

    meta.reset = {
      alerts: null,
      body: null,
      comments: null,
      downloads: null,
      intro: null,
      images: null,
      // layout: null,
      links: null,
      photoset: null,
      projects: null,
      // template: null,
      screenshots: null,
      skills: null,
      title: null,
      thumb: null,
      url: null,
      video: null
    }

    return meta || {}
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
