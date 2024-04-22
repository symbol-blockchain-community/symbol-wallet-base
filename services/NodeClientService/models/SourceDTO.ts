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
 * Transaction that triggered the receipt.
 * @export
 * @interface SourceDTO
 */
export interface SourceDTO {
    /**
     * A number that allows uint 32 values.
     * @type {number}
     * @memberof SourceDTO
     */
    primaryId: number;
    /**
     * A number that allows uint 32 values.
     * @type {number}
     * @memberof SourceDTO
     */
    secondaryId: number;
}

/**
 * Check if a given object implements the SourceDTO interface.
 */
export function instanceOfSourceDTO(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "primaryId" in value;
    isInstance = isInstance && "secondaryId" in value;

    return isInstance;
}

export function SourceDTOFromJSON(json: any): SourceDTO {
    return SourceDTOFromJSONTyped(json, false);
}

export function SourceDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): SourceDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'primaryId': json['primaryId'],
        'secondaryId': json['secondaryId'],
    };
}

export function SourceDTOToJSON(value?: SourceDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'primaryId': value.primaryId,
        'secondaryId': value.secondaryId,
    };
}

