
import { TranslateService } from '@ngx-translate/core';
import { AppLayoutBaseService } from '../app-layout.service.base'
import { BaseAppConstants } from '../../app-constants.base'
import { Component, Directive, Input } from '@angular/core';
import { AppUtilBaseService } from "../../app-util.base.service";
import { Router } from '@angular/router';
import { inject } from '@angular/core';

@Directive()
export abstract class AppHeaderBaseComponent {
  selectedLang:any;
  displayLeftMenu = true;
  displayRightMenu = true;
  menuType!: string;
  headerElements: any;
  logo!: string;
  mobileLogo!: string;
  rightMenu: any;
  hamburgerMenu: any;
  hamburgerMenuRight: any;
  isMiddleMenuNotEmpty: boolean = true

  isMobile: boolean = BaseAppConstants.isMobile;
  appHeaderContentFloat: boolean = false
  isMenuFixed:Boolean = false;

  @Input() displayMenus: boolean | undefined;

  

  public translate = inject(TranslateService);
  public bs = inject(AppLayoutBaseService);
  public utilBase = inject(AppUtilBaseService);
  public router = inject(Router);

  
  onInit(): void {
    this.headerElements = this.bs.getTopBarCofiguration();
    this.getMenuElement();
    let response = this.bs.getMenu();
      this.headerElements?.middle?.forEach((headerItems: any) => {
        if (headerItems?.element == "leftPane") {
          headerItems["children"] = response?.topBarLeft
        }
        if (headerItems?.element == "middlePane") {
          headerItems["children"] = response?.topBarMiddle
        }
        if (headerItems?.element == "rightPane") {
          headerItems["children"] = response?.topBarRight
        }
      })
      this.headerElements?.left?.forEach((headerItems: any) => {
        if (headerItems?.element == "leftMenu") {
          headerItems["children"] = response?.left
          this.isMenuFixed = (response.left.length > 0 && headerItems.menuType =='fixed');
        }
      })
      this.headerElements?.right?.forEach((headerItems: any) => {
        if (headerItems?.element == "rightMenu") {
          headerItems["children"] = response?.right
          this.rightMenu["children"] = response?.right
        }
      })
      if (response?.topBarLeft?.length <= 0 && response?.topBarMiddle?.length <= 0 && response?.topBarRight?.length <= 0) {
        this.isMiddleMenuNotEmpty = false
      }
    this.menuType = this.bs.getMenuType();
    this.getLogo();
    this.getMenuBar();
    this.bs.getLeftMenuVisibility().subscribe(d => { this.displayLeftMenu = d });
    this.bs.getRightMenuVisibility().subscribe(d => { this.displayRightMenu = d });
  }


  public showMenu(menuType: any): void {
    if (menuType == 'left') {
      this.bs.updateLeftMenuVisibility(this.displayLeftMenu = !this.displayLeftMenu);
    } else {
      this.bs.updateRightMenuVisibility(this.displayRightMenu = !this.displayRightMenu);
    }
  }

  getLogo() {
    const ele = (this.headerElements.left.find((t: { element: string; }) => t.element === "logo"));
    this.logo = `assets/images/` + ele.logoFileName;
    this.mobileLogo = `assets/images/` + ele.mobileLogoFileName;
  }

  getMenuElement() {
    this.rightMenu = this.headerElements.right.find((t: { element: string; }) => t.element === "rightMenu");
  }

  onLanguageSwitch(lang: any) {
    this.translate.use(lang.code);
  }

  getMenuBar() {
    const ele = (this.headerElements.left.find((t: { element: string; }) => t.element === "leftMenu"));
    if (ele) {
      this.hamburgerMenu = `assets/images/` + ((ele.iconFileName) ? ele.iconFileName : 'hamburger_menu.svg');
    }
    const eleRight = (this.headerElements.right.find((t: { element: string; }) => t.element === "rightMenu"));
    if (eleRight) {
      this.hamburgerMenuRight = `assets/images/` + ((eleRight.menuIconFileName) ? eleRight.menuIconFileName : 'hamburger_menu.svg');
    }
  }

  navigateToHomePage(){
    this.router.navigateByUrl('/')
  }

}
