import { Component, OnInit } from '@angular/core';
import {AuthService} from 'angularx-social-login';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // @ts-ignore
  email: string;
  // @ts-ignore
  password: string;
  // @ts-ignore
  loginMessage: string;
  // @ts-ignore
  userRole: number;

  constructor(private authService: AuthService,
              private router: Router,
              private userService: UserService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.userService.authState$.subscribe(authState => {
      if (authState) {
        this.router.navigateByUrl(this.route.snapshot.queryParams.returnUrl || '/profile');

      } else {
        this.router.navigateByUrl('/login');
      }
    });


  }


  signInWithGoogle() {
    this.userService.googleLogin();
  }

  // @ts-ignore
  login(form: NgForm) {
    const email = this.email;
    const password = this.password;

    if (form.invalid) {
      return;
    }

    form.reset();
    this.userService.loginUser(email, password);

  }
}
