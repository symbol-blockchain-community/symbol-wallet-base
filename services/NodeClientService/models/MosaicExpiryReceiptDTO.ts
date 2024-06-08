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
import type { ReceiptTypeEnum } from './ReceiptTypeEnum';
import { ReceiptTypeEnumFromJSON, ReceiptTypeEnumFromJSONTyped, ReceiptTypeEnumToJSON } from './ReceiptTypeEnum';

/**
 * Receipt stored when a mosaic expires.
 * @export
 * @interface MosaicExpiryReceiptDTO
 */
export interface MosaicExpiryReceiptDTO {
  /**
   * Version of the receipt.
   * @type {number}
   * @memberof MosaicExpiryReceiptDTO
   */
  version: number;
  /**
   *
   * @type {ReceiptTypeEnum}
   * @memberof MosaicExpiryReceiptDTO
   */
  type: ReceiptTypeEnum;
  /**
   * Mosaic identifier.
   * @type {string}
   * @memberof MosaicExpiryReceiptDTO
   */
  artifactId: string;
}

/**
 * Check if a given object implements the MosaicExpiryReceiptDTO interface.
 */
export function instanceOfMosaicExpiryReceiptDTO(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'version' in value;
  isInstance = isInstance && 'type' in value;
  isInstance = isInstance && 'artifactId' in value;

  return isInstance;
}

export function MosaicExpiryReceiptDTOFromJSON(json: any): MosaicExpiryReceiptDTO {
  return MosaicExpiryReceiptDTOFromJSONTyped(json, false);
}

export function MosaicExpiryReceiptDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): MosaicExpiryReceiptDTO {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    version: json['version'],
    type: ReceiptTypeEnumFromJSON(json['type']),
    artifactId: json['artifactId'],
  };
}

export function MosaicExpiryReceiptDTOToJSON(value?: MosaicExpiryReceiptDTO | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    version: value.version,
    type: ReceiptTypeEnumToJSON(value.type),
    artifactId: value.artifactId,
  };
}
