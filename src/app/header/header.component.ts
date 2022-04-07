import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../api.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {
  constructor(private auth:AuthService, private api:ApiService){}
  isAuth = false;

  userAuth:Subscription = this.auth.user.subscribe(userData => {
    this.api.token = userData?.token
    this.isAuth = !!userData;
  });

  logOut() {
    this.auth.logOut()
  }

  ngOnDestroy(): void {
    this.userAuth.unsubscribe();
  }
}
