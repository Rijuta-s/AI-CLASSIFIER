import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassifyComponent } from './classify/classify.component';
import { HomepageComponent } from './homepage/homepage.component';
const routes: Routes = [{
  path:'',
  component:HomepageComponent
},
{
  path:'classify',
  component: ClassifyComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
