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
  ModelError,
  NetworkConfigurationDTO,
  NetworkTypeDTO,
  RentalFeesDTO,
  TransactionFeesDTO,
} from '../models/index';
import {
  ModelErrorFromJSON,
  ModelErrorToJSON,
  NetworkConfigurationDTOFromJSON,
  NetworkConfigurationDTOToJSON,
  NetworkTypeDTOFromJSON,
  NetworkTypeDTOToJSON,
  RentalFeesDTOFromJSON,
  RentalFeesDTOToJSON,
  TransactionFeesDTOFromJSON,
  TransactionFeesDTOToJSON,
} from '../models/index';

/**
 *
 */
export class NetworkRoutesApi extends runtime.BaseAPI {
  /**
   * Returns the content from a catapult-server network configuration file (resources/config-network.properties). To enable this feature, the REST setting \"network.propertiesFilePath\" must define where the file is located. This is adjustable via the configuration file (rest/resources/rest.json) per REST instance.
   * Get the network properties
   */
  async getNetworkPropertiesRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<NetworkConfigurationDTO>> {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/network/properties`,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => NetworkConfigurationDTOFromJSON(jsonValue));
  }

  /**
   * Returns the content from a catapult-server network configuration file (resources/config-network.properties). To enable this feature, the REST setting \"network.propertiesFilePath\" must define where the file is located. This is adjustable via the configuration file (rest/resources/rest.json) per REST instance.
   * Get the network properties
   */
  async getNetworkProperties(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<NetworkConfigurationDTO> {
    const response = await this.getNetworkPropertiesRaw(initOverrides);
    return await response.value();
  }

  /**
   * Returns the current network type.
   * Get the current network type of the chain
   */
  async getNetworkTypeRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<NetworkTypeDTO>> {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/network`,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => NetworkTypeDTOFromJSON(jsonValue));
  }

  /**
   * Returns the current network type.
   * Get the current network type of the chain
   */
  async getNetworkType(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<NetworkTypeDTO> {
    const response = await this.getNetworkTypeRaw(initOverrides);
    return await response.value();
  }

  /**
   * Returns the estimated effective rental fees for namespaces and mosaics. This endpoint is only available if the REST instance has access to catapult-server ``resources/config-network.properties`` file. To activate this feature, add the setting \"network.propertiesFilePath\" in the configuration file (rest/resources/rest.json).
   * Get rental fees information
   */
  async getRentalFeesRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<RentalFeesDTO>> {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/network/fees/rental`,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => RentalFeesDTOFromJSON(jsonValue));
  }

  /**
   * Returns the estimated effective rental fees for namespaces and mosaics. This endpoint is only available if the REST instance has access to catapult-server ``resources/config-network.properties`` file. To activate this feature, add the setting \"network.propertiesFilePath\" in the configuration file (rest/resources/rest.json).
   * Get rental fees information
   */
  async getRentalFees(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RentalFeesDTO> {
    const response = await this.getRentalFeesRaw(initOverrides);
    return await response.value();
  }

  /**
   * Returns the average, median, highest and lower fee multiplier over the last \"numBlocksTransactionFeeStats\". The setting \"numBlocksTransactionFeeStats\" is adjustable via the configuration file (rest/resources/rest.json) per REST instance.
   * Get transaction fees information
   */
  async getTransactionFeesRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<TransactionFeesDTO>> {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/network/fees/transaction`,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => TransactionFeesDTOFromJSON(jsonValue));
  }

  /**
   * Returns the average, median, highest and lower fee multiplier over the last \"numBlocksTransactionFeeStats\". The setting \"numBlocksTransactionFeeStats\" is adjustable via the configuration file (rest/resources/rest.json) per REST instance.
   * Get transaction fees information
   */
  async getTransactionFees(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TransactionFeesDTO> {
    const response = await this.getTransactionFeesRaw(initOverrides);
    return await response.value();
  }
}
