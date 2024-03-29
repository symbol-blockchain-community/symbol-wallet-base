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
import type { NamespaceDTO } from './NamespaceDTO';
import { NamespaceDTOFromJSON, NamespaceDTOFromJSONTyped, NamespaceDTOToJSON } from './NamespaceDTO';
import type { NamespaceMetaDTO } from './NamespaceMetaDTO';
import { NamespaceMetaDTOFromJSON, NamespaceMetaDTOFromJSONTyped, NamespaceMetaDTOToJSON } from './NamespaceMetaDTO';

/**
 *
 * @export
 * @interface NamespaceInfoDTO
 */
export interface NamespaceInfoDTO {
  /**
   * Internal resource identifier.
   * @type {string}
   * @memberof NamespaceInfoDTO
   */
  id: string;
  /**
   *
   * @type {NamespaceMetaDTO}
   * @memberof NamespaceInfoDTO
   */
  meta: NamespaceMetaDTO;
  /**
   *
   * @type {NamespaceDTO}
   * @memberof NamespaceInfoDTO
   */
  namespace: NamespaceDTO;
}

/**
 * Check if a given object implements the NamespaceInfoDTO interface.
 */
export function instanceOfNamespaceInfoDTO(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'id' in value;
  isInstance = isInstance && 'meta' in value;
  isInstance = isInstance && 'namespace' in value;

  return isInstance;
}

export function NamespaceInfoDTOFromJSON(json: any): NamespaceInfoDTO {
  return NamespaceInfoDTOFromJSONTyped(json, false);
}

export function NamespaceInfoDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): NamespaceInfoDTO {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: json['id'],
    meta: NamespaceMetaDTOFromJSON(json['meta']),
    namespace: NamespaceDTOFromJSON(json['namespace']),
  };
}

export function NamespaceInfoDTOToJSON(value?: NamespaceInfoDTO | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    id: value.id,
    meta: NamespaceMetaDTOToJSON(value.meta),
    namespace: NamespaceDTOToJSON(value.namespace),
  };
}
