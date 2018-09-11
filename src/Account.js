const HEADER = "DATE | AMOUNT | BALANCE";

export default class Account {
  constructor({ printer, repository }) {
    this._printer = printer;
    this._repository = repository;
  }

  deposit(amount) {
    this._repository.add(amount);
  }

  withdraw(amount) {
    this._repository.withdraw(amount);
  }

  printStatement() {
    this._printer.printLine(HEADER)
    const transactions = this._repository.getAllTransactions();
    transactions
      .map(transactionVO => transactionVO.toJSON())
      .sort(
        (transactionA, transactionB) => transactionA.date > transactionB.date
      )
      .reduce((transactions, transaction, index) => {
        index === 0
          ? transactions.push({ ...transaction, balance: transaction.amount })
          : transactions.push({
              ...transaction,
              balance: transactions[index - 1].balance + transaction.amount
            });
        return transactions;
      }, [])
      .sort(
        (transactionA, transactionB) => transactionA.date < transactionB.date
      )
      .forEach(transaction => {
        this._printer.printLine(transaction);
      });
  }
}
