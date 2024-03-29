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
import type { NodeHealthDTO } from './NodeHealthDTO';
import { NodeHealthDTOFromJSON, NodeHealthDTOFromJSONTyped, NodeHealthDTOToJSON } from './NodeHealthDTO';

/**
 *
 * @export
 * @interface NodeHealthInfoDTO
 */
export interface NodeHealthInfoDTO {
  /**
   *
   * @type {NodeHealthDTO}
   * @memberof NodeHealthInfoDTO
   */
  status: NodeHealthDTO;
}

/**
 * Check if a given object implements the NodeHealthInfoDTO interface.
 */
export function instanceOfNodeHealthInfoDTO(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'status' in value;

  return isInstance;
}

export function NodeHealthInfoDTOFromJSON(json: any): NodeHealthInfoDTO {
  return NodeHealthInfoDTOFromJSONTyped(json, false);
}

export function NodeHealthInfoDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): NodeHealthInfoDTO {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    status: NodeHealthDTOFromJSON(json['status']),
  };
}

export function NodeHealthInfoDTOToJSON(value?: NodeHealthInfoDTO | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    status: NodeHealthDTOToJSON(value.status),
  };
}
