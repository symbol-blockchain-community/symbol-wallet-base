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
 * @interface Mosaic
 */
export interface Mosaic {
    /**
     * Mosaic identifier.
     * @type {string}
     * @memberof Mosaic
     */
    id: string;
    /**
     * Absolute amount. An amount of 123456789 (absolute) for a mosaic with divisibility 6 means 123.456789 (relative).
     * @type {string}
     * @memberof Mosaic
     */
    amount: string;
}

/**
 * Check if a given object implements the Mosaic interface.
 */
export function instanceOfMosaic(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "amount" in value;

    return isInstance;
}

export function MosaicFromJSON(json: any): Mosaic {
    return MosaicFromJSONTyped(json, false);
}

export function MosaicFromJSONTyped(json: any, ignoreDiscriminator: boolean): Mosaic {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'amount': json['amount'],
    };
}

export function MosaicToJSON(value?: Mosaic | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'amount': value.amount,
    };
}

