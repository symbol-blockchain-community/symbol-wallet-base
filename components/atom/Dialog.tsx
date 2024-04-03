import { ReactNode } from 'react';
import { Modal, View } from 'react-native';

interface Props {
  modalVisible: boolean;
  onClose: (value: boolean) => void;
  children: ReactNode;
}

/** ユーザーに入力を求める、または詳細な情報を表示する為のアラートウィンドウ */
export default function Dialog(props: Props) {
  return (
    <Modal
      animationType='fade'
      transparent
      focusable
      visible={props.modalVisible}
      onRequestClose={() => props.onClose(false)}
    >
      <View className='flex-1 flex justify-center items-center bg-white/70 p-4'>
        <View className='bg-background rounded-lg w-full min-h-[30vh] max-h-[80vh] shadow-sm border border-input p-4'>
          {props.children}
        </View>
      </View>
    </Modal>
  );
}
