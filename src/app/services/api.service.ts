import { HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public ObtenerPaises(){
    return this.http.get("https://restcountries.com/v2/continent/americas");
  }

  public ObtenerGit(){
    return this.http.get("https://api.github.com/users/sofiaroumieu");
  }
}
