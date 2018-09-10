import Transaction from "./Transaction";

export default class Repository {
  constructor({ transaction, clock }) {
    this._transactions = [];
    this._transaction = transaction;
    this._clock = clock;
  }
  add (amount) {
    this._transactions = [
      ...this._transactions,
      new Transaction({ date: this._clock.getCurrentDate(), amount })
    ];
  }

  withdraw(amount) {
    this._transactions = [
      ...this._transactions,
      new Transaction({ date: this._clock.getCurrentDate(), amount: -amount })
    ];
  }

  getAllTransactions() {
      return [...this._transactions]
  }
}
