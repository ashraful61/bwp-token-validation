import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { IErrorResponse } from '../../interface/error-response.interface';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  constructor(private spinner: NgxSpinnerService) {}

  showAlert(title: string, message: string, type: any) {
    // type = "success", "error", "warning", "info" or "question"
    // Swal.fire('OPS Sorry', 'Username or Password  not match', 'warning');
    // Swal.fire(title, message, type);
    Swal.fire({
      icon: type,
      title,
      //text: message
      html: message,
      allowOutsideClick: false,
    });
  }

  showSpinner(isSpinning: boolean) {
    if (isSpinning) {
      this.spinner.show();
    } else {
      this.spinner.hide();
    }
  }

  errorResponseHandler(error: IErrorResponse) {
    if (error.code == 400 || error.code == 404 || error.code == 409) {
      this.showAlert('Warning', error.message, 'warning');
    } else {
      this.showAlert('Warning', 'Something went wrong', 'error');
    }
  }

  // dynamicSort(property:any) {
  //   var sortOrder = 1;
  //   if(property[0] === "-") {
  //       sortOrder = -1;
  //       property = property.substr(1);
  //   }
  //   return function (a:any,b:any) {
  //       /* next line works with strings and numbers,
  //        * and you may want to customize it to your needs
  //        */
  //       var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
  //       return result * sortOrder;
  //   }
  // }

  // formattedDate(dateValue : string): string {
  //   var date = new Date(dateValue);

  //   // Get year, month, and day part from the date
  //   var year = date.toLocaleString("default", { year: "numeric" });
  //   var month = date.toLocaleString("default", { month: "2-digit" });
  //   var day = date.toLocaleString("default", { day: "2-digit" });

  //   // Generate yyyy-mm-dd date string
  //   var formattedDate = year + "-" + month + "-"  + day;

  //   return formattedDate;
  // }
}
