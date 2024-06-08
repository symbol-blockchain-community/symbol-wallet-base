import { NetworkState, getNetworkStateAsync } from 'expo-network';

export class DeviceHealthService {
  constructor() {}

  /**
   * デバイスの Wi-Fi または Cellular が有効な場合は true を返します。
   */
  public static async isConnectionAvailable(): Promise<boolean> {
    const networkState: NetworkState = await getNetworkStateAsync();
    const isConnected: boolean = networkState.isConnected ?? false;
    const isInternetReachable: boolean = networkState.isInternetReachable ?? false;
    return isConnected && isInternetReachable;
  }
}
