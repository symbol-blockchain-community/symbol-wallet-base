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
 * @interface VotingKeyLinkNetworkPropertiesDTO
 */
export interface VotingKeyLinkNetworkPropertiesDTO {
  /**
   * to trigger plugin load
   * @type {string}
   * @memberof VotingKeyLinkNetworkPropertiesDTO
   */
  dummy?: string;
}

/**
 * Check if a given object implements the VotingKeyLinkNetworkPropertiesDTO interface.
 */
export function instanceOfVotingKeyLinkNetworkPropertiesDTO(value: object): boolean {
  let isInstance = true;

  return isInstance;
}

export function VotingKeyLinkNetworkPropertiesDTOFromJSON(json: any): VotingKeyLinkNetworkPropertiesDTO {
  return VotingKeyLinkNetworkPropertiesDTOFromJSONTyped(json, false);
}

export function VotingKeyLinkNetworkPropertiesDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): VotingKeyLinkNetworkPropertiesDTO {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    dummy: !exists(json, 'dummy') ? undefined : json['dummy'],
  };
}

export function VotingKeyLinkNetworkPropertiesDTOToJSON(value?: VotingKeyLinkNetworkPropertiesDTO | null): any {
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
