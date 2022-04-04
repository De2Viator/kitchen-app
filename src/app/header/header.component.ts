import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {
  constructor(private auth:AuthService){}
  isAuth = false;

  userAuth:Subscription = this.auth.user.subscribe(userData => {
    this.isAuth = !!userData;
  });

  ngOnDestroy(): void {
    this.userAuth.unsubscribe();
  }
}
