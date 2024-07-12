import * as React from 'react';
import { Text } from 'react-native';

interface Props {
  amount: number;
  className?: string;
}
/** 整数部に3桁ごとにカンマを挿入する */
const FormattedAmount = ({ amount, className }: Props): JSX.Element => {
  const formatAmount = (value: number) => {
    // 整数部と小数部に分割
    const [integerPart, fractionalPart] = String(value).split('.');

    // 整数部に3桁ごとにカンマを挿入
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // 整数部と小数部を結合
    return `${formattedIntegerPart}${fractionalPart ? `.${fractionalPart}` : ''}`;
  };

  return <Text className={className}>{formatAmount(amount)}</Text>;
};

export default FormattedAmount;
