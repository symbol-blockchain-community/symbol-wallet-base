export class ConnectionError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'ConnectionError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class StorageError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'StorageError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class InvalidValueError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'InvalidValueError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
