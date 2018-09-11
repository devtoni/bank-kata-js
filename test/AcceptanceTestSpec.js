import { expect } from "chai";
import sinon from "sinon";
import Printer from "../src/Printer";
import Account from "../src/Account";
import Repository from "../src/Repository";
import Transaction from "../src/Transaction";
import Clock from "../src/Clock";

describe("Bank Kata Acceptance test", () => {
  let consoleSpied
  beforeEach(() => {
    consoleSpied = sinon.spy(console, 'log')
  })

  afterEach(() => {
      consoleSpied.restore()
  })
  it("should print the statement as requirement demands", () => {
     
    const account = new Account({
      printer: new Printer({ console }),
      repository: new Repository({ transaction: transactionFactory, clock: new Clock() })
    });

    account.deposit(1000);
    account.withdraw(100);
    account.deposit(500);
    account.deposit(200);

    account.printStatement();
    expect(consoleSpied.calledWith("DATE | AMOUNT | BALANCE")).to.true
    expect(consoleSpied.calledWith("24/04/2019 | 200.00 | 2100.00")).to.true
    expect(consoleSpied.calledWith("21/04/2019 | 1000.00 | 1900.00")).to.true
    expect(consoleSpied.calledWith("19/04/2018 | -100.00 | 900.00")).to.true
    expect(consoleSpied.calledWith("12/05/2017 | 1000.00 | 1000.00")).to.true
    
  });
});

const transactionFactory = data => new Transaction(data);