import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {
  AlertController,
  IonApp,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonRouterOutlet,
  IonSplitPane,
  IonToolbar
} from '@ionic/angular/standalone';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {AuthenticationService} from "./services/authentication/authentication.service";
import {Observable} from "rxjs";
import {HttpClientModule} from "@angular/common/http";
import {User} from "./models/user";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCog, faInfoCircle, faLock, faQuestionCircle, faSignOutAlt, faTachometerAlt } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    IonApp,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonListHeader,
    IonNote,
    IonMenuToggle,
    IonItem,
    IonLabel,
    IonRouterOutlet,
    IonHeader,
    IonToolbar,
    HttpClientModule,
    FontAwesomeModule,
  ],
})
export class AppComponent {
  faSignOutAlt = faSignOutAlt;
  public appPages: {title:string, url:string, icon: IconProp}[] = [
    {title: 'Records', url: '/records', icon: faTachometerAlt},
    {title: 'Settings', url: '/settings', icon: faCog},
    {title: 'About', url: '/about', icon: faInfoCircle},
    {title: 'Help', url: '/help', icon: faQuestionCircle},
    {title: 'Privacy Policy', url: '/privacy-policy', icon: faLock},
  ];

  /* TODEL
  public menuItems = [
    {title: 'Records', page: '/home', icon: 'tachometer-alt'}, /// Might be wrong page
    {title: 'Settings', page: '/settings', icon: 'cog'},
    {title: 'About', page: '/about', icon: 'info-circle'},
    {title: 'Help', page: '/help', icon: 'question-circle'},
    {title: 'Privacy Policy', page: '/privacypolicy', icon: 'lock'},
    {title: 'Log out', icon: 'sign-out-alt'},
  ];
   */

  user$: Observable<User | null>;

  constructor(
    private authenticationService: AuthenticationService,
    private alertController: AlertController,
    private router: Router,
  ) {
    this.user$ = this.authenticationService.user$;
  }

  askLogout() {
    this.alertController.create({
      header: 'Are you sure?',
      message: 'Are you sure you wish to log out?',
      backdropDismiss: true,
      buttons: [
        {
          text: 'Log Out',
          handler: () => {
            this.authenticationService.logout();
            return this.router.navigateByUrl('/login');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }]
    }).then(alert => alert.present())
  }
}
