import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  credentials = {
    email: '',
    password: '',
  };

  showAlert = false;
  alertMsg = 'Please wait! we are loggin you in!';
  alertColor = 'blue';
  inSubmission = false;

  constructor(private auth: AngularFireAuth) {}

  ngOnInit(): void {}

  async login() {
    this.showAlert = true;
    this.inSubmission = true;
    this.alertColor = 'blue';
    this.alertMsg = 'Please wait! we are loggin you in!';

    try {
      await this.auth.signInWithEmailAndPassword(
        this.credentials.email as string,
        this.credentials.password
      );
    } catch (e) {
      this.inSubmission = false
      this.alertMsg = 'An unexpected error occurred. Please try again later'
      this.alertColor = 'red'

      console.error(e)
    }

    this.alertMsg = 'Success! you are logged in'
    this.alertColor = 'green'
  }
}
