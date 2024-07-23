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
    loadMore: '更に読み込む',
    receive: '受信',
    send: '送信',
  },
  pages: {
    layout: {
      wallet: {
        title: 'ウォレット詳細',
        header_back_title: '戻る',
      },
    },
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
        is_creating: 'アドレスを生成しています。これには時間がかかる場合があります。',
        load_more: '更に表示する',
      },
      generated: {
        title: 'リカバリーフレーズを作成しました。必ず安全な場所に保管し、誰にも共有しないで下さい。',
        input_label: 'リカバリーフレーズ',
        save: '保存する',
        refresh: 'リフレッシュ',
      },
      complete: {
        finished: '準備を完了しました！',
      },
    },
    camera: {
      startCamera: 'カメラを起動',
      scanResult: '読み取り結果',
    },
    wallet: {
      layout: {
        home_tab_name: 'ホーム',
        transactions_tab_name: '履歴',
        qr_tab_name: 'QR',
      },
      tabsHome: {
        owned_mosaics: '所有モザイク',
        owned_mosaics_show_more: '更に読み込む',
      },
      index: {},
      transactions: {},
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
  organisms: {
    ReceivedTransactionHistory: {
      noTransactionHistory: 'トランザクション履歴はありません。',
    },
    SendTransactionHistory: {
      noTransactionHistory: 'トランザクション履歴はありません。',
    },
  },
  hooks: {
    useGetCurrentBalance: {
      accountNotFound: 'アカウントが見つからないか、一度も送受信されていません',
    },
  },
};

export default ja;
