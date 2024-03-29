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
 * @interface MosaicNetworkPropertiesDTO
 */
export interface MosaicNetworkPropertiesDTO {
  /**
   * Maximum number of mosaics that an account can own.
   * @type {string}
   * @memberof MosaicNetworkPropertiesDTO
   */
  maxMosaicsPerAccount?: string;
  /**
   * Maximum mosaic duration.
   * @type {string}
   * @memberof MosaicNetworkPropertiesDTO
   */
  maxMosaicDuration?: string;
  /**
   * Maximum mosaic divisibility.
   * @type {string}
   * @memberof MosaicNetworkPropertiesDTO
   */
  maxMosaicDivisibility?: string;
  /**
   * Address encoded using a 32-character set.
   * @type {string}
   * @memberof MosaicNetworkPropertiesDTO
   */
  mosaicRentalFeeSinkAddress?: string;
  /**
   * Mosaic rental fee.
   * @type {string}
   * @memberof MosaicNetworkPropertiesDTO
   */
  mosaicRentalFee?: string;
}

/**
 * Check if a given object implements the MosaicNetworkPropertiesDTO interface.
 */
export function instanceOfMosaicNetworkPropertiesDTO(value: object): boolean {
  let isInstance = true;

  return isInstance;
}

export function MosaicNetworkPropertiesDTOFromJSON(json: any): MosaicNetworkPropertiesDTO {
  return MosaicNetworkPropertiesDTOFromJSONTyped(json, false);
}

export function MosaicNetworkPropertiesDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): MosaicNetworkPropertiesDTO {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    maxMosaicsPerAccount: !exists(json, 'maxMosaicsPerAccount') ? undefined : json['maxMosaicsPerAccount'],
    maxMosaicDuration: !exists(json, 'maxMosaicDuration') ? undefined : json['maxMosaicDuration'],
    maxMosaicDivisibility: !exists(json, 'maxMosaicDivisibility') ? undefined : json['maxMosaicDivisibility'],
    mosaicRentalFeeSinkAddress: !exists(json, 'mosaicRentalFeeSinkAddress')
      ? undefined
      : json['mosaicRentalFeeSinkAddress'],
    mosaicRentalFee: !exists(json, 'mosaicRentalFee') ? undefined : json['mosaicRentalFee'],
  };
}

export function MosaicNetworkPropertiesDTOToJSON(value?: MosaicNetworkPropertiesDTO | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    maxMosaicsPerAccount: value.maxMosaicsPerAccount,
    maxMosaicDuration: value.maxMosaicDuration,
    maxMosaicDivisibility: value.maxMosaicDivisibility,
    mosaicRentalFeeSinkAddress: value.mosaicRentalFeeSinkAddress,
    mosaicRentalFee: value.mosaicRentalFee,
  };
}
