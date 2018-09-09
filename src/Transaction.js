export default class Transaction {
  constructor({ date, amount }) {
    this._date = date;
    this._amount = amount;
  }

  toJSON() {
    return {
      date: this._date,
      amount: this._amount
    };
  }
}
