import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

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

  showSpinner(boolData: boolean) {
    if (boolData) {
      this.spinner.show();
    } else {
      this.spinner.hide();
    }
  }
}
