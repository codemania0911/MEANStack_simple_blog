import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { IndexComponent } from './index/index.component';
import { AdminComponent } from './admin/admin.component';
import { PostsComponent } from './admin/posts/posts.component';
import { PublishnewsComponent } from './admin/publishnews/publishnews.component';
import { UsersComponent } from './admin/users/users.component';
import { AdduserComponent } from './admin/adduser/adduser.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { AdminindexComponent } from './admin/adminindex/adminindex.component';
import { EditpostsComponent } from './admin/editposts/editposts.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full'},
  { path: 'index', component: IndexComponent},
  { path: 'about', component: AboutComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'admin', redirectTo: 'admin/index', pathMatch: 'full'},
  { path: 'admin/posts', component: PostsComponent, canActivate:[AuthGuard]},
  { path: 'admin/publishnews', component: PublishnewsComponent, canActivate:[AuthGuard]},
  { path: 'admin/users', component: UsersComponent, canActivate:[AuthGuard]},
  { path: 'admin/adduser', component: AdduserComponent, canActivate:[AuthGuard]},
  { path: 'admin/profile', component: ProfileComponent, canActivate:[AuthGuard]},
  { path: 'admin/index', component: AdminindexComponent, canActivate:[AuthGuard]},
  { path: 'admin/editposts', component: EditpostsComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents = [AboutComponent, RegisterComponent, IndexComponent, AdminComponent, PostsComponent, PublishnewsComponent, UsersComponent, AdduserComponent, ProfileComponent, EditpostsComponent];
