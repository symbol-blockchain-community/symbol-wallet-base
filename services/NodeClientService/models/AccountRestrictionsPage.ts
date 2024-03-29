/* tslint:disable */
/* eslint-disable */
/**
 * Catapult REST Endpoints
 * OpenAPI Specification of catapult-rest
 *
 * The version of the OpenAPI document: 1.0.4
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { AccountRestrictionsInfoDTO } from './AccountRestrictionsInfoDTO';
import {
  AccountRestrictionsInfoDTOFromJSON,
  AccountRestrictionsInfoDTOFromJSONTyped,
  AccountRestrictionsInfoDTOToJSON,
} from './AccountRestrictionsInfoDTO';
import type { Pagination } from './Pagination';
import { PaginationFromJSON, PaginationFromJSONTyped, PaginationToJSON } from './Pagination';

/**
 *
 * @export
 * @interface AccountRestrictionsPage
 */
export interface AccountRestrictionsPage {
  /**
   * Array of account restrictions.
   * @type {Array<AccountRestrictionsInfoDTO>}
   * @memberof AccountRestrictionsPage
   */
  data: Array<AccountRestrictionsInfoDTO>;
  /**
   *
   * @type {Pagination}
   * @memberof AccountRestrictionsPage
   */
  pagination: Pagination;
}

/**
 * Check if a given object implements the AccountRestrictionsPage interface.
 */
export function instanceOfAccountRestrictionsPage(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'data' in value;
  isInstance = isInstance && 'pagination' in value;

  return isInstance;
}

export function AccountRestrictionsPageFromJSON(json: any): AccountRestrictionsPage {
  return AccountRestrictionsPageFromJSONTyped(json, false);
}

export function AccountRestrictionsPageFromJSONTyped(json: any, ignoreDiscriminator: boolean): AccountRestrictionsPage {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    data: (json['data'] as Array<any>).map(AccountRestrictionsInfoDTOFromJSON),
    pagination: PaginationFromJSON(json['pagination']),
  };
}

export function AccountRestrictionsPageToJSON(value?: AccountRestrictionsPage | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    data: (value.data as Array<any>).map(AccountRestrictionsInfoDTOToJSON),
    pagination: PaginationToJSON(value.pagination),
  };
}
