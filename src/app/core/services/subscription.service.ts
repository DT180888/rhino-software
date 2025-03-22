import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Subscription } from '../models/subscription.model';
import { BaseResponse } from '../models/base-response.model';
import { PricingPlan, PricingTableData } from '../models/pricing-plan.model';
import { Guid } from 'guid-typescript';

// Define package type enum
export enum PackageType {
  Basic = 'BASIC',
  Standard = 'STANDARD',
  Premium = 'PREMIUM',
  Optional = 'OPTIONAL'
}

export enum SubscriptionType {
  Tier1 = 'TIER1',
  Tier2 = 'TIER2',
  Tier3 = 'TIER3',
  Main = 'MAIN'
}

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  private apiUrl = `${environment.BACKEND_API_URL}/api/subscriptions`;

  // Define package order priority with proper typing
  private readonly packageOrder: Record<PackageType, number> = {
    [PackageType.Basic]: 0,
    [PackageType.Standard]: 1,
    [PackageType.Premium]: 2,
    [PackageType.Optional]: 3,
  };

  constructor(private http: HttpClient) {}

  getSubscriptions(): Observable<Subscription[]> {
    return this.http.get<BaseResponse<Subscription[]>>(this.apiUrl).pipe(map((response) => response.data));
  }

  getParentSubscriptions(): Observable<BaseResponse<Subscription[]>> {
    return this.http.get<BaseResponse<Subscription[]>>(`${this.apiUrl}/parent`);
  }

  getChildSubscriptions(parentId: string | Guid | undefined): Observable<BaseResponse<Subscription[]>> {
    if (!parentId) {
      throw new Error('Parent ID is required');
    }
    const id = parentId instanceof Guid ? parentId.toString() : parentId;
    return this.http.get<BaseResponse<Subscription[]>>(`${this.apiUrl}/child?id=${id}`);
  }

  createSubscription(subscription: any): Observable<BaseResponse<Subscription>> {
    const request = this.mapToCreateOrUpdateRequest(subscription);
    return this.http.post<BaseResponse<Subscription>>(this.apiUrl, request);
  }

  updateSubscription(id: string | Guid | undefined, subscription: any): Observable<BaseResponse<Subscription>> {
    if (!id) {
      throw new Error('Subscription ID is required');
    }
    const subscriptionId = id instanceof Guid ? id.toString() : id;
    const request = this.mapToCreateOrUpdateRequest(subscription, true);
    return this.http.put<BaseResponse<Subscription>>(`${this.apiUrl}/${subscriptionId}`, request);
  }

  deleteSubscription(id: string | Guid | undefined): Observable<BaseResponse<boolean>> {
    if (!id) {
      throw new Error('Subscription ID is required');
    }
    const subscriptionId = id instanceof Guid ? id.toString() : id;
    return this.http.delete<BaseResponse<boolean>>(`${this.apiUrl}/${subscriptionId}`);
  }

  getSubscriptionById(id: Guid): Observable<BaseResponse<Subscription>> {
    return this.http.get<BaseResponse<Subscription>>(`${this.apiUrl}/${id}`);
  }

  mapToPricingPlans(
    subscriptions: Subscription[],
    companyId: string | null,
    organizationId: string | null,
  ): PricingPlan[] {
    return subscriptions
      .filter((sub) => !sub.isDeleted)
      .map((sub) => ({
        id: sub.id as Guid,
        tier: sub.subscriptionName,
        price: this.formatPrice(sub.basePrice),
        period: this.formatPeriod(sub.durationMonths),
        durationMonths: sub.durationMonths,
        description: sub.description || '',
        features: this.getFeatures(sub),
        buttonText: 'Chọn gói',
        isPopular: sub.packageType === PackageType.Premium,
        code: sub.code,
        orderPriority: this.getPackageOrder(sub.packageType),
        companyId: companyId ? Guid.parse(companyId) : undefined,
        organizationId: organizationId ? Guid.parse(organizationId) : undefined,
      }))
      .sort((a, b) => a.orderPriority - b.orderPriority);
  }

  mapToPricingTableData(subscriptions: Subscription[]): PricingTableData[] {
    return subscriptions
      .filter((sub) => !sub.isDeleted)
      .map((sub) => ({
        tier: sub.subscriptionName,
        price: this.formatPrice(sub.basePrice),
        period: this.formatPeriod(sub.durationMonths),
        features: this.getFeaturesList(sub),
        orderPriority: this.getPackageOrder(sub.packageType),
      }))
      .sort((a, b) => a.orderPriority - b.orderPriority);
  }

  private getPackageOrder(packageType: string): number {
    return this.packageOrder[packageType as PackageType] || 999;
  }

  private formatPrice(price: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  }

  private formatPeriod(months: number): string {
    return months === 1 ? 'month' : `${months} months`;
  }

  private getFeatures(subscription: Subscription): { text: string }[] {
    const features = [
      { text: `Có ${subscription.deviceCount} thiết bị` },
      { text: `Tối đa ${subscription.maxEmployees} nhân viên` },
    ];

    if (subscription.description) {
      features.push({ text: subscription.description });
    }

    if (subscription.companyType && subscription.packageType === 'PREMIUM') {
      features.push({ text: `Dịch vụ hỗ trợ 24/7` });
    }

    return features;
  }

  private getFeaturesList(subscription: Subscription): string[] {
    const features = [
      `Có ${subscription.deviceCount} thiết bị'}`,
      `Tối đa ${subscription.maxEmployees} nhân viên`,
    ];

    if (subscription.description) {
      features.push(subscription.description);
    }

    if (subscription.companyType && subscription.packageType === 'PREMIUM') {
      features.push(`Dịch vụ hỗ trợ 24/7`);
    }

    return features;
  }

  mapToCreateOrUpdateRequest(subscription: any, isUpdate: boolean = false): any {
    return {
      companyTypeID: subscription.companyTypeId || subscription.companyTypeID,
      parentSubscriptionId: subscription.parentSubscriptionId,
      subscriptionName: subscription.subscriptionName,
      subscriptionType: subscription.subscriptionType,
      packageType: subscription.packageType,
      description: subscription.description || subscription.subscriptionDescription,
      deviceCount: subscription.deviceCount,
      basePrice: subscription.basePrice,
      minEmployees: subscription.minEmployees,
      maxEmployees: subscription.maxEmployees
    };
  }
}
