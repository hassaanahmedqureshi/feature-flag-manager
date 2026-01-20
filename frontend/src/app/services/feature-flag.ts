import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timeout } from 'rxjs';

export interface FeatureFlag {
  id: number;
  name: string;
  enabled: boolean;
  environment: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class FeatureFlagService {
  private apiUrl = 'http://localhost:8080/api/flags';

  constructor(private http: HttpClient) {

  }

  getFlags(environment: string): Observable<FeatureFlag[]> {
    console.log(environment);
    const url = environment === 'all' ? this.apiUrl : `${this.apiUrl}?environment=${environment}`;
    return this.http.get<FeatureFlag[]>(url);
  }

  toggleFlag(id: number): Observable<FeatureFlag> {
    return this.http.put<FeatureFlag>(`${this.apiUrl}/${id}/toggle`, {});
  }

  createFlag(flag: FeatureFlag): Observable<FeatureFlag> {
    return this.http.post<FeatureFlag>(this.apiUrl, flag);
  }

  deleteFlag(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
