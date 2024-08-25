import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../../models/Contact/contact';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class ContactServiceService {

  private url = 'http://127.0.0.1:8000/api/contact';

  constructor(private http: HttpClient) { }

  addMessage(message: Contact): Observable<ApiResponse<Contact>>{
    return this.http.post<ApiResponse<Contact>>(this.url, message);
  }
}
