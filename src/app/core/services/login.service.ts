import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { User } from "../models/user";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private readonly LOGIN_URL = 'https://something/login'
    private http = inject(HttpClient);
    loggedInUser$ = signal<User | undefined>(undefined);

    public login(userName: string, password : string) {
        // this.http.post(this.LOGIN_URL, {user: userName, pwd: password});
        const ADMIN = 'admin';
        const PWD = '1234';
        if(userName === ADMIN && password === PWD) {
            this.loggedInUser$.set({username: 'Admin', role: 'admin'});
        } else if(password === PWD){
            this.loggedInUser$.set({username: userName, role: 'user'});
        } else {
            this.loggedInUser$.set(undefined);
        }
    }
}