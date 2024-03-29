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
 * Transaction to lock funds before sending an aggregate bonded transaction.
 * @export
 * @interface HashLockTransactionDTO
 */
export interface HashLockTransactionDTO {
  /**
   * A number that allows uint 32 values.
   * @type {number}
   * @memberof HashLockTransactionDTO
   */
  size: number;
  /**
   * Entity's signature generated by the signer.
   * @type {string}
   * @memberof HashLockTransactionDTO
   */
  signature: string;
  /**
   * Public key.
   * @type {string}
   * @memberof HashLockTransactionDTO
   */
  signerPublicKey: string;
  /**
   * Entity version.
   * @type {number}
   * @memberof HashLockTransactionDTO
   */
  version: number;
  /**
   *
   * @type {NetworkTypeEnum}
   * @memberof HashLockTransactionDTO
   */
  network: NetworkTypeEnum;
  /**
   *
   * @type {number}
   * @memberof HashLockTransactionDTO
   */
  type: number;
  /**
   * Absolute amount. An amount of 123456789 (absolute) for a mosaic with divisibility 6 means 123.456789 (relative).
   * @type {string}
   * @memberof HashLockTransactionDTO
   */
  maxFee: string;
  /**
   * Duration expressed in number of blocks.
   * @type {string}
   * @memberof HashLockTransactionDTO
   */
  deadline: string;
  /**
   * Mosaic identifier. If the most significant bit of byte 0 is set, a namespaceId (alias)
   * is used instead of the real mosaic identifier.
   *
   * @type {string}
   * @memberof HashLockTransactionDTO
   */
  mosaicId: string;
  /**
   * Absolute amount. An amount of 123456789 (absolute) for a mosaic with divisibility 6 means 123.456789 (relative).
   * @type {string}
   * @memberof HashLockTransactionDTO
   */
  amount: string;
  /**
   * Duration expressed in number of blocks.
   * @type {string}
   * @memberof HashLockTransactionDTO
   */
  duration: string;
  /**
   *
   * @type {string}
   * @memberof HashLockTransactionDTO
   */
  hash: string;
}

/**
 * Check if a given object implements the HashLockTransactionDTO interface.
 */
export function instanceOfHashLockTransactionDTO(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'size' in value;
  isInstance = isInstance && 'signature' in value;
  isInstance = isInstance && 'signerPublicKey' in value;
  isInstance = isInstance && 'version' in value;
  isInstance = isInstance && 'network' in value;
  isInstance = isInstance && 'type' in value;
  isInstance = isInstance && 'maxFee' in value;
  isInstance = isInstance && 'deadline' in value;
  isInstance = isInstance && 'mosaicId' in value;
  isInstance = isInstance && 'amount' in value;
  isInstance = isInstance && 'duration' in value;
  isInstance = isInstance && 'hash' in value;

  return isInstance;
}

export function HashLockTransactionDTOFromJSON(json: any): HashLockTransactionDTO {
  return HashLockTransactionDTOFromJSONTyped(json, false);
}

export function HashLockTransactionDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): HashLockTransactionDTO {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    size: json['size'],
    signature: json['signature'],
    signerPublicKey: json['signerPublicKey'],
    version: json['version'],
    network: NetworkTypeEnumFromJSON(json['network']),
    type: json['type'],
    maxFee: json['maxFee'],
    deadline: json['deadline'],
    mosaicId: json['mosaicId'],
    amount: json['amount'],
    duration: json['duration'],
    hash: json['hash'],
  };
}

export function HashLockTransactionDTOToJSON(value?: HashLockTransactionDTO | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    size: value.size,
    signature: value.signature,
    signerPublicKey: value.signerPublicKey,
    version: value.version,
    network: NetworkTypeEnumToJSON(value.network),
    type: value.type,
    maxFee: value.maxFee,
    deadline: value.deadline,
    mosaicId: value.mosaicId,
    amount: value.amount,
    duration: value.duration,
    hash: value.hash,
  };
}
