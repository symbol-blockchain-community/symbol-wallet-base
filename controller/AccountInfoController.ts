import { InvalidValueError } from '@/models/ErrorModels';
import { Mosaic } from '@/models/MosaicModel';
import { NetworkType } from '@/models/NetworkModels';
import { AddressService } from '@/services/AddressService';
import {
  AccountRoutesApi,
  Configuration,
  MosaicRoutesApi,
  MultisigDTO,
  MultisigRoutesApi,
  NamespaceRoutesApi,
  NetworkRoutesApi,
} from '@/services/NodeClientService';
import { toAbsoluteAmount } from '@/util/symbol/amount';
import { splitCurrency } from '@/util/symbol/mosaic';
import { getNetworkTypeToAddressChatAt0 as getNetworkTypeToAddressCharAt0 } from '@/util/symbol/network';

export class AccountInfoController {
  private accountRoutes: AccountRoutesApi;
  private mosaicRoutes: MosaicRoutesApi;
  private namespaceRoutes: NamespaceRoutesApi;
  private multisigRoutes: MultisigRoutesApi;
  private networkRoutes: NetworkRoutesApi;
  private address: string;

  public constructor(node: string, address: string) {
    // 引数の整形
    console.debug(`AccountInfoController: node ${node}, address ${address}`);
    this.address = AddressService.createFromRawAddress(address).plain();
    const basePath = new URL(node).origin;
    // 各サービスの有効化
    const config = new Configuration({ basePath });
    this.accountRoutes = new AccountRoutesApi(config);
    this.mosaicRoutes = new MosaicRoutesApi(config);
    this.namespaceRoutes = new NamespaceRoutesApi(config);
    this.multisigRoutes = new MultisigRoutesApi(config);
    this.networkRoutes = new NetworkRoutesApi(config);
  }

  /**
   * 入力されたアドレスとノードを比較し、ネットワークタイプが相違ないか確認後にインスタンスを作成します。
   */
  private async testNetworkType(): Promise<NetworkType> {
    const addressNetworkType: NetworkType = getNetworkTypeToAddressCharAt0(this.address);
    const nodeNetworkType = await this.networkRoutes.getNetworkType();
    if (addressNetworkType === nodeNetworkType.name) {
      return addressNetworkType;
    } else {
      throw new InvalidValueError('Network type mismatch');
    }
  }

  /**
   * アカウントの情報を取得する。アドレスは Base32 へ、 Mosaic は名前解決と絶対値への変換を行う
   */
  public async getAccountInfo() {
    const networkType = await this.testNetworkType();
    const accountInfoRow = await this.accountRoutes.getAccountInfo({ accountId: this.address });
    const mosaicIds: string[] = await Promise.all(accountInfoRow.account.mosaics.map((m) => m.id));
    // divisivility と、 namespace 情報を取得する
    const [mosaicsInfoDTO, namespaceInfoDTO] = await Promise.all([
      this.mosaicRoutes.getMosaics({ mosaicIds: { mosaicIds } }),
      this.namespaceRoutes.getMosaicsNames({ mosaicIds: { mosaicIds } }),
    ]);
    // Mosaic の名前とAmountを解決する
    const resolvedMosaics: Mosaic[] = await Promise.all(
      accountInfoRow.account.mosaics.map((m) => {
        const mosaicInfoDTO = mosaicsInfoDTO.find((e) => e.mosaic.id === m.id);
        const mosaicNamesDTO = namespaceInfoDTO.mosaicNames.find((e) => e.mosaicId === m.id);
        return {
          id: m.id,
          amount: toAbsoluteAmount(Number(m.amount || 0), mosaicInfoDTO!.mosaic.divisibility),
          divisivility: mosaicInfoDTO!.mosaic.divisibility,
          namespace: mosaicNamesDTO?.names.length === 0 ? undefined : mosaicNamesDTO?.names[0],
        };
      })
    );
    const splitedMosaics = splitCurrency(networkType, resolvedMosaics);
    return {
      accountType: accountInfoRow.account.accountType,
      address: AddressService.createFromEncoded(accountInfoRow.account.address).plain(),
      importance: Number(accountInfoRow.account.importance),
      mosaics: splitedMosaics.mosaics,
      balance: splitedMosaics.currency.amount,
      publicKey: accountInfoRow.account.publicKey,
    };
  }

  /**
   * マルチシグの情報を取得する
   */
  public async getMultisigAccountInfo(): Promise<MultisigDTO> {
    const { multisig } = await this.multisigRoutes.getAccountMultisig({ address: this.address });
    return multisig;
  }
}
