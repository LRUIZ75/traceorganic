import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsGsettingsComponent } from './gsettings/gsettings.component';

const routes: Routes = [{ path: 'gsettings', component: SettingsGsettingsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
