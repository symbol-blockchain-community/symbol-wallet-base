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
import type { AccountRestrictionDTO } from './AccountRestrictionDTO';
import {
  AccountRestrictionDTOFromJSON,
  AccountRestrictionDTOFromJSONTyped,
  AccountRestrictionDTOToJSON,
} from './AccountRestrictionDTO';

/**
 *
 * @export
 * @interface AccountRestrictionsDTO
 */
export interface AccountRestrictionsDTO {
  /**
   * The version of the state
   * @type {number}
   * @memberof AccountRestrictionsDTO
   */
  version: number;
  /**
   * Address encoded using a 32-character set.
   * @type {string}
   * @memberof AccountRestrictionsDTO
   */
  address: string;
  /**
   *
   * @type {Array<AccountRestrictionDTO>}
   * @memberof AccountRestrictionsDTO
   */
  restrictions: Array<AccountRestrictionDTO>;
}

/**
 * Check if a given object implements the AccountRestrictionsDTO interface.
 */
export function instanceOfAccountRestrictionsDTO(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'version' in value;
  isInstance = isInstance && 'address' in value;
  isInstance = isInstance && 'restrictions' in value;

  return isInstance;
}

export function AccountRestrictionsDTOFromJSON(json: any): AccountRestrictionsDTO {
  return AccountRestrictionsDTOFromJSONTyped(json, false);
}

export function AccountRestrictionsDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): AccountRestrictionsDTO {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    version: json['version'],
    address: json['address'],
    restrictions: (json['restrictions'] as Array<any>).map(AccountRestrictionDTOFromJSON),
  };
}

export function AccountRestrictionsDTOToJSON(value?: AccountRestrictionsDTO | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    version: value.version,
    address: value.address,
    restrictions: (value.restrictions as Array<any>).map(AccountRestrictionDTOToJSON),
  };
}
