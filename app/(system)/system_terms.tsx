import { View, ScrollView } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useI18n } from '@/hooks/useI18n.js';

const TERMS_JA: string = `
# 利用規約

## 1. 適用範囲

本利用規約は、株式会社〇〇〇〇（以下「当社」といいます。）が提供する「〇〇〇〇 Native App Wallet」（以下「本サービス」といいます。）の利用に関し、当社と利用者（以下「ユーザー」といいます。）との間の権利義務関係を定めるものです。

## 2. サービス内容

本サービスは、ユーザーがブロックチェーン上の資産を管理するためのネイティブアプリウォレットです。

## 3. 利用許諾

当社は、ユーザーに対し、本利用規約に基づき、本サービスの利用許諾を行います。

## 4. 利用料金

本サービスの利用は無料です。ただし、通信料などユーザーが負担する費用が発生する場合があります。

## 5. ユーザーの義務

ユーザーは、以下の事項を遵守するものとします。

- 本サービスを適正に利用すること。
- 法令や公序良俗に反する行為をしないこと。
- 第三者の権利を侵害する行為をしないこと。
- 当社または第三者に損害を与える行為をしないこと。
- その他、当社が定める利用上のルールを遵守すること。

## 6. 禁止事項

ユーザーは、以下の行為をしてはいけません。

- 本サービスを営利目的で利用すること。
- 本サービスを第三者に譲渡または貸与すること。
- 本サービスを不正に利用すること。
- 本サービスの機能を改変または逆コンパイルすること。
- 本サービスに関する情報漏洩すること。
- その他、当社が不適切と判断する行為をすること。

## 7. 免責事項

当社は、以下の事項について一切の責任を負いません。

- 本サービスの利用によりユーザーに生じた損害。
- 本サービスの中断または停止によりユーザーに生じた損害。
- 本サービスに関する情報の誤りまたは欠落によりユーザーに生じた損害。
- 第三者によるユーザーの情報の不正取得または漏洩によりユーザーに生じた損害。
- その他、本サービスの利用に関連してユーザーに生じた損害。

## 8. 著作権

本サービスに関する著作権は、当社に帰属します。

## 9. 個人情報の取扱い

当社は、ユーザーの個人情報を取り扱うにあたっては、プライバシーポリシーに従います。

## 10. 変更

当社は、必要に応じて本利用規約を変更することがあります。

## 11. 準拠法

本利用規約は、日本国の法律に準拠するものとします。

## 12. 管轄裁判所

本利用規約に関する紛争は、東京地方裁判所を第一審の専属管轄裁判所とします。

## 13. 附則

本利用規約は、2024年4月1日より施行します。

## 14. その他

本利用規約に関するお問い合わせは、メールアドレス: URL お問い合わせまでご連絡ください。

## 15. 改訂履歴

2024年4月1日：初版作成

## 16. バージョン

1.0`;

const TERMS_EN: string = `
# Terms

## 1. Scope of Application

These Terms of Use govern the rights and obligations between 〇〇〇〇株式会社 (hereinafter referred to as "the Company") and the user (hereinafter referred to as "the User") regarding the use of "〇〇〇〇 Native App Wallet" (hereinafter referred to as "the Service") provided by the Company.

## 2. Service Content

The Service is a native app wallet that allows Users to manage their blockchain assets.

## 3. Grant of License

The Company grants the User a license to use the Service in accordance with these Terms of Use.

## 4. Service Fees

The use of the Service is free of charge. However, there may be cases where the User incurs costs such as communication fees.

## 5. User's Obligations

The User shall comply with the following:

Use the Service appropriately.

- Refrain from any act that violates laws or public order and morals.
- Refrain from any act that infringes the rights of third parties.
- Refrain from any act that causes damage to the Company or third parties.
- Comply with other rules of use established by the Company.

## 6. Prohibited事項

The User shall not engage in the following acts:

Use the Service for commercial purposes.

- Transfer or lend the Service to a third party.
- Use the Service illegally.
- Modify or decompile the functions of the Service.
- Disclose information about the Service.
- Any other act that the Company deems inappropriate.

## 7. Disclaimer

The Company shall not be liable for any damages caused to the User by:

Use of the Service.

- Interruption or suspension of the Service.
- Errors or omissions in information about the Service.
- Unauthorized acquisition or leakage of User's information by a third party.
- Any other damages caused to the User in connection with the use of the Service.

## 8. Copyrights

The copyrights of the Service belong to the Company.

## 9. Handling of Personal Information

The Company will handle the User's personal information in accordance with the Privacy Policy.

## 10. Changes

The Company may change these Terms of Use as necessary.

## 11. Governing Law

These Terms of Use shall be governed by and construed in accordance with the laws of Japan.

## 12. Jurisdiction

The Tokyo District Court shall have exclusive jurisdiction over any disputes arising out of or relating to these Terms of Use.

## 13. Appendix

These Terms of Use shall come into effect on April 1, 2024.

## 14. Other

For inquiries regarding these Terms of Use, please contact us at: URL Contact.

## 15. Revision History

April 1, 2024: Initial version created

## 16. Version

1.0`;

export default function TermsPage(): JSX.Element {
  const { locale } = useI18n();

  return (
    <View className='flex-1 justify-center items-center p-4'>
      <SafeAreaView edges={['bottom']}>
        <ScrollView contentInsetAdjustmentBehavior='automatic' style={{ height: '100%' }}>
          <Markdown.default
            style={{
              heading2: {
                paddingTop: 12,
                flexDirection: 'row',
                fontSize: 24,
              },
            }}
          >
            {locale === 'ja' ? TERMS_JA : TERMS_EN}
          </Markdown.default>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
