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
import type { TransactionGroupEnum } from './TransactionGroupEnum.js';
import {
    TransactionGroupEnumFromJSON,
    TransactionGroupEnumFromJSONTyped,
    TransactionGroupEnumToJSON,
} from './TransactionGroupEnum.js';
import type { TransactionStatusEnum } from './TransactionStatusEnum.js';
import {
    TransactionStatusEnumFromJSON,
    TransactionStatusEnumFromJSONTyped,
    TransactionStatusEnumToJSON,
} from './TransactionStatusEnum.js';

/**
 * 
 * @export
 * @interface TransactionStatusDTO
 */
export interface TransactionStatusDTO {
    /**
     * 
     * @type {TransactionGroupEnum}
     * @memberof TransactionStatusDTO
     */
    group: TransactionGroupEnum;
    /**
     * 
     * @type {TransactionStatusEnum}
     * @memberof TransactionStatusDTO
     */
    code?: TransactionStatusEnum;
    /**
     * 
     * @type {string}
     * @memberof TransactionStatusDTO
     */
    hash: string;
    /**
     * Duration expressed in number of blocks.
     * @type {string}
     * @memberof TransactionStatusDTO
     */
    deadline: string;
    /**
     * Height of the blockchain.
     * @type {string}
     * @memberof TransactionStatusDTO
     */
    height?: string;
}

/**
 * Check if a given object implements the TransactionStatusDTO interface.
 */
export function instanceOfTransactionStatusDTO(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "group" in value;
    isInstance = isInstance && "hash" in value;
    isInstance = isInstance && "deadline" in value;

    return isInstance;
}

export function TransactionStatusDTOFromJSON(json: any): TransactionStatusDTO {
    return TransactionStatusDTOFromJSONTyped(json, false);
}

export function TransactionStatusDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): TransactionStatusDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'group': TransactionGroupEnumFromJSON(json['group']),
        'code': !exists(json, 'code') ? undefined : TransactionStatusEnumFromJSON(json['code']),
        'hash': json['hash'],
        'deadline': json['deadline'],
        'height': !exists(json, 'height') ? undefined : json['height'],
    };
}

export function TransactionStatusDTOToJSON(value?: TransactionStatusDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'group': TransactionGroupEnumToJSON(value.group),
        'code': TransactionStatusEnumToJSON(value.code),
        'hash': value.hash,
        'deadline': value.deadline,
        'height': value.height,
    };
}

