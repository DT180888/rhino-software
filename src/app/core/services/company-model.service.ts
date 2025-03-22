import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class CompanyAIService {
  private baseUrl = environment.BACKEND_API_URL;

  constructor(private http: HttpClient) { }

  /**
   * Get all AI models for a company
   * @param companyId The ID of the company
   */
  getCompanyModels(companyId: Guid): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/models/${companyId}/models`);
  }

  /**
   * Get the training status for a company
   * @param companyId The ID of the company
   */
  getTrainingStatus(companyId: Guid): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/models/${companyId}/training-status`);
  }

  /**
   * Start training a new model
   * @param companyId The ID of the company
   * @param data Request data containing modelVersion
   */
  startTraining(companyId: Guid, data: { modelVersion: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/models/${companyId}/train`, data);
  }

  /**
   * Deploy a model to edge devices
   * @param companyId The ID of the company
   * @param modelId The ID of the model to deploy
   */
  deployModel(companyId: Guid, modelId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/models/${companyId}/models/${modelId}/deploy`, {});
  }
}