import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FleetDriversComponent } from './drivers/drivers.component';
import { FleetVehiclesComponent } from './vehicles/vehicles.component';
import { FleetServiceschedulesComponent } from './serviceschedules/serviceschedules.component';

const routes: Routes = [{ path: 'drivers', component: FleetDriversComponent },
{ path: 'vehicles', component: FleetVehiclesComponent },
{ path: 'serviceschedules', component: FleetServiceschedulesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FleetRoutingModule { }
