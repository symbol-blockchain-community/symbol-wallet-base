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
import type { HashLockEntryDTO } from './HashLockEntryDTO';
import { HashLockEntryDTOFromJSON, HashLockEntryDTOFromJSONTyped, HashLockEntryDTOToJSON } from './HashLockEntryDTO';

/**
 *
 * @export
 * @interface HashLockInfoDTO
 */
export interface HashLockInfoDTO {
  /**
   *
   * @type {string}
   * @memberof HashLockInfoDTO
   */
  id: string;
  /**
   *
   * @type {HashLockEntryDTO}
   * @memberof HashLockInfoDTO
   */
  lock: HashLockEntryDTO;
}

/**
 * Check if a given object implements the HashLockInfoDTO interface.
 */
export function instanceOfHashLockInfoDTO(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'id' in value;
  isInstance = isInstance && 'lock' in value;

  return isInstance;
}

export function HashLockInfoDTOFromJSON(json: any): HashLockInfoDTO {
  return HashLockInfoDTOFromJSONTyped(json, false);
}

export function HashLockInfoDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): HashLockInfoDTO {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: json['id'],
    lock: HashLockEntryDTOFromJSON(json['lock']),
  };
}

export function HashLockInfoDTOToJSON(value?: HashLockInfoDTO | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    id: value.id,
    lock: HashLockEntryDTOToJSON(value.lock),
  };
}
