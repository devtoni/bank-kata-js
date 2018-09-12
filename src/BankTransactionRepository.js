import Transaction from "./Transaction";
import ITransactionRepository from "./TransactionRepository";

export default class BankTransactionRepository extends ITransactionRepository {
  constructor({ transaction, clock }) {
    super()
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
