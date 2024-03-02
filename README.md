# Symbol Wallet Base

Symbol Wallet のテンプレート。 このレポジトリをフォークして、オリジナルのウォレットを開発してください。

## What's Symbol？

Symbol は事前にブロックチェーンネイティブに実装された豊富なコントラクトを組み合わせて安全に取引を完了する事が出来る次世代のブロックチェーンです。コントラクトの利用に専門のブロックチェーンエンジニアは不要です。既存のアプリケーションへノードに実装されている REST API を経由して簡単にブロックチェーンを用いた RWA や 取引ロジックを実装する事が出来ます。また、オリジナルのトークンをコードの実装不要で発行する事も出来る利用コストの低いブロックチェーンです。

より詳細を知りたい場合は[サイト](https://symbol-community.com/)より確認してください。

## Architecture

symbol-sdk は v2 を使用していますが、 v3 へのアップグレードを用意に行えるようにするため、最小限の使用に留めています。 Symbol Node との Rest API 通信の記述は OpenAPI Genrator を利用して生成しています。

* Framework ... React Native + Expo
* UI ... NativeWind
* SDK ... symbol-sdk@2 + open api generator

## Contribution

コードへの貢献に歓迎致します。変更を加える前に[ルール](./docs/README.md)を必ず確認してください。
