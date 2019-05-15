import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { trigger, transition, group, query, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimation', [
      // transition between the pages
      transition(`1 => 2, 1 => 3, 1 => 4, 1 => 5, 1 => 6, 1 => 7, 1 => 8, 
                  2 => 3, 2 => 4, 2 => 5, 2 => 6, 2 => 7, 2 => 8,
                  3 => 4, 3 => 5, 3 => 6, 3 => 7, 3 => 8, 
                  4 => 5, 4 => 6, 4 => 7, 4 => 8,
                  5 => 6, 5 => 7, 5 => 8,
                  6 => 7, 6 => 8,
                  7 => 8`, [
        style({ height: '!' }),
        query(':enter', style({ transform: 'translateX(100%)' })),
        query(':enter, :leave', style({ position: 'absolute',opacity: 0, top: 0, width: '100%' })),
        // animate the leave page away
        group([
            query(':leave', [
              animate('800ms ease', style({ transform: 'translateX(-100%)' })),
            ]),
            // and now reveal the enter
            query(':enter', animate('800ms ease', style({ transform: 'translateX(0)', opacity: 1, width: '100%' }))),
        ]),
      ]),
      // transition between the pages
      transition(`8 => 7, 8 => 6,8 => 5,8 => 4,8 => 3,8 => 2,8 => 1, 
                  7 => 6, 7 => 5, 7 => 4,7 => 3,7 => 2,7 => 1, 
                  6 => 5, 6 => 4, 6 => 3, 6 => 2, 6 => 1,
                  5 => 4, 5 => 3, 5 => 2, 5 => 1,
                  4 => 3, 4 => 2, 4 => 1,
                  3 => 2, 3 => 1,
                  2 => 1`, [
        style({ height: '!' }),
        query(':enter', style({ transform: 'translateX(-100%)' })),
        query(':enter, :leave', style({ position: 'absolute',opacity: 0, top: 0, width: '100%' })),
        // animate the leave page away
        group([
            query(':leave', [
              animate('800ms ease', style({ transform: 'translateX(100%)' })),
            ]),
            // and now reveal the enter 
            query(':enter', animate('800ms ease', style({ transform: 'translateX(0)', opacity: 1 , width: '100%'}))),
        ]),
      ]),
    ]),

  ]
  
})
export class AppComponent implements OnInit {
  constructor (private userService: UserService, private auth: AuthService, router: Router) {
      auth.user$.subscribe(user => {
        if(!user) return;
        
          userService.save(user);

          let returnUrl = localStorage.getItem('returnUrl');

          if(!returnUrl) return;

          localStorage.removeItem('returnUrl')
          router.navigateByUrl(returnUrl);    
      })
  };

  getDepth(outlet) {
    return outlet.activatedRouteData['depth'];
  }

  ngOnInit() {
    
  }
}
