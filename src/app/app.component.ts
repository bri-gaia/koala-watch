import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {
  AlertController,
  IonApp,
  IonContent,
  IonHeader,
  IonIcon,
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
import {addIcons} from 'ionicons';
import {
  archiveOutline,
  archiveSharp,
  bookmarkOutline,
  bookmarkSharp,
  heartOutline,
  heartSharp, locateOutline, locateSharp,
  mailOutline,
  mailSharp,
  paperPlaneOutline,
  paperPlaneSharp, pinOutline, pinSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp
} from 'ionicons/icons';
import {AuthenticationService} from "./services/authentication/authentication.service";
import {Observable} from "rxjs";
import {HttpClientModule} from "@angular/common/http";
import {User} from "./models/user";

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
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonHeader,
    IonToolbar,
    HttpClientModule,
  ],
})
export class AppComponent {
  public appPages = [
    {title: 'Records', url: '/records', icon: 'mail'},
    {title: 'Settings', url: '/settings', icon: 'paper-plane'},
    {title: 'About', url: '/about', icon: 'heart'},
    {title: 'Help', url: '/help', icon: 'archive'},
    {title: 'Privacy Policy', url: '/privacy-policy', icon: 'trash'},
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
    addIcons({
      mailOutline,
      mailSharp,
      paperPlaneOutline,
      paperPlaneSharp,
      heartOutline,
      heartSharp,
      archiveOutline,
      archiveSharp,
      trashOutline,
      trashSharp,
      warningOutline,
      warningSharp,
      bookmarkOutline,
      bookmarkSharp,
      pinOutline,
      pinSharp,
      locateOutline,
      locateSharp,
    });
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
