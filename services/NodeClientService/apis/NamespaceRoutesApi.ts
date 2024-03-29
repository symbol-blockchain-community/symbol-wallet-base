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

import * as runtime from '../runtime';
import type {
  AccountsNamesDTO,
  Addresses,
  AliasTypeEnum,
  MerkleStateInfoDTO,
  ModelError,
  MosaicIds,
  MosaicsNamesDTO,
  NamespaceIds,
  NamespaceInfoDTO,
  NamespaceNameDTO,
  NamespacePage,
  NamespaceRegistrationTypeEnum,
  Order,
} from '../models/index';
import {
  AccountsNamesDTOFromJSON,
  AccountsNamesDTOToJSON,
  AddressesFromJSON,
  AddressesToJSON,
  AliasTypeEnumFromJSON,
  AliasTypeEnumToJSON,
  MerkleStateInfoDTOFromJSON,
  MerkleStateInfoDTOToJSON,
  ModelErrorFromJSON,
  ModelErrorToJSON,
  MosaicIdsFromJSON,
  MosaicIdsToJSON,
  MosaicsNamesDTOFromJSON,
  MosaicsNamesDTOToJSON,
  NamespaceIdsFromJSON,
  NamespaceIdsToJSON,
  NamespaceInfoDTOFromJSON,
  NamespaceInfoDTOToJSON,
  NamespaceNameDTOFromJSON,
  NamespaceNameDTOToJSON,
  NamespacePageFromJSON,
  NamespacePageToJSON,
  NamespaceRegistrationTypeEnumFromJSON,
  NamespaceRegistrationTypeEnumToJSON,
  OrderFromJSON,
  OrderToJSON,
} from '../models/index';

export interface GetAccountsNamesRequest {
  addresses: Addresses;
}

export interface GetMosaicsNamesRequest {
  mosaicIds: MosaicIds;
}

export interface GetNamespaceRequest {
  namespaceId: string;
}

export interface GetNamespaceMerkleRequest {
  namespaceId: string;
}

export interface GetNamespacesNamesRequest {
  namespaceIds: NamespaceIds;
}

export interface SearchNamespacesRequest {
  ownerAddress?: string;
  registrationType?: NamespaceRegistrationTypeEnum;
  level0?: string;
  aliasType?: AliasTypeEnum;
  pageSize?: number;
  pageNumber?: number;
  offset?: string;
  order?: Order;
}

/**
 *
 */
export class NamespaceRoutesApi extends runtime.BaseAPI {
  /**
   * Returns friendly names for accounts.
   * Get readable names for a set of accountIds
   */
  async getAccountsNamesRaw(
    requestParameters: GetAccountsNamesRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<AccountsNamesDTO>> {
    if (requestParameters.addresses === null || requestParameters.addresses === undefined) {
      throw new runtime.RequiredError(
        'addresses',
        'Required parameter requestParameters.addresses was null or undefined when calling getAccountsNames.'
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/namespaces/account/names`,
        method: 'POST',
        headers: headerParameters,
        query: queryParameters,
        body: AddressesToJSON(requestParameters.addresses),
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => AccountsNamesDTOFromJSON(jsonValue));
  }

  /**
   * Returns friendly names for accounts.
   * Get readable names for a set of accountIds
   */
  async getAccountsNames(
    requestParameters: GetAccountsNamesRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<AccountsNamesDTO> {
    const response = await this.getAccountsNamesRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Returns friendly names for mosaics.
   * Get readable names for a set of mosaics
   */
  async getMosaicsNamesRaw(
    requestParameters: GetMosaicsNamesRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<MosaicsNamesDTO>> {
    if (requestParameters.mosaicIds === null || requestParameters.mosaicIds === undefined) {
      throw new runtime.RequiredError(
        'mosaicIds',
        'Required parameter requestParameters.mosaicIds was null or undefined when calling getMosaicsNames.'
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/namespaces/mosaic/names`,
        method: 'POST',
        headers: headerParameters,
        query: queryParameters,
        body: MosaicIdsToJSON(requestParameters.mosaicIds),
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => MosaicsNamesDTOFromJSON(jsonValue));
  }

  /**
   * Returns friendly names for mosaics.
   * Get readable names for a set of mosaics
   */
  async getMosaicsNames(
    requestParameters: GetMosaicsNamesRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<MosaicsNamesDTO> {
    const response = await this.getMosaicsNamesRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Gets the namespace for a given namespace identifier.
   * Get namespace information
   */
  async getNamespaceRaw(
    requestParameters: GetNamespaceRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<NamespaceInfoDTO>> {
    if (requestParameters.namespaceId === null || requestParameters.namespaceId === undefined) {
      throw new runtime.RequiredError(
        'namespaceId',
        'Required parameter requestParameters.namespaceId was null or undefined when calling getNamespace.'
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/namespaces/{namespaceId}`.replace(
          `{${'namespaceId'}}`,
          encodeURIComponent(String(requestParameters.namespaceId))
        ),
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => NamespaceInfoDTOFromJSON(jsonValue));
  }

  /**
   * Gets the namespace for a given namespace identifier.
   * Get namespace information
   */
  async getNamespace(
    requestParameters: GetNamespaceRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<NamespaceInfoDTO> {
    const response = await this.getNamespaceRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Gets the namespace merkle for a given namespace identifier.
   * Get namespace merkle information
   */
  async getNamespaceMerkleRaw(
    requestParameters: GetNamespaceMerkleRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<MerkleStateInfoDTO>> {
    if (requestParameters.namespaceId === null || requestParameters.namespaceId === undefined) {
      throw new runtime.RequiredError(
        'namespaceId',
        'Required parameter requestParameters.namespaceId was null or undefined when calling getNamespaceMerkle.'
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/namespaces/{namespaceId}/merkle`.replace(
          `{${'namespaceId'}}`,
          encodeURIComponent(String(requestParameters.namespaceId))
        ),
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => MerkleStateInfoDTOFromJSON(jsonValue));
  }

  /**
   * Gets the namespace merkle for a given namespace identifier.
   * Get namespace merkle information
   */
  async getNamespaceMerkle(
    requestParameters: GetNamespaceMerkleRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<MerkleStateInfoDTO> {
    const response = await this.getNamespaceMerkleRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Returns friendly names for namespaces.
   * Get readable names for a set of namespaces
   */
  async getNamespacesNamesRaw(
    requestParameters: GetNamespacesNamesRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<Array<NamespaceNameDTO>>> {
    if (requestParameters.namespaceIds === null || requestParameters.namespaceIds === undefined) {
      throw new runtime.RequiredError(
        'namespaceIds',
        'Required parameter requestParameters.namespaceIds was null or undefined when calling getNamespacesNames.'
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/namespaces/names`,
        method: 'POST',
        headers: headerParameters,
        query: queryParameters,
        body: NamespaceIdsToJSON(requestParameters.namespaceIds),
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(NamespaceNameDTOFromJSON));
  }

  /**
   * Returns friendly names for namespaces.
   * Get readable names for a set of namespaces
   */
  async getNamespacesNames(
    requestParameters: GetNamespacesNamesRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<Array<NamespaceNameDTO>> {
    const response = await this.getNamespacesNamesRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Gets an array of namespaces.
   * Search namespaces
   */
  async searchNamespacesRaw(
    requestParameters: SearchNamespacesRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<NamespacePage>> {
    const queryParameters: any = {};

    if (requestParameters.ownerAddress !== undefined) {
      queryParameters['ownerAddress'] = requestParameters.ownerAddress;
    }

    if (requestParameters.registrationType !== undefined) {
      queryParameters['registrationType'] = requestParameters.registrationType;
    }

    if (requestParameters.level0 !== undefined) {
      queryParameters['level0'] = requestParameters.level0;
    }

    if (requestParameters.aliasType !== undefined) {
      queryParameters['aliasType'] = requestParameters.aliasType;
    }

    if (requestParameters.pageSize !== undefined) {
      queryParameters['pageSize'] = requestParameters.pageSize;
    }

    if (requestParameters.pageNumber !== undefined) {
      queryParameters['pageNumber'] = requestParameters.pageNumber;
    }

    if (requestParameters.offset !== undefined) {
      queryParameters['offset'] = requestParameters.offset;
    }

    if (requestParameters.order !== undefined) {
      queryParameters['order'] = requestParameters.order;
    }

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/namespaces`,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => NamespacePageFromJSON(jsonValue));
  }

  /**
   * Gets an array of namespaces.
   * Search namespaces
   */
  async searchNamespaces(
    requestParameters: SearchNamespacesRequest = {},
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<NamespacePage> {
    const response = await this.searchNamespacesRaw(requestParameters, initOverrides);
    return await response.value();
  }
}
