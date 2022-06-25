import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthComponent } from "./auth.component";

const appRoutes = [
    {path:'auth', component:AuthComponent}
]

@NgModule({
    imports: [ RouterModule.forChild(appRoutes) ],
    exports:[RouterModule]
})
export class AuthRoutesModule { }