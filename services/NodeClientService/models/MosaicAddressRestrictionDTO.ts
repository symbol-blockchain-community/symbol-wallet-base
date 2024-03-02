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
import type { MosaicAddressRestrictionEntryWrapperDTO } from './MosaicAddressRestrictionEntryWrapperDTO';
import {
  MosaicAddressRestrictionEntryWrapperDTOFromJSON,
  MosaicAddressRestrictionEntryWrapperDTOFromJSONTyped,
  MosaicAddressRestrictionEntryWrapperDTOToJSON,
} from './MosaicAddressRestrictionEntryWrapperDTO';

/**
 *
 * @export
 * @interface MosaicAddressRestrictionDTO
 */
export interface MosaicAddressRestrictionDTO {
  /**
   * Internal resource identifier.
   * @type {string}
   * @memberof MosaicAddressRestrictionDTO
   */
  id: string;
  /**
   *
   * @type {MosaicAddressRestrictionEntryWrapperDTO}
   * @memberof MosaicAddressRestrictionDTO
   */
  mosaicRestrictionEntry: MosaicAddressRestrictionEntryWrapperDTO;
}

/**
 * Check if a given object implements the MosaicAddressRestrictionDTO interface.
 */
export function instanceOfMosaicAddressRestrictionDTO(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'id' in value;
  isInstance = isInstance && 'mosaicRestrictionEntry' in value;

  return isInstance;
}

export function MosaicAddressRestrictionDTOFromJSON(json: any): MosaicAddressRestrictionDTO {
  return MosaicAddressRestrictionDTOFromJSONTyped(json, false);
}

export function MosaicAddressRestrictionDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): MosaicAddressRestrictionDTO {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: json['id'],
    mosaicRestrictionEntry: MosaicAddressRestrictionEntryWrapperDTOFromJSON(json['mosaicRestrictionEntry']),
  };
}

export function MosaicAddressRestrictionDTOToJSON(value?: MosaicAddressRestrictionDTO | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    id: value.id,
    mosaicRestrictionEntry: MosaicAddressRestrictionEntryWrapperDTOToJSON(value.mosaicRestrictionEntry),
  };
}
