import {Component, OnInit, ViewChild} from '@angular/core';
import {AmplifyService} from 'aws-amplify-angular';
import {ActivationStart, Router, RouterOutlet} from '@angular/router';

import {AuthStateService} from '../../shared/services/auth-state.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {

  state: any;
  newUser: any;
  username: any;
  password: any;
  authState: any;
  showLoginComponent: boolean = false;
  @ViewChild(RouterOutlet) outlet: RouterOutlet;
  constructor(public amplifyService: AmplifyService, public router: Router, public authStateService: AuthStateService){
    this.amplifyService = amplifyService;
    this.authState = {loggedIn: false};
    this.amplifyService.authStateChange$
        .subscribe(authState => {
          if (authState.state === 'signedIn') {
            this.router.navigate(['/profile']);
          }
        });
  }
    ngOnInit(): void {
      /*this.authStateService.publishAuthState({
          authState: 'data:AuthState'
      });*/
      this.showLoginComponent = true;
      console.log('twitty authstate= ', this.authState);
       // this.events.publish('data:AuthState', this.authState);
        this.router.events.subscribe(e => {
            if (e instanceof ActivationStart && e.snapshot.outlet === "register")
                this.outlet.deactivate();
        });
    }
}
