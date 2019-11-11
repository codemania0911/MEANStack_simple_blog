import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable, of} from 'rxjs'
import {map} from 'rxjs/operators'
import {Router} from '@angular/router'

export interface UserDetails {
    username: String
    firstname:String
    lastname: String
    email:String,
    password:String
}

interface TokenResponse{
    token: string
}

export interface TokenPayload {
    
}


@Injectable()
export class AuthenticationService {
    private token: string

    constructor(private http: HttpClient, private router: Router){}

    private saveToken(token: string) : void {
        localStorage.setItem('userToken', token)
        this.token = token
    }

    private getToken (): string {
        if(!this.token) {
            this.token = localStorage.getItem('userToken')
        }
        return this.token
    } 

    public getUserDetails(): UserDetails {
        const token = this.getToken()
        let payload
        if(token) {
            payload = token.split('.')[1]
            payload = window.atob(payload)
            return JSON.parse(payload)
        }else{
            return null
        }
    }

    public register(user: TokenPayload) : Observable<any> {
        const base = this.http.post(`/users/register`, user)
        const request = base.pipe(
            map((data:TokenResponse) => {
                if(data.token){
                    this.saveToken(data.token)
                }
                return data
            }) 
        )
        return request
    }

    public login(user: TokenPayload) : Observable<any> {
        const base = this.http.post(`/users/register`, user)
        const request = base.pipe(
            map((data:TokenResponse) => {
                if(data.token){
                    this.saveToken(data.token)
                }
                return data
            }) 
        )
        return request
    }

    public profile(): Observable<any>{
        return this.http.get(`/users/profile`, {
            headers: { Authorization: `${this.getToken()}`}
        })
    }

    public logout(): void {
        this.token = ''
        window.localStorage.removeItem('userToken')
        this.router.navigateByUrl('/')
    }
}
