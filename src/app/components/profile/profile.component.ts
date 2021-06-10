import { Component, OnInit } from '@angular/core';
import {AuthService, SocialUser} from 'angularx-social-login';
import {ResponseModel, UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  myUser: any;


  constructor(private authService: AuthService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore


    this.userService.userData$
      .pipe(
        // @ts-ignore
        map(user => {
          if (user instanceof SocialUser) {
            return {
              ...user,
              email: 'test@test.com',
            };
          } else {
            return  user;
          }
        })
      )
      // @ts-ignore
      .subscribe((data: ResponseModel | SocialUser) => {
        this.myUser = data;
      });
  }

  logout() {
    this.userService.logout();
  }
}
