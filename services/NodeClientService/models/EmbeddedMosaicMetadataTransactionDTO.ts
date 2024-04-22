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

import { exists, mapValues } from '../runtime.js';
import type { NetworkTypeEnum } from './NetworkTypeEnum.js';
import {
    NetworkTypeEnumFromJSON,
    NetworkTypeEnumFromJSONTyped,
    NetworkTypeEnumToJSON,
} from './NetworkTypeEnum.js';

/**
 * 
 * @export
 * @interface EmbeddedMosaicMetadataTransactionDTO
 */
export interface EmbeddedMosaicMetadataTransactionDTO {
    /**
     * Public key.
     * @type {string}
     * @memberof EmbeddedMosaicMetadataTransactionDTO
     */
    signerPublicKey: string;
    /**
     * Entity version.
     * @type {number}
     * @memberof EmbeddedMosaicMetadataTransactionDTO
     */
    version: number;
    /**
     * 
     * @type {NetworkTypeEnum}
     * @memberof EmbeddedMosaicMetadataTransactionDTO
     */
    network: NetworkTypeEnum;
    /**
     * 
     * @type {number}
     * @memberof EmbeddedMosaicMetadataTransactionDTO
     */
    type: number;
    /**
     * Address expressed in Base32 format. If the bit 0 of byte 0 is not set (like in 0x90), then it is a
     * regular address. Example: TAOXUJOTTW3W5XTBQMQEX3SQNA6MCUVGXLXR3TA. 
     * Otherwise (e.g. 0x91) it represents a namespace id which starts at byte 1. Example: THBIMC3THGH5RUYAAAAAAAAAAAAAAAAAAAAAAAA
     * 
     * @type {string}
     * @memberof EmbeddedMosaicMetadataTransactionDTO
     */
    targetAddress: string;
    /**
     * Metadata key scoped to source, target and type expressed.
     * @type {string}
     * @memberof EmbeddedMosaicMetadataTransactionDTO
     */
    scopedMetadataKey: string;
    /**
     * Mosaic identifier. If the most significant bit of byte 0 is set, a namespaceId (alias)
     * is used instead of the real mosaic identifier.
     * 
     * @type {string}
     * @memberof EmbeddedMosaicMetadataTransactionDTO
     */
    targetMosaicId: string;
    /**
     * Change in value size in bytes.
     * @type {number}
     * @memberof EmbeddedMosaicMetadataTransactionDTO
     */
    valueSizeDelta: number;
    /**
     * A number that allows uint 32 values.
     * @type {number}
     * @memberof EmbeddedMosaicMetadataTransactionDTO
     */
    valueSize: number;
    /**
     * Metadata value. If embedded in a transaction, this is calculated as xor(previous-value, value).
     * @type {string}
     * @memberof EmbeddedMosaicMetadataTransactionDTO
     */
    value: string;
}

/**
 * Check if a given object implements the EmbeddedMosaicMetadataTransactionDTO interface.
 */
export function instanceOfEmbeddedMosaicMetadataTransactionDTO(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "signerPublicKey" in value;
    isInstance = isInstance && "version" in value;
    isInstance = isInstance && "network" in value;
    isInstance = isInstance && "type" in value;
    isInstance = isInstance && "targetAddress" in value;
    isInstance = isInstance && "scopedMetadataKey" in value;
    isInstance = isInstance && "targetMosaicId" in value;
    isInstance = isInstance && "valueSizeDelta" in value;
    isInstance = isInstance && "valueSize" in value;
    isInstance = isInstance && "value" in value;

    return isInstance;
}

export function EmbeddedMosaicMetadataTransactionDTOFromJSON(json: any): EmbeddedMosaicMetadataTransactionDTO {
    return EmbeddedMosaicMetadataTransactionDTOFromJSONTyped(json, false);
}

export function EmbeddedMosaicMetadataTransactionDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): EmbeddedMosaicMetadataTransactionDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'signerPublicKey': json['signerPublicKey'],
        'version': json['version'],
        'network': NetworkTypeEnumFromJSON(json['network']),
        'type': json['type'],
        'targetAddress': json['targetAddress'],
        'scopedMetadataKey': json['scopedMetadataKey'],
        'targetMosaicId': json['targetMosaicId'],
        'valueSizeDelta': json['valueSizeDelta'],
        'valueSize': json['valueSize'],
        'value': json['value'],
    };
}

export function EmbeddedMosaicMetadataTransactionDTOToJSON(value?: EmbeddedMosaicMetadataTransactionDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'signerPublicKey': value.signerPublicKey,
        'version': value.version,
        'network': NetworkTypeEnumToJSON(value.network),
        'type': value.type,
        'targetAddress': value.targetAddress,
        'scopedMetadataKey': value.scopedMetadataKey,
        'targetMosaicId': value.targetMosaicId,
        'valueSizeDelta': value.valueSizeDelta,
        'valueSize': value.valueSize,
        'value': value.value,
    };
}

