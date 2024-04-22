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
import type { ReceiptTypeEnum } from './ReceiptTypeEnum.js';
import {
    ReceiptTypeEnumFromJSON,
    ReceiptTypeEnumFromJSONTyped,
    ReceiptTypeEnumToJSON,
} from './ReceiptTypeEnum.js';

/**
 * 
 * @export
 * @interface ReceiptDTO
 */
export interface ReceiptDTO {
    /**
     * Version of the receipt.
     * @type {number}
     * @memberof ReceiptDTO
     */
    version: number;
    /**
     * 
     * @type {ReceiptTypeEnum}
     * @memberof ReceiptDTO
     */
    type: ReceiptTypeEnum;
}

/**
 * Check if a given object implements the ReceiptDTO interface.
 */
export function instanceOfReceiptDTO(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "version" in value;
    isInstance = isInstance && "type" in value;

    return isInstance;
}

export function ReceiptDTOFromJSON(json: any): ReceiptDTO {
    return ReceiptDTOFromJSONTyped(json, false);
}

export function ReceiptDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): ReceiptDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'version': json['version'],
        'type': ReceiptTypeEnumFromJSON(json['type']),
    };
}

export function ReceiptDTOToJSON(value?: ReceiptDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'version': value.version,
        'type': ReceiptTypeEnumToJSON(value.type),
    };
}

