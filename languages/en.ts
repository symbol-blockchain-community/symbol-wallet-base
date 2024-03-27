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
    camera: {
      scanResult: 'Scan Result',
      startCamera: 'Start Camera',
    },
    setting: {
      network: {
        testnet: 'Testnet',
        mainnet: 'Mainnet',
      },
    },
  },
  molecules: {
    QrCodeReader: {
      enableCamera: 'Enable Camera',
      cameraDisabled: 'The camera is disabled. Please allow the use of the camera from the settings screen.',
      openSettings: 'Open Settings',
    },
  },
};

export default en;
