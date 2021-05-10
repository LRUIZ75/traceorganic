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
  styleUrls: ['./login.component.scss']
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

  async login() {

    //invocar al servicio de login
    var credentials ={ username: this.username.value , password: this.password.value};

    await this.authService.login(credentials).toPromise().then(
      res => {
        var jsonResponse = JSON.stringify(res);
        var response = JSON.parse(jsonResponse);
        if (response.status != 'ok') {
          this.toaster.error(response.message);
          return;
        }
        this.authData = response;
      }
    )
    .catch(err=>{
      if (err.substring(0, 3) != '404') {
        this.toaster.error(err);
      }
    });

    if(!this.authData)
      return;
    const { token, uid, username } = { token: this.authData.token, uid: this.authData.user._id, username: this.authData.user.username };
    // Set user info
    this.settings.setUser({
      id: uid,
      name: username,
      email: this.authData.user.email,
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
}
