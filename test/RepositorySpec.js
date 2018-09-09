import { expect } from "chai";
import sinon from "sinon";
import Repository from "../src/Repository";
import Transaction from "../src/Transaction";
import Clock from "../src/Clock";

describe.only("RepositorySpec", () => {
  it("should add the amount sent to the deposit", () => {
    const mockedClock = sinon.stub(Clock.prototype, "getCurrentDate");
    mockedClock.returns("09/09/2018");
    const repository = new Repository({
      transaction: transactionFactory,
      clock: new Clock()
    });
    repository.add(100);
    const transactions = repository.getAllTransactions();
    expect(transactions[0].toJSON()).to.deep.equal({ date: "09/09/2018", amount: 100 });
  });
});

const transactionFactory = transactionData => new Transaction(transactionData);
