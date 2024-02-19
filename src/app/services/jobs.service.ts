import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  private baseUrl = 'https://angular-assignment2-default-rtdb.firebaseio.com/';
  private jobsUrl = `${this.baseUrl}/jobs.json`;

  constructor(private http: HttpClient) {}

  addJob(job: any): Observable<any> {
    return this.http.post<any>(this.jobsUrl, job);
  }

  getJobs(): Observable<any> {
    return this.http.get<any>(this.jobsUrl);
  }
  getJobById(id: string): Observable<any> {
    const jobUrl = `${this.baseUrl}/jobs/${id}.json`;
    return this.http.get<any>(jobUrl);
  }
  updateJob(key: string, job: any): Observable<any> {
    const updateUrl = `${this.baseUrl}/jobs/${key}.json`;
    return this.http.put<any>(updateUrl, job);
  }

  deleteJob(key: string): Observable<any> {
    const deleteUrl = `${this.baseUrl}/jobs/${key}.json`;
    return this.http.delete<any>(deleteUrl);
  }
}
