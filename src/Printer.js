export default class Printer {
  constructor({ console }) {
    this._console = console;
  }

  printLine(statement) {
    this._console.log(this._formatStatement(statement));
  }

  _formatStatement(statement) {
    return this._isHeader(statement)
      ? statement
      : `${statement.date} | ${statement.amount.toFixed(
          2
        )} | ${statement.balance.toFixed(2)}`;
  }

  _isHeader(statement) {
    return statement === "DATE | AMOUNT | BALANCE";
  }
}
