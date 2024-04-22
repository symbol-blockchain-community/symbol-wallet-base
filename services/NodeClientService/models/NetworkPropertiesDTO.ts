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
import type { NodeIdentityEqualityStrategy } from './NodeIdentityEqualityStrategy.js';
import {
    NodeIdentityEqualityStrategyFromJSON,
    NodeIdentityEqualityStrategyFromJSONTyped,
    NodeIdentityEqualityStrategyToJSON,
} from './NodeIdentityEqualityStrategy.js';

/**
 * Network related configuration properties.
 * @export
 * @interface NetworkPropertiesDTO
 */
export interface NetworkPropertiesDTO {
    /**
     * Network identifier.
     * @type {string}
     * @memberof NetworkPropertiesDTO
     */
    identifier?: string;
    /**
     * 
     * @type {NodeIdentityEqualityStrategy}
     * @memberof NetworkPropertiesDTO
     */
    nodeEqualityStrategy?: NodeIdentityEqualityStrategy;
    /**
     * Public key.
     * @type {string}
     * @memberof NetworkPropertiesDTO
     */
    nemesisSignerPublicKey?: string;
    /**
     * 
     * @type {string}
     * @memberof NetworkPropertiesDTO
     */
    generationHashSeed?: string;
    /**
     * Nemesis epoch time adjustment.
     * @type {string}
     * @memberof NetworkPropertiesDTO
     */
    epochAdjustment?: string;
}

/**
 * Check if a given object implements the NetworkPropertiesDTO interface.
 */
export function instanceOfNetworkPropertiesDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function NetworkPropertiesDTOFromJSON(json: any): NetworkPropertiesDTO {
    return NetworkPropertiesDTOFromJSONTyped(json, false);
}

export function NetworkPropertiesDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): NetworkPropertiesDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'identifier': !exists(json, 'identifier') ? undefined : json['identifier'],
        'nodeEqualityStrategy': !exists(json, 'nodeEqualityStrategy') ? undefined : NodeIdentityEqualityStrategyFromJSON(json['nodeEqualityStrategy']),
        'nemesisSignerPublicKey': !exists(json, 'nemesisSignerPublicKey') ? undefined : json['nemesisSignerPublicKey'],
        'generationHashSeed': !exists(json, 'generationHashSeed') ? undefined : json['generationHashSeed'],
        'epochAdjustment': !exists(json, 'epochAdjustment') ? undefined : json['epochAdjustment'],
    };
}

export function NetworkPropertiesDTOToJSON(value?: NetworkPropertiesDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'identifier': value.identifier,
        'nodeEqualityStrategy': NodeIdentityEqualityStrategyToJSON(value.nodeEqualityStrategy),
        'nemesisSignerPublicKey': value.nemesisSignerPublicKey,
        'generationHashSeed': value.generationHashSeed,
        'epochAdjustment': value.epochAdjustment,
    };
}

