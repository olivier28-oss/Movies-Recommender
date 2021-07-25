import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {

  }

  login(email: string, password: string) {
    this.authService.login(email, password);
  }


}
