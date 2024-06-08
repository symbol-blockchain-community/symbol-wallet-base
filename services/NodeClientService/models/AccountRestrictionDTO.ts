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
import type { AccountRestrictionDTOValuesInner } from './AccountRestrictionDTOValuesInner';
import {
  AccountRestrictionDTOValuesInnerFromJSON,
  AccountRestrictionDTOValuesInnerFromJSONTyped,
  AccountRestrictionDTOValuesInnerToJSON,
} from './AccountRestrictionDTOValuesInner';
import type { AccountRestrictionFlagsEnum } from './AccountRestrictionFlagsEnum';
import {
  AccountRestrictionFlagsEnumFromJSON,
  AccountRestrictionFlagsEnumFromJSONTyped,
  AccountRestrictionFlagsEnumToJSON,
} from './AccountRestrictionFlagsEnum';

/**
 *
 * @export
 * @interface AccountRestrictionDTO
 */
export interface AccountRestrictionDTO {
  /**
   *
   * @type {AccountRestrictionFlagsEnum}
   * @memberof AccountRestrictionDTO
   */
  restrictionFlags: AccountRestrictionFlagsEnum;
  /**
   * Address, mosaic id, or transaction type to restrict.
   * @type {Array<AccountRestrictionDTOValuesInner>}
   * @memberof AccountRestrictionDTO
   */
  values: Array<AccountRestrictionDTOValuesInner>;
}

/**
 * Check if a given object implements the AccountRestrictionDTO interface.
 */
export function instanceOfAccountRestrictionDTO(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'restrictionFlags' in value;
  isInstance = isInstance && 'values' in value;

  return isInstance;
}

export function AccountRestrictionDTOFromJSON(json: any): AccountRestrictionDTO {
  return AccountRestrictionDTOFromJSONTyped(json, false);
}

export function AccountRestrictionDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): AccountRestrictionDTO {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    restrictionFlags: AccountRestrictionFlagsEnumFromJSON(json['restrictionFlags']),
    values: (json['values'] as Array<any>).map(AccountRestrictionDTOValuesInnerFromJSON),
  };
}

export function AccountRestrictionDTOToJSON(value?: AccountRestrictionDTO | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    restrictionFlags: AccountRestrictionFlagsEnumToJSON(value.restrictionFlags),
    values: (value.values as Array<any>).map(AccountRestrictionDTOValuesInnerToJSON),
  };
}
