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
 * Transaction to create or modify a multisig account.
 * @export
 * @interface NamespaceMetadataTransactionDTO
 */
export interface NamespaceMetadataTransactionDTO {
  /**
   * A number that allows uint 32 values.
   * @type {number}
   * @memberof NamespaceMetadataTransactionDTO
   */
  size: number;
  /**
   * Entity's signature generated by the signer.
   * @type {string}
   * @memberof NamespaceMetadataTransactionDTO
   */
  signature: string;
  /**
   * Public key.
   * @type {string}
   * @memberof NamespaceMetadataTransactionDTO
   */
  signerPublicKey: string;
  /**
   * Entity version.
   * @type {number}
   * @memberof NamespaceMetadataTransactionDTO
   */
  version: number;
  /**
   *
   * @type {NetworkTypeEnum}
   * @memberof NamespaceMetadataTransactionDTO
   */
  network: NetworkTypeEnum;
  /**
   *
   * @type {number}
   * @memberof NamespaceMetadataTransactionDTO
   */
  type: number;
  /**
   * Absolute amount. An amount of 123456789 (absolute) for a mosaic with divisibility 6 means 123.456789 (relative).
   * @type {string}
   * @memberof NamespaceMetadataTransactionDTO
   */
  maxFee: string;
  /**
   * Duration expressed in number of blocks.
   * @type {string}
   * @memberof NamespaceMetadataTransactionDTO
   */
  deadline: string;
  /**
   * Address expressed in Base32 format. If the bit 0 of byte 0 is not set (like in 0x90), then it is a
   * regular address. Example: TAOXUJOTTW3W5XTBQMQEX3SQNA6MCUVGXLXR3TA.
   * Otherwise (e.g. 0x91) it represents a namespace id which starts at byte 1. Example: THBIMC3THGH5RUYAAAAAAAAAAAAAAAAAAAAAAAA
   *
   * @type {string}
   * @memberof NamespaceMetadataTransactionDTO
   */
  targetAddress: string;
  /**
   * Metadata key scoped to source, target and type expressed.
   * @type {string}
   * @memberof NamespaceMetadataTransactionDTO
   */
  scopedMetadataKey: string;
  /**
   * Namespace identifier.
   * @type {string}
   * @memberof NamespaceMetadataTransactionDTO
   */
  targetNamespaceId?: string;
  /**
   * Change in value size in bytes.
   * @type {number}
   * @memberof NamespaceMetadataTransactionDTO
   */
  valueSizeDelta: number;
  /**
   * A number that allows uint 32 values.
   * @type {number}
   * @memberof NamespaceMetadataTransactionDTO
   */
  valueSize: number;
  /**
   * Metadata value. If embedded in a transaction, this is calculated as xor(previous-value, value).
   * @type {string}
   * @memberof NamespaceMetadataTransactionDTO
   */
  value: string;
}

/**
 * Check if a given object implements the NamespaceMetadataTransactionDTO interface.
 */
export function instanceOfNamespaceMetadataTransactionDTO(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'size' in value;
  isInstance = isInstance && 'signature' in value;
  isInstance = isInstance && 'signerPublicKey' in value;
  isInstance = isInstance && 'version' in value;
  isInstance = isInstance && 'network' in value;
  isInstance = isInstance && 'type' in value;
  isInstance = isInstance && 'maxFee' in value;
  isInstance = isInstance && 'deadline' in value;
  isInstance = isInstance && 'targetAddress' in value;
  isInstance = isInstance && 'scopedMetadataKey' in value;
  isInstance = isInstance && 'valueSizeDelta' in value;
  isInstance = isInstance && 'valueSize' in value;
  isInstance = isInstance && 'value' in value;

  return isInstance;
}

export function NamespaceMetadataTransactionDTOFromJSON(json: any): NamespaceMetadataTransactionDTO {
  return NamespaceMetadataTransactionDTOFromJSONTyped(json, false);
}

export function NamespaceMetadataTransactionDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): NamespaceMetadataTransactionDTO {
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
    targetAddress: json['targetAddress'],
    scopedMetadataKey: json['scopedMetadataKey'],
    targetNamespaceId: !exists(json, 'targetNamespaceId') ? undefined : json['targetNamespaceId'],
    valueSizeDelta: json['valueSizeDelta'],
    valueSize: json['valueSize'],
    value: json['value'],
  };
}

export function NamespaceMetadataTransactionDTOToJSON(value?: NamespaceMetadataTransactionDTO | null): any {
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
    targetAddress: value.targetAddress,
    scopedMetadataKey: value.scopedMetadataKey,
    targetNamespaceId: value.targetNamespaceId,
    valueSizeDelta: value.valueSizeDelta,
    valueSize: value.valueSize,
    value: value.value,
  };
}
