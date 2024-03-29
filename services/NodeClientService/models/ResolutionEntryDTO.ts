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
import type { ResolutionEntryDTOResolved } from './ResolutionEntryDTOResolved';
import {
  ResolutionEntryDTOResolvedFromJSON,
  ResolutionEntryDTOResolvedFromJSONTyped,
  ResolutionEntryDTOResolvedToJSON,
} from './ResolutionEntryDTOResolved';
import type { SourceDTO } from './SourceDTO';
import { SourceDTOFromJSON, SourceDTOFromJSONTyped, SourceDTOToJSON } from './SourceDTO';

/**
 *
 * @export
 * @interface ResolutionEntryDTO
 */
export interface ResolutionEntryDTO {
  /**
   *
   * @type {SourceDTO}
   * @memberof ResolutionEntryDTO
   */
  source: SourceDTO;
  /**
   *
   * @type {ResolutionEntryDTOResolved}
   * @memberof ResolutionEntryDTO
   */
  resolved: ResolutionEntryDTOResolved;
}

/**
 * Check if a given object implements the ResolutionEntryDTO interface.
 */
export function instanceOfResolutionEntryDTO(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'source' in value;
  isInstance = isInstance && 'resolved' in value;

  return isInstance;
}

export function ResolutionEntryDTOFromJSON(json: any): ResolutionEntryDTO {
  return ResolutionEntryDTOFromJSONTyped(json, false);
}

export function ResolutionEntryDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): ResolutionEntryDTO {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    source: SourceDTOFromJSON(json['source']),
    resolved: ResolutionEntryDTOResolvedFromJSON(json['resolved']),
  };
}

export function ResolutionEntryDTOToJSON(value?: ResolutionEntryDTO | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    source: SourceDTOToJSON(value.source),
    resolved: ResolutionEntryDTOResolvedToJSON(value.resolved),
  };
}
