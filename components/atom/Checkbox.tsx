import ExpoCheckbox, { CheckboxProps } from 'expo-checkbox';
import React from 'react';

interface Props extends CheckboxProps {}

export default function Checkbox({ ...props }: Props): JSX.Element {
  return <ExpoCheckbox.default {...props} />;
}
