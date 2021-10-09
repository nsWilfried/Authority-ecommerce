import {Component} from '@angular/core'
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector:'app-menu', 
    templateUrl: './menu.component.html', 
    styleUrls: ['./menu.component.scss']
})

export class MenuComponent {
    constructor(
        private dialog: MatDialog
    ){}
    closeDialog(){
        this.dialog.closeAll()
    }
}