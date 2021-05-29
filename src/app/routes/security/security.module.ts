import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SecurityRoutingModule } from './security-routing.module';
import { SecurityUsersComponent } from './users/users.component';
import { SecurityPeopleComponent } from './people/people.component';
import { SecurityRolesComponent } from './roles/roles.component';
import { AddpeopleComponent } from './people/addpeople/addpeople.component';
import { PersoncardComponent } from './people/personcard/personcard.component';
import { AddusersComponent } from './users/addusers/addusers.component';

const COMPONENTS = [SecurityUsersComponent, SecurityPeopleComponent, SecurityRolesComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    SecurityRoutingModule,
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC,
    AddpeopleComponent,
    PersoncardComponent,
    AddusersComponent,
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class SecurityModule { }
