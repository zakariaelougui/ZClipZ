import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service'
import IUser from 'src/app/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private auth: AuthService) {}

  inSubmission = false

  name = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ])

  email = new FormControl('',[
    Validators.required,
    Validators.email
  ])

  age = new FormControl(null, [
    Validators.required,
    Validators.min(18),
    Validators.max(120)
  ])

  password = new FormControl('',[
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
  ])

  confirm_password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
  ])

  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.pattern(/^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/)
  ])


  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirm_password: this.confirm_password,
    phoneNumber: this.phoneNumber
  })

  showAlert = false
  alertMsg = 'Please wait! your account is being created'
  alertColor = 'blue'

  async register() {
    this.showAlert = true
    this.alertMsg ='Please wait! your account is being created'
    this.alertColor = 'blue'
    this.inSubmission = true 

    const { email, password} = this.registerForm.value
    try {
      this.auth.createUser(this.registerForm.value as IUser)
    } catch ({message}) {
      console.error(message)
      this.alertMsg = `An Unexpected error occurred, please try again \n ${message}`
      this.alertColor = 'red'
      this.inSubmission = false
      return 
    }

    this.alertMsg = 'Success! your account has been created'
    this.alertColor = 'green'
  }

}
