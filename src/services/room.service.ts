import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from 'src/app/model/room.model';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(private http: HttpClient) {}

  url = 'https://localhost:7261';

  getAllRoomNo(): Observable<Room[]> {
    return this.http.get<Room[]>(this.url + '/api/room/');
  }
}
