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
import type { MosaicNamesDTO } from './MosaicNamesDTO';
import { MosaicNamesDTOFromJSON, MosaicNamesDTOFromJSONTyped, MosaicNamesDTOToJSON } from './MosaicNamesDTO';

/**
 *
 * @export
 * @interface MosaicsNamesDTO
 */
export interface MosaicsNamesDTO {
  /**
   * Array of mosaic names.
   * @type {Array<MosaicNamesDTO>}
   * @memberof MosaicsNamesDTO
   */
  mosaicNames: Array<MosaicNamesDTO>;
}

/**
 * Check if a given object implements the MosaicsNamesDTO interface.
 */
export function instanceOfMosaicsNamesDTO(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'mosaicNames' in value;

  return isInstance;
}

export function MosaicsNamesDTOFromJSON(json: any): MosaicsNamesDTO {
  return MosaicsNamesDTOFromJSONTyped(json, false);
}

export function MosaicsNamesDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): MosaicsNamesDTO {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    mosaicNames: (json['mosaicNames'] as Array<any>).map(MosaicNamesDTOFromJSON),
  };
}

export function MosaicsNamesDTOToJSON(value?: MosaicsNamesDTO | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    mosaicNames: (value.mosaicNames as Array<any>).map(MosaicNamesDTOToJSON),
  };
}
