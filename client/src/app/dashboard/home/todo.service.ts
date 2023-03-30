import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Todo } from './todo.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class TodoService {

    constructor(private http: HttpClient) { }

    get(): Observable<Todo[]> {
        return this.http.get<Todo[]>(`${environment.apiUrl}/todos`)
            .pipe(take(1));
    }

    post(data: object) {
        const form = {description: data};
        return this.http.post<Todo[]>(`${environment.apiUrl}/todos`, form)
            .pipe(take(1));
    }

    delete(id: number) {
        return this.http.delete<Todo[]>(`${environment.apiUrl}/todos/${id}`)
            .pipe(take(1));
    }
}
