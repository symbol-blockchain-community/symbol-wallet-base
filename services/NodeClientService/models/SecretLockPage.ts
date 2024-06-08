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
import type { Pagination } from './Pagination';
import { PaginationFromJSON, PaginationFromJSONTyped, PaginationToJSON } from './Pagination';
import type { SecretLockInfoDTO } from './SecretLockInfoDTO';
import {
  SecretLockInfoDTOFromJSON,
  SecretLockInfoDTOFromJSONTyped,
  SecretLockInfoDTOToJSON,
} from './SecretLockInfoDTO';

/**
 *
 * @export
 * @interface SecretLockPage
 */
export interface SecretLockPage {
  /**
   * Array of secret locks.
   * @type {Array<SecretLockInfoDTO>}
   * @memberof SecretLockPage
   */
  data: Array<SecretLockInfoDTO>;
  /**
   *
   * @type {Pagination}
   * @memberof SecretLockPage
   */
  pagination: Pagination;
}

/**
 * Check if a given object implements the SecretLockPage interface.
 */
export function instanceOfSecretLockPage(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'data' in value;
  isInstance = isInstance && 'pagination' in value;

  return isInstance;
}

export function SecretLockPageFromJSON(json: any): SecretLockPage {
  return SecretLockPageFromJSONTyped(json, false);
}

export function SecretLockPageFromJSONTyped(json: any, ignoreDiscriminator: boolean): SecretLockPage {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    data: (json['data'] as Array<any>).map(SecretLockInfoDTOFromJSON),
    pagination: PaginationFromJSON(json['pagination']),
  };
}

export function SecretLockPageToJSON(value?: SecretLockPage | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    data: (value.data as Array<any>).map(SecretLockInfoDTOToJSON),
    pagination: PaginationToJSON(value.pagination),
  };
}
