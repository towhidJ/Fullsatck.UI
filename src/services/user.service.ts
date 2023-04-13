import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {}
  readonly BaseURI = 'https://localhost:7261';

  login(formData: any) {
    return this.http.post(this.BaseURI + '/api/auth/Login', formData);
  }

  GetToken() {
    return this.tokenStorage.getToken() || '';
  }
  HaveAccess() {
    var loggintoken = this.tokenStorage.getToken() || '';
    var loggintokenROle = this.tokenStorage.getUser().roles || '';
    // var _extractedtoken = loggintoken.split('.')[1];
    // var _atobdata = atob(_extractedtoken);
    // var _finaldata = JSON.parse(_atobdata);
    console.log(loggintoken);
    if (loggintokenROle == 'admin') {
      return true;
    } else {
      alert('you not having access');
      return false;
    }
  }
}
