/** 外部との通信に失敗した場合のエラー */
export class ConnectionError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'ConnectionError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/** AsyncStorage の読み取りに失敗した場合のエラー */
export class StorageError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'StorageError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/** 入力された値が不適切な場合のエラー */
export class InvalidValueError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'InvalidValueError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/** 実行する権限が不足している際のエラー */
export class PermissionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PermissionError';
  }
}

/** 予期せぬエラー: 実装者の誤りや致命的な問題が想定される場合 */
export class UnexpectedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnexpectedError';
  }
}
