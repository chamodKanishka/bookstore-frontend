import { Component, OnInit } from '@angular/core';
import {AppConst} from '../../constants/app-const';
import {Router} from "@angular/router";
import {LoginService} from "../../services/login.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  public serverPath = AppConst.serverPath;
  public loginError:boolean = false;
  public loggedIn = false;
  public credential = {'username':'', 'password':''};

  public emailSent:boolean = false;
  public usernameExists:boolean = false;
  public emailExists:boolean = false;
  public username:string;
  public email:string;

  public emailNotExists: boolean = false;
  public forgetPasswordEmailSent: boolean = false;
  public recoverEmail:string;

  constructor (public loginService: LoginService, public userService: UserService, public router: Router){
  }

  onLogin() {
    this.loginService.sendCredential(this.credential.username, this.credential.password).subscribe(
      res=>{
        console.log(res);
        localStorage.setItem("xAuthToken", res.json().token);
        this.loggedIn=true;
        location.reload();
    	this.router.navigate(['/home']);
      },
      error=>{
        this.loggedIn=false;
        this.loginError=true;
      }
    );
  }

  onNewAccount() {
    this.usernameExists=false;
    this.emailExists=false;
    this.emailSent = false;
    
    this.userService.newUser(this.username, this.email).subscribe(
      res => {
        console.log(res);
        this.emailSent = true;
      },
      error => {
        console.log(error.text());
        let errorMessage=error.text();
        if (errorMessage==="usernameExists") this.usernameExists=true;
        if (errorMessage==="emailExists") this.emailExists=true;
      }
    );
  }

  onForgetPassword() {
    this.forgetPasswordEmailSent = false;
    this.emailNotExists = false;
    
    this.userService.retrievePassword(this.recoverEmail).subscribe(
      res => {
        console.log(res);
        this.emailSent = true;
      },
      error => {
        console.log(error.text());
        let errorMessage=error.text();
        if (errorMessage==="usernameExists") this.usernameExists=true;
        if (errorMessage==="emailExists") this.emailExists=true;
      }
    );
  }

  ngOnInit() {
    this.loginService.checkSession().subscribe(
      res => {
        this.loggedIn=true;
      },
      error => {
        this.loggedIn=false;
      }
    );
  }

}
