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
/**
 * 
 * @export
 * @interface EmbeddedTransactionMetaDTO
 */
export interface EmbeddedTransactionMetaDTO {
    /**
     * Height of the blockchain.
     * @type {string}
     * @memberof EmbeddedTransactionMetaDTO
     */
    height: string;
    /**
     * 
     * @type {string}
     * @memberof EmbeddedTransactionMetaDTO
     */
    aggregateHash: string;
    /**
     * Identifier of the aggregate transaction.
     * @type {string}
     * @memberof EmbeddedTransactionMetaDTO
     */
    aggregateId: string;
    /**
     * Transaction index within the aggregate.
     * @type {number}
     * @memberof EmbeddedTransactionMetaDTO
     */
    index: number;
    /**
     * Number of milliseconds elapsed since the creation of the nemesis block. This value can be converted to epoch time by adding the network's 'epochAdjustment'.
     * @type {string}
     * @memberof EmbeddedTransactionMetaDTO
     */
    timestamp?: string;
    /**
     * Fee multiplier applied to transactions contained in block.
     * @type {number}
     * @memberof EmbeddedTransactionMetaDTO
     */
    feeMultiplier?: number;
}

/**
 * Check if a given object implements the EmbeddedTransactionMetaDTO interface.
 */
export function instanceOfEmbeddedTransactionMetaDTO(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "height" in value;
    isInstance = isInstance && "aggregateHash" in value;
    isInstance = isInstance && "aggregateId" in value;
    isInstance = isInstance && "index" in value;

    return isInstance;
}

export function EmbeddedTransactionMetaDTOFromJSON(json: any): EmbeddedTransactionMetaDTO {
    return EmbeddedTransactionMetaDTOFromJSONTyped(json, false);
}

export function EmbeddedTransactionMetaDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): EmbeddedTransactionMetaDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'height': json['height'],
        'aggregateHash': json['aggregateHash'],
        'aggregateId': json['aggregateId'],
        'index': json['index'],
        'timestamp': !exists(json, 'timestamp') ? undefined : json['timestamp'],
        'feeMultiplier': !exists(json, 'feeMultiplier') ? undefined : json['feeMultiplier'],
    };
}

export function EmbeddedTransactionMetaDTOToJSON(value?: EmbeddedTransactionMetaDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'height': value.height,
        'aggregateHash': value.aggregateHash,
        'aggregateId': value.aggregateId,
        'index': value.index,
        'timestamp': value.timestamp,
        'feeMultiplier': value.feeMultiplier,
    };
}

