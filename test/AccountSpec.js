import { expect } from "chai";
import sinon from "sinon";
import Repository from "../src/BankTransactionRepository";
import Printer from "../src/Printer";
import Account from "../src/Account";
import Transaction from "../src/Transaction";

describe("Account test", () => {
  let mockedRepository;
  let mockedPrinter;
  let account;

  beforeEach(() => {
    mockedPrinter = sinon.mock(Printer.prototype);
    mockedRepository = sinon.mock(Repository.prototype);
    account = new Account({
      printer: new Printer({ console }),
      repository: new Repository({ transaction: transactionFactory })
    });
  });

  afterEach(() => {
    mockedRepository.restore();
    mockedPrinter.restore();
  });

  it("should add a deposit amount", () => {
    mockedRepository.expects("add").withArgs(1000);
    account.deposit(1000);
    mockedRepository.verify();
  });

  it("should withdraw an amount", () => {
    mockedRepository.expects("withdraw").withArgs(100);
    account.withdraw(100);
    mockedRepository.verify();
  });

  it("should print the statement", () => {
    const transaction = new Transaction({ date: "10/04/2018", amount: 500 });
    mockedRepository.expects("getAllTransactions").returns([transaction]);


    mockedPrinter
      .expects("printLine")
      .withArgs('DATE | AMOUNT | BALANCE');
    mockedPrinter
      .expects("printLine")
      .withArgs({ date: "10/04/2018", amount: 500, balance: 500 });
    account.printStatement();
    mockedPrinter.verify();
  });

  it("should print all the transactions", () => {
    mockedRepository.expects("getAllTransactions").returns(allTransactions());
    mockedPrinter
      .expects("printLine")
      .withArgs('DATE | AMOUNT | BALANCE');
    mockedPrinter
      .expects("printLine")
      .withArgs({ date: "10/04/2018", amount: 500, balance: 1400 });
    mockedPrinter
      .expects("printLine")
      .withArgs({ date: "02/04/2018", amount: -100, balance: 900 });
    mockedPrinter
      .expects("printLine")
      .withArgs({ date: "01/04/2018", amount: 1000, balance: 1000 });
    account.printStatement();
    mockedPrinter.verify();
  });
});

const allTransactions = () => [
  new Transaction({ date: "10/04/2018", amount: 500 }),
  new Transaction({ date: "02/04/2018", amount: -100 }),
  new Transaction({ date: "01/04/2018", amount: 1000 })
];

const transactionFactory = data => new Transaction(data);
