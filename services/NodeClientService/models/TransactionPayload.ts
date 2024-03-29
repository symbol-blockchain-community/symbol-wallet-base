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
 * @interface TransactionPayload
 */
export interface TransactionPayload {
  /**
   * Transaction payload in hexadecimal format.
   * @type {string}
   * @memberof TransactionPayload
   */
  payload?: string;
}

/**
 * Check if a given object implements the TransactionPayload interface.
 */
export function instanceOfTransactionPayload(value: object): boolean {
  let isInstance = true;

  return isInstance;
}

export function TransactionPayloadFromJSON(json: any): TransactionPayload {
  return TransactionPayloadFromJSONTyped(json, false);
}

export function TransactionPayloadFromJSONTyped(json: any, ignoreDiscriminator: boolean): TransactionPayload {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    payload: !exists(json, 'payload') ? undefined : json['payload'],
  };
}

export function TransactionPayloadToJSON(value?: TransactionPayload | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    payload: value.payload,
  };
}
