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
 * @interface AccountKeyLinkNetworkPropertiesDTO
 */
export interface AccountKeyLinkNetworkPropertiesDTO {
  /**
   * to trigger plugin load
   * @type {string}
   * @memberof AccountKeyLinkNetworkPropertiesDTO
   */
  dummy?: string;
}

/**
 * Check if a given object implements the AccountKeyLinkNetworkPropertiesDTO interface.
 */
export function instanceOfAccountKeyLinkNetworkPropertiesDTO(value: object): boolean {
  let isInstance = true;

  return isInstance;
}

export function AccountKeyLinkNetworkPropertiesDTOFromJSON(json: any): AccountKeyLinkNetworkPropertiesDTO {
  return AccountKeyLinkNetworkPropertiesDTOFromJSONTyped(json, false);
}

export function AccountKeyLinkNetworkPropertiesDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): AccountKeyLinkNetworkPropertiesDTO {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    dummy: !exists(json, 'dummy') ? undefined : json['dummy'],
  };
}

export function AccountKeyLinkNetworkPropertiesDTOToJSON(value?: AccountKeyLinkNetworkPropertiesDTO | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    dummy: value.dummy,
  };
}
