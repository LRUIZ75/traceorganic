import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SettingsService, StartupService, TokenService } from '@core';
import { AuthService } from 'app/services';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  public visible = false;
  public authData: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private token: TokenService,
    private startup: StartupService,
    private settings: SettingsService,
    private authService: AuthService,
    public translate: TranslateService,
    public toaster: ToastrService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    //invocar al servicio de login
    var credentials = { username: this.username.value, password: this.password.value };

    this.authService.login(credentials).toPromise().then(
      res => {
        var jsonResponse = JSON.stringify(res);
        console.log(jsonResponse);
        var response = JSON.parse(jsonResponse);

        this.authData = response.body;
        if (!this.authData) return;
        
        const { token, uid, username } = {
          token: this.authData.token,
          uid: this.authData.data._id,
          username: this.authData.data.username,
        };
        // Set user info
        this.settings.setUser({
          id: uid,
          name: username,
          email: this.authData.data.email,
          avatar: './assets/images/avatar.jpg',
        });
        // Set token info
        this.token.set({ token, uid, username });
        // Regain the initial data
        this.startup.load().then(() => {
          let url = this.token.referrer!.url || '/';
          if (url.includes('/auth')) {
            url = '/';
          }
          this.router.navigateByUrl(url);
        });
      }
    )
    .catch( err => {
      if (err) {
        console.log(JSON.stringify(err));
      }
    });
     
  }
}
