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
 * Receipt stored when a state change modified an account balance.
 * @export
 * @interface BalanceChangeReceiptDTO
 */
export interface BalanceChangeReceiptDTO {
  /**
   * Version of the receipt.
   * @type {number}
   * @memberof BalanceChangeReceiptDTO
   */
  version: number;
  /**
   *
   * @type {ReceiptTypeEnum}
   * @memberof BalanceChangeReceiptDTO
   */
  type: ReceiptTypeEnum;
  /**
   * Mosaic identifier.
   * @type {string}
   * @memberof BalanceChangeReceiptDTO
   */
  mosaicId: string;
  /**
   * Absolute amount. An amount of 123456789 (absolute) for a mosaic with divisibility 6 means 123.456789 (relative).
   * @type {string}
   * @memberof BalanceChangeReceiptDTO
   */
  amount: string;
  /**
   * Address encoded using a 32-character set.
   * @type {string}
   * @memberof BalanceChangeReceiptDTO
   */
  targetAddress: string;
}

/**
 * Check if a given object implements the BalanceChangeReceiptDTO interface.
 */
export function instanceOfBalanceChangeReceiptDTO(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'version' in value;
  isInstance = isInstance && 'type' in value;
  isInstance = isInstance && 'mosaicId' in value;
  isInstance = isInstance && 'amount' in value;
  isInstance = isInstance && 'targetAddress' in value;

  return isInstance;
}

export function BalanceChangeReceiptDTOFromJSON(json: any): BalanceChangeReceiptDTO {
  return BalanceChangeReceiptDTOFromJSONTyped(json, false);
}

export function BalanceChangeReceiptDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): BalanceChangeReceiptDTO {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    version: json['version'],
    type: ReceiptTypeEnumFromJSON(json['type']),
    mosaicId: json['mosaicId'],
    amount: json['amount'],
    targetAddress: json['targetAddress'],
  };
}

export function BalanceChangeReceiptDTOToJSON(value?: BalanceChangeReceiptDTO | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    version: value.version,
    type: ReceiptTypeEnumToJSON(value.type),
    mosaicId: value.mosaicId,
    amount: value.amount,
    targetAddress: value.targetAddress,
  };
}
