import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from  'firebase';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from '../model/app-user';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { of } from 'rxjs';

@Injectable()
export class AuthService {

  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, 
    private userService: UserService ,private route: ActivatedRoute) {
    this.user$ = afAuth.authState;
   }

  login() {
      let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
      localStorage.setItem('returnUrl', returnUrl);
      this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$() : Observable<AppUser> {
      return this.user$.pipe(switchMap(user => {
        if (user) return this.userService.get(user.uid).valueChanges();

        return of(null);
      }))
    }
}

