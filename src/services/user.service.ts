import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
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
  readonly BaseURI = environment.baseApiUrl;

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
      alert('you not having access please Login First');
      return false;
    }
  }
}
