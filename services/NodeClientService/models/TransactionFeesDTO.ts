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
 * @interface TransactionFeesDTO
 */
export interface TransactionFeesDTO {
  /**
   * Fee multiplier applied to transactions contained in block.
   * @type {number}
   * @memberof TransactionFeesDTO
   */
  averageFeeMultiplier: number;
  /**
   * Fee multiplier applied to transactions contained in block.
   * @type {number}
   * @memberof TransactionFeesDTO
   */
  medianFeeMultiplier: number;
  /**
   * Fee multiplier applied to transactions contained in block.
   * @type {number}
   * @memberof TransactionFeesDTO
   */
  highestFeeMultiplier: number;
  /**
   * Fee multiplier applied to transactions contained in block.
   * @type {number}
   * @memberof TransactionFeesDTO
   */
  lowestFeeMultiplier: number;
  /**
   * Fee multiplier applied to transactions contained in block.
   * @type {number}
   * @memberof TransactionFeesDTO
   */
  minFeeMultiplier: number;
}

/**
 * Check if a given object implements the TransactionFeesDTO interface.
 */
export function instanceOfTransactionFeesDTO(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'averageFeeMultiplier' in value;
  isInstance = isInstance && 'medianFeeMultiplier' in value;
  isInstance = isInstance && 'highestFeeMultiplier' in value;
  isInstance = isInstance && 'lowestFeeMultiplier' in value;
  isInstance = isInstance && 'minFeeMultiplier' in value;

  return isInstance;
}

export function TransactionFeesDTOFromJSON(json: any): TransactionFeesDTO {
  return TransactionFeesDTOFromJSONTyped(json, false);
}

export function TransactionFeesDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): TransactionFeesDTO {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    averageFeeMultiplier: json['averageFeeMultiplier'],
    medianFeeMultiplier: json['medianFeeMultiplier'],
    highestFeeMultiplier: json['highestFeeMultiplier'],
    lowestFeeMultiplier: json['lowestFeeMultiplier'],
    minFeeMultiplier: json['minFeeMultiplier'],
  };
}

export function TransactionFeesDTOToJSON(value?: TransactionFeesDTO | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    averageFeeMultiplier: value.averageFeeMultiplier,
    medianFeeMultiplier: value.medianFeeMultiplier,
    highestFeeMultiplier: value.highestFeeMultiplier,
    lowestFeeMultiplier: value.lowestFeeMultiplier,
    minFeeMultiplier: value.minFeeMultiplier,
  };
}
