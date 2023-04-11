import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss'],
})
export class DashboardHeaderComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  logout = () => {
    const res = this.authService.logout();
    if (res) {
      console.log('logout success');
      this.router.navigateByUrl('/auth');
    }
  };

  callAPI = () => {
    this.authService.apiCall().subscribe({
      next: (result) => {
        console.log('api called');
      },
      error: (err) => {
        // this.utilitiesService.showSpinner(false);
        console.log(err);
      },
    });
  };
}
