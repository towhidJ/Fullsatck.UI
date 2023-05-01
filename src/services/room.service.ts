import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from 'src/app/model/room.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(private http: HttpClient) {}

  url = environment.baseApiUrl;

  getAllRoomNo(): Observable<Room[]> {
    return this.http.get<Room[]>(this.url + '/api/room/');
  }
}
