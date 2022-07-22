import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Mailto, NgxMailtoService } from 'ngx-mailto';
import { environment as env } from 'src/environments/environment';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {


  subject:FormControl = new FormControl('', [Validators.required])
  message: FormControl = new FormControl('',[Validators.required])
  contactGroup!:FormGroup
  contactValue
  receiverEmail: string = `${env.adminEmail}`
  mailto: Mailto  = {}
  constructor(
    private fb:FormBuilder, 
    private http: HttpClient, 
    private mailtoService: NgxMailtoService
  ) {
    this.buildContactForm()

   }

  ngOnInit(): void {
  }

  buildContactForm(){
    return this.contactGroup = this.fb.group({
      subject:this.subject, 
      message: this.message
    })
  }

  onSubmit(){
    this.contactValue = this.contactGroup.value
    let data = {
        subject: this.contactValue['subject'],
        message: this.contactValue['message']

    }
    this.mailto = {
      receiver: this.receiverEmail,
      subject: data.subject,
      body: data.message
    };

    this.mailtoService.open(this.mailto)
    
    
  }

}
