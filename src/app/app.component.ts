import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidationService } from './validation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  userForm : any;
  sublimit : string = "0";
  saveUserArray = [];
  constructor(private formBuilder: FormBuilder){
    this.userForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'email': ['', [Validators.required, ValidationService.emailValidator]],
      'profile': ['', [Validators.required, Validators.minLength(10)]]
    });
    console.log(this.userForm);
  }
  saveUser() {
    if (this.userForm.dirty && this.userForm.valid) {
      if(this.sublimit === "0"){
        let matchingArray = [];
        this.saveUserArray.forEach(element => {
          var splitLength = element.sno.split('.');
          if(splitLength.length === 1){
            matchingArray.push(element.sno);
          }
        });
        this.userForm.value.sno = (matchingArray.length + 1).toString();
        this.saveUserArray.push(this.userForm.value);
        this.userForm = this.formBuilder.group({
          'name': ['', Validators.required],
          'email': ['', [Validators.required, ValidationService.emailValidator]],
          'profile': ['', [Validators.required, Validators.minLength(10)]]
        });
        this.sublimit = "0";
      }else{
        var split = this.sublimit.split('.');
        if(split.length === 1){
          let matchingArray = [];
          var stringToGoIntoTheRegex = this.sublimit;
          var regex = new RegExp(stringToGoIntoTheRegex, "g");
          this.saveUserArray.forEach(element => {
            var splitLength = element.sno.split('.');
            var input = element.sno;
            if(splitLength.length === 2){
              var output = input.match(regex);
              if(output !== null){
                matchingArray.push(output);
              }
            }
          });
          this.userForm.value.sno = this.sublimit + "." + (matchingArray.length+1).toString();
          this.saveUserArray.push(this.userForm.value);
        }else{
          let matchingArray = [];
          var stringToGoIntoTheRegex = this.sublimit;
          var regex = new RegExp(stringToGoIntoTheRegex, "g");
          this.saveUserArray.forEach(element => {
            var input = element.sno;
            var output = input.match(regex);
            if(output !== null){
              matchingArray.push(output);
            }
          });
          this.userForm.value.sno = this.sublimit + "." + (matchingArray.length).toString();
          this.saveUserArray.push(this.userForm.value);
        }
        this.userForm = this.formBuilder.group({
          'name': ['', Validators.required],
          'email': ['', [Validators.required, ValidationService.emailValidator]],
          'profile': ['', [Validators.required, Validators.minLength(10)]]
        });
        this.sublimit = "0";
      }
    }
  }
  subLimitFun(data){
    this.sublimit = data.sno;
  }
}
