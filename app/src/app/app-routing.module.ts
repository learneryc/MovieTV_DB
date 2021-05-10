import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from './components/homepage/homepage.component';
import {ListComponent} from './components/list/list.component';
import {DetailComponent} from './components/detail/detail.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'mylist', component: ListComponent},
  {path: 'watch',
   children: [
     {path: ':category/:id', component: DetailComponent}
   ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
