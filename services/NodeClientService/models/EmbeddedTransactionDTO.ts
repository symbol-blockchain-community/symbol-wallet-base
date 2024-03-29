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
import type { NetworkTypeEnum } from './NetworkTypeEnum';
import { NetworkTypeEnumFromJSON, NetworkTypeEnumFromJSONTyped, NetworkTypeEnumToJSON } from './NetworkTypeEnum';

/**
 *
 * @export
 * @interface EmbeddedTransactionDTO
 */
export interface EmbeddedTransactionDTO {
  /**
   * Public key.
   * @type {string}
   * @memberof EmbeddedTransactionDTO
   */
  signerPublicKey: string;
  /**
   * Entity version.
   * @type {number}
   * @memberof EmbeddedTransactionDTO
   */
  version: number;
  /**
   *
   * @type {NetworkTypeEnum}
   * @memberof EmbeddedTransactionDTO
   */
  network: NetworkTypeEnum;
  /**
   *
   * @type {number}
   * @memberof EmbeddedTransactionDTO
   */
  type: number;
}

/**
 * Check if a given object implements the EmbeddedTransactionDTO interface.
 */
export function instanceOfEmbeddedTransactionDTO(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'signerPublicKey' in value;
  isInstance = isInstance && 'version' in value;
  isInstance = isInstance && 'network' in value;
  isInstance = isInstance && 'type' in value;

  return isInstance;
}

export function EmbeddedTransactionDTOFromJSON(json: any): EmbeddedTransactionDTO {
  return EmbeddedTransactionDTOFromJSONTyped(json, false);
}

export function EmbeddedTransactionDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): EmbeddedTransactionDTO {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    signerPublicKey: json['signerPublicKey'],
    version: json['version'],
    network: NetworkTypeEnumFromJSON(json['network']),
    type: json['type'],
  };
}

export function EmbeddedTransactionDTOToJSON(value?: EmbeddedTransactionDTO | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    signerPublicKey: value.signerPublicKey,
    version: value.version,
    network: NetworkTypeEnumToJSON(value.network),
    type: value.type,
  };
}
