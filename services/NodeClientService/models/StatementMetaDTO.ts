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
 * Metadata related to the statment, including block information.
 * @export
 * @interface StatementMetaDTO
 */
export interface StatementMetaDTO {
  /**
   * Number of milliseconds elapsed since the creation of the nemesis block. This value can be converted to epoch time by adding the network's 'epochAdjustment'.
   * @type {string}
   * @memberof StatementMetaDTO
   */
  timestamp: string;
}

/**
 * Check if a given object implements the StatementMetaDTO interface.
 */
export function instanceOfStatementMetaDTO(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'timestamp' in value;

  return isInstance;
}

export function StatementMetaDTOFromJSON(json: any): StatementMetaDTO {
  return StatementMetaDTOFromJSONTyped(json, false);
}

export function StatementMetaDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): StatementMetaDTO {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    timestamp: json['timestamp'],
  };
}

export function StatementMetaDTOToJSON(value?: StatementMetaDTO | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    timestamp: value.timestamp,
  };
}
