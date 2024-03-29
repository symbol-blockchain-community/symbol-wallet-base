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
 * @interface MultisigNetworkPropertiesDTO
 */
export interface MultisigNetworkPropertiesDTO {
  /**
   * Maximum number of multisig levels.
   * @type {string}
   * @memberof MultisigNetworkPropertiesDTO
   */
  maxMultisigDepth?: string;
  /**
   * Maximum number of cosignatories per account.
   * @type {string}
   * @memberof MultisigNetworkPropertiesDTO
   */
  maxCosignatoriesPerAccount?: string;
  /**
   * Maximum number of accounts a single account can cosign.
   * @type {string}
   * @memberof MultisigNetworkPropertiesDTO
   */
  maxCosignedAccountsPerAccount?: string;
}

/**
 * Check if a given object implements the MultisigNetworkPropertiesDTO interface.
 */
export function instanceOfMultisigNetworkPropertiesDTO(value: object): boolean {
  let isInstance = true;

  return isInstance;
}

export function MultisigNetworkPropertiesDTOFromJSON(json: any): MultisigNetworkPropertiesDTO {
  return MultisigNetworkPropertiesDTOFromJSONTyped(json, false);
}

export function MultisigNetworkPropertiesDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): MultisigNetworkPropertiesDTO {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    maxMultisigDepth: !exists(json, 'maxMultisigDepth') ? undefined : json['maxMultisigDepth'],
    maxCosignatoriesPerAccount: !exists(json, 'maxCosignatoriesPerAccount')
      ? undefined
      : json['maxCosignatoriesPerAccount'],
    maxCosignedAccountsPerAccount: !exists(json, 'maxCosignedAccountsPerAccount')
      ? undefined
      : json['maxCosignedAccountsPerAccount'],
  };
}

export function MultisigNetworkPropertiesDTOToJSON(value?: MultisigNetworkPropertiesDTO | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    maxMultisigDepth: value.maxMultisigDepth,
    maxCosignatoriesPerAccount: value.maxCosignatoriesPerAccount,
    maxCosignedAccountsPerAccount: value.maxCosignedAccountsPerAccount,
  };
}
