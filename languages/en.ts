import type ja from './ja';

const en: typeof ja = {
  common: {
    OK: 'OK',
    cancel: 'Cancel',
    close: 'Close',
    save: 'Save',
    delete: 'Delete',
    add: 'Add',
    edit: 'Edit',
    publicKey: 'Public Key',
    privateKey: 'Private Key',
    address: 'Address',
    balance: 'Balance',
    importance: 'Importance',
  },
  pages: {
    // TODO: ある程度できてきたら英語翻訳対応
    setting: {
      network: {
        testnet: 'Testnet',
        mainnet: 'Mainnet',
      },
    },
  },
};

export default en;
