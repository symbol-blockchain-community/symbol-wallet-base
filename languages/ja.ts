// TODO: 以下の言語は適当にそれっぽいのを追加しただけなので遠慮なく修正してください
const ja = {
  common: {
    OK: 'OK',
    cancel: 'キャンセル',
    close: '閉じる',
    save: '保存',
    delete: '削除',
    add: '追加',
    edit: '編集',
    publicKey: '公開鍵',
    privateKey: '秘密鍵',
    address: 'アドレス',
    balance: '残高',
    importance: '重要度',
    next: '次へ',
    copied: 'コピーしました',
  },
  pages: {
    login: {
      index: {
        remark: 'アプリを利用する場合、規約に同意頂いたものと致します',
        terms: '規約',
        new: '新たにウォレットを作成',
        import: 'リカバリーフレーズの読み込み',
        language: 'English',
      },
      new: {
        precautions: '安全に利用する為に全て確認し、チェックをつけてください',
        precautions1_title: 'リカバリーフレーズを共有しない',
        precautions1_content:
          'アカウントの作成が完了するとリカバリーフレーズや秘密鍵が発行されます。' +
          'これはあなたの資産への完全なアクセス権限を持つ情報です。如何なる場合も、この情報は第三者に共有してはなりません。',
        precautions2_title: 'リカバリーフレーズは復元できない',
        precautions2_content:
          'リカバリーフレーズは現在あなたが利用しているウォレットの開発者やブロックチェーンの開発者でも復元することはできません。' +
          '自己責任の元、必ず安全な場所にバックアップを取り保管して下さい。',
        submit: 'リカバリーフレーズを作成する',
        checking: '全て確認して下さい',
      },
      import: {
        title: 'リカバリーフレーズを入力してください',
      },
      imported: {
        title: '読み込むアカウントを選択してください',
      },
      generated: {
        title: 'リカバリーフレーズを作成しました。必ず安全な場所に保管し、誰にも共有しないで下さい。',
        input_label: 'リカバリーフレーズ',
        save: '保存する',
      },
      complete: {
        finished: '準備を完了しました！',
      },
    },
    camera: {
      startCamera: 'カメラを起動',
      scanResult: '読み取り結果',
    },
    setting: {
      network: {
        testnet: 'テストネット',
        mainnet: 'メインネット',
      },
    },
  },
  molecules: {
    QrCodeReader: {
      enableCamera: 'カメラを有効化',
      cameraDisabled: 'カメラが無効になっています。設定画面よりカメラの使用を許可して下さい。',
      openSettings: '設定を開く',
    },
  },
};

export default ja;
