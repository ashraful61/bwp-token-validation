import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout/dashboard-layout.component';
import { DashboardHeaderComponent } from './layout/dashboard-layout/dashboard-header/dashboard-header.component';
import { DashboardMenuComponent } from './layout/dashboard-layout/dashboard-menu/dashboard-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DevExtremeModule } from './shared/modules/devExtreme.module';
import { CookieService } from 'ngx-cookie-service';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardLayoutComponent,
    DashboardHeaderComponent,
    DashboardMenuComponent,
    FooterComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    DevExtremeModule,
    ReactiveFormsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
