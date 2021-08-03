import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  login(email: string, password: string) {
    this.authService.login(email, password);
  }


  // onSubmit(formData) {
  //   if (formData.valid) {
  //     console.log(formData.value);
  //     this.authService.login(
  //       formData.value.email,
  //       formData.value.password
  //     );
  //   }
  // }
}
