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
 * @interface NetworkTypeDTO
 */
export interface NetworkTypeDTO {
  /**
   * Network name.
   * @type {string}
   * @memberof NetworkTypeDTO
   */
  name: string;
  /**
   * A short text describing the network.
   * @type {string}
   * @memberof NetworkTypeDTO
   */
  description: string;
}

/**
 * Check if a given object implements the NetworkTypeDTO interface.
 */
export function instanceOfNetworkTypeDTO(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'name' in value;
  isInstance = isInstance && 'description' in value;

  return isInstance;
}

export function NetworkTypeDTOFromJSON(json: any): NetworkTypeDTO {
  return NetworkTypeDTOFromJSONTyped(json, false);
}

export function NetworkTypeDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): NetworkTypeDTO {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    name: json['name'],
    description: json['description'],
  };
}

export function NetworkTypeDTOToJSON(value?: NetworkTypeDTO | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    name: value.name,
    description: value.description,
  };
}
