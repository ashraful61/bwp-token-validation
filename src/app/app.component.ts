import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { environmentCommon } from 'src/environments/environment.common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Brac Wash';
  apiUrl: string = environment.apiURL;
  commonFile: string = environmentCommon.apiURL
  
}
