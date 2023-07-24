import { Injectable,inject } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { AppGlobalService } from '@baseapp/app-global.service';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class AppHomeBaseService {

  public appGlobalService = inject(AppGlobalService);
 
  

  config : any = [ {
  "children" : [ {
    "properties" : {
      "tileType" : "type_1"
    },
    "children" : [ {
      "data" : {
        "properties" : {
          "class" : "home-tile",
          "label" : "TILE_1",
          "data" : "homeTile1",
          "field" : "homeTile"
        }
      },
      "expanded" : false,
      "folder" : false,
      "key" : "homeTile",
      "title" : "Tile 1",
      "type" : "homeTile",
      "id" : "homeTile1",
      "selected" : false
    }, {
      "data" : {
        "properties" : {
          "class" : "home-tile",
          "label" : "TILE_2",
          "data" : "homeTile2",
          "field" : "homeTile"
        }
      },
      "expanded" : false,
      "folder" : false,
      "key" : "homeTile",
      "title" : "Tile 2",
      "type" : "homeTile",
      "id" : "homeTile2",
      "selected" : false
    }, {
      "data" : {
        "properties" : {
          "class" : "home-tile",
          "label" : "TILE_3",
          "data" : "homeTile3",
          "field" : "homeTile"
        }
      },
      "expanded" : false,
      "folder" : false,
      "key" : "homeTile",
      "title" : "Tile 3",
      "type" : "homeTile",
      "id" : "homeTile3",
      "selected" : false
    } ],
    "expanded" : false,
    "folder" : true,
    "key" : "homePage",
    "title" : "Home Page",
    "type" : "homePage",
    "id" : "homePage",
    "selected" : false
  } ],
  "expanded" : false,
  "folder" : true,
  "key" : "page",
  "title" : "Page",
  "type" : "page",
  "id" : "page",
  "selected" : false
} ];
  
 currentUserRoles = (this.appGlobalService.getCurrentUserData()).userRoles;
 checkAccess: any = (o: string) => this.currentUserRoles.includes(o);

  public getLandingPageData() {
    let accessibleData: any = {
      children: []
    };
    const data: any = (this.config.find((t: { type: string; }) => t.type === "page"))?.children[0];
    if (!environment.prototype) {
      data.children?.filter((tileProps: any) => {
        const tile = tileProps.data?.properties;
        if (tile.accessControl && tile.accessControl.length > 0) {
          if (tile.accessControl.some(this.checkAccess))
            accessibleData.children.push(tileProps);
        }
        else {
          accessibleData.children.push(tileProps);
        }
      })
      accessibleData = { ...data, ...accessibleData };
    }
    else {

      accessibleData = data;
    }
    return accessibleData;
  }
}