import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <a class="matero-branding" href="/">
      <img src="./assets/images/logo.svg" class="matero-branding-logo-expanded" alt="logo" />
      <span class="matero-branding-name">TRACEORGANICS</span>
    </a>
  `,
})
export class BrandingComponent {}
