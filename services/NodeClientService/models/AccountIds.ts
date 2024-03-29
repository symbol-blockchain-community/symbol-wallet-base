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
/**
 *
 * @export
 * @interface AccountIds
 */
export interface AccountIds {
  /**
   * Array of public keys.
   * @type {Array<string>}
   * @memberof AccountIds
   */
  publicKeys?: Array<string>;
  /**
   * Array of addresses.
   * @type {Array<string>}
   * @memberof AccountIds
   */
  addresses?: Array<string>;
}

/**
 * Check if a given object implements the AccountIds interface.
 */
export function instanceOfAccountIds(value: object): boolean {
  let isInstance = true;

  return isInstance;
}

export function AccountIdsFromJSON(json: any): AccountIds {
  return AccountIdsFromJSONTyped(json, false);
}

export function AccountIdsFromJSONTyped(json: any, ignoreDiscriminator: boolean): AccountIds {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    publicKeys: !exists(json, 'publicKeys') ? undefined : json['publicKeys'],
    addresses: !exists(json, 'addresses') ? undefined : json['addresses'],
  };
}

export function AccountIdsToJSON(value?: AccountIds | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    publicKeys: value.publicKeys,
    addresses: value.addresses,
  };
}
