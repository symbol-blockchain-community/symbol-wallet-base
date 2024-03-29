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
import type { AliasTypeEnum } from './AliasTypeEnum';
import { AliasTypeEnumFromJSON, AliasTypeEnumFromJSONTyped, AliasTypeEnumToJSON } from './AliasTypeEnum';

/**
 *
 * @export
 * @interface AliasDTO
 */
export interface AliasDTO {
  /**
   *
   * @type {AliasTypeEnum}
   * @memberof AliasDTO
   */
  type: AliasTypeEnum;
  /**
   * Mosaic identifier.
   * @type {string}
   * @memberof AliasDTO
   */
  mosaicId?: string;
  /**
   * Address encoded using a 32-character set.
   * @type {string}
   * @memberof AliasDTO
   */
  address?: string;
}

/**
 * Check if a given object implements the AliasDTO interface.
 */
export function instanceOfAliasDTO(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'type' in value;

  return isInstance;
}

export function AliasDTOFromJSON(json: any): AliasDTO {
  return AliasDTOFromJSONTyped(json, false);
}

export function AliasDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): AliasDTO {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    type: AliasTypeEnumFromJSON(json['type']),
    mosaicId: !exists(json, 'mosaicId') ? undefined : json['mosaicId'],
    address: !exists(json, 'address') ? undefined : json['address'],
  };
}

export function AliasDTOToJSON(value?: AliasDTO | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    type: AliasTypeEnumToJSON(value.type),
    mosaicId: value.mosaicId,
    address: value.address,
  };
}
