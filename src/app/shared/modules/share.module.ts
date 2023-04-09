import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardContentWrapperComponent } from '../components/dashboard-content-wrapper/dashboard-content-wrapper.component';
import { FooterComponent } from './../components/footer/footer.component';
import { NgModule } from '@angular/core';
import { UploaderFromExcelComponent } from '../components/uploader-from-excel/uploader-from-excel.component';
import { DevExtremeModule } from './devExtreme.module';
import { OrderModule } from 'ngx-order-pipe';
// import { NullWithDefaultPipe } from '../pipe/null-with-default.pipe';
import { OrderByPipe } from '../pipe/order-by.pipe';
import { ProgrammeComponent } from '../components/programme/programme.component';

@NgModule({
  imports: [DevExtremeModule, OrderModule, RouterModule, CommonModule],
  declarations: [
    UploaderFromExcelComponent,
    FooterComponent,
    DashboardContentWrapperComponent,
    OrderByPipe,
    ProgrammeComponent
    // NullWithDefaultPipe
  ],
  exports: [
    UploaderFromExcelComponent,
    FooterComponent,
    DashboardContentWrapperComponent,
    ProgrammeComponent

  ],
})
export class SharedModule {}
