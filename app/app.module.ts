import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,  HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterprocessComponent } from './registerprocess/registerprocess.component';
import { SearchComponent } from './search/search.component';
import { PublicpostsComponent } from './publicposts/publicposts.component';
import { AdminheaderComponent } from './admin/adminheader/adminheader.component';
import { AdminnavComponent } from './admin/adminnav/adminnav.component';
import { AdminfooterComponent } from './admin/adminfooter/adminfooter.component';
import { AdminindexComponent } from './admin/adminindex/adminindex.component';
import { Profile1Component } from './admin/profile1/profile1.component';
import { AuthGuard } from './auth.guard';
import { RegistrationService } from './registration.service';
import { TokenInterceptorService } from './token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    NavbarComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    RegisterprocessComponent,
    SearchComponent,
    PublicpostsComponent,
    AdminheaderComponent,
    AdminnavComponent,
    AdminfooterComponent,
    AdminindexComponent,
    Profile1Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthGuard,RegistrationService, 
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})

export class AppModule { }
