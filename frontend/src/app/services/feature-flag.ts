import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    return this.http.get<FeatureFlag[]>(`${this.apiUrl}?environment=${environment}`);
  }

  toggleFlag(id: number): Observable<FeatureFlag> {
    return this.http.put<FeatureFlag>(`${this.apiUrl}/${id}/toggle`, {});
  }
}
