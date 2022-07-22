import {Component, Injectable, OnInit, TemplateRef, ViewChild} from '@angular/core'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { MenuComponent } from '../menu/menu.component';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';


@Injectable()
@Component({
    selector: 'banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.scss']
})

export class BannerComponent implements OnInit {
 
  @ViewChild('resarch')  template!: TemplateRef<any>;
    THUMBUP_ICON = `
    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
    width="100.000000pt" height="100.000000pt" viewBox="0 0 50.000000 50.000000"
    preserveAspectRatio="xMidYMid meet">

    <g transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)"
    fill="#000000" stroke="none">
    <path d="M201 476 c-28 -16 -50 -52 -51 -83 0 -20 -5 -23 -40 -23 -22 0 -40
    -3 -40 -7 0 -5 -9 -82 -20 -173 -11 -91 -20 -171 -20 -177 0 -10 51 -13 220
    -13 169 0 220 3 220 13 0 6 -9 86 -20 177 -11 91 -20 168 -20 173 0 4 -18 7
    -40 7 -33 0 -40 3 -40 20 0 74 -83 122 -149 86z m104 -31 c14 -13 25 -36 25
    -50 0 -25 -1 -25 -80 -25 -79 0 -80 0 -80 25 0 36 42 75 80 75 19 0 40 -9 55
    -25z m-157 -122 c-2 -20 2 -28 12 -28 10 0 14 8 12 28 l-3 27 81 0 81 0 -3
    -27 c-2 -20 2 -28 12 -28 10 0 14 8 12 28 -2 24 1 27 27 27 33 0 33 0 51 -165
    6 -55 13 -115 16 -132 l5 -33 -201 0 -201 0 5 32 c3 18 10 78 16 133 18 165
    18 165 51 165 26 0 29 -3 27 -27z"/>
    </g>
    </svg>
    `;
  
    constructor(
        public authService: AuthService,
        public cartService: CartService,
        private router: Router,
        public  iconRegistry: MatIconRegistry, 
        public sanitizer: DomSanitizer, 
        private dialog:MatDialog, 
        private bottomSheet: MatBottomSheet
        
    ){
      iconRegistry.addSvgIconLiteral('thumbs-up', sanitizer.bypassSecurityTrustHtml(this.THUMBUP_ICON));
    }

    ngOnInit(){}


     // ouvrir le bottom sheet des moyens de paiement
  openBottomSheet(config?:MatBottomSheetConfig){
    return this.bottomSheet.open(this.template,config)
  }
    // se déconnecter
    logOut(){
        return this.authService.logOut().then(
          () => {
            this.router.navigate(['/user/login'])
          }
        )
     }
    
}