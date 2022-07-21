import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddproductComponent } from './components/addproduct/addproduct.component';
import { ConfirmOrderComponent } from './components/confirm-order/confirm-order.component';
import { HomeComponent } from './components/home/home.component';
import { LogComponent } from './components/log/log.component';
import { OrderComponent } from './components/order/order.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [

  {path: '',redirectTo:'/home',pathMatch:"full" },
  {path: 'register', component:RegisterComponent},
  {path: 'log', component:LogComponent},
  {path: 'home', component:HomeComponent},
  {path: 'profile', component:ProfileComponent,canActivate: [AuthGuard]},
  {path: 'order', component:OrderComponent,canActivate: [AuthGuard]},
  {path: 'con_order', component:ConfirmOrderComponent,canActivate: [AuthGuard]},
  {path: 'addproduct', component:AddproductComponent,canActivate: [AuthGuard]},
  {path: '**', component:HomeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
