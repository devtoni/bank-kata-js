import { expect } from 'chai'
import sinon from 'sinon'
import Repository from '../src/BankTransactionRepository'
import Transaction from '../src/Transaction'
import Clock from '../src/Clock'

describe('RepositorySpec', () => {
  let stubClock
  let repository
  beforeEach(() => {
    stubClock = sinon.stub(Clock.prototype, 'getCurrentDate')
    stubClock.onCall(0).returns('09/09/2018')
    stubClock.onCall(1).returns('10/09/2018')
    stubClock.onCall(2).returns('12/09/2018')
    repository = new Repository({
      transaction: transactionFactory,
      clock: new Clock()
    })
  })

  afterEach(() => {
    stubClock.restore()
    repository = null
  })

  it('should store and add the amount sent to the deposit', () => {
    repository.add(100)
    const transactions = repository.getAllTransactions()
    expect(transactions[0].toJSON()).to.deep.equal({
      date: '09/09/2018',
      amount: 100
    })
  })

  it('should store and withdraw the amount sent to the deposit', () => {
    repository.withdraw(100)
    const transactions = repository.getAllTransactions()
    expect(transactions[0].toJSON()).to.deep.equal({
      date: '09/09/2018',
      amount: -100
    })
  })

  it('should return all the transactions', () => {
    repository.add(100)
    repository.withdraw(200)
    repository.add(1000)

    const transactions = repository.getAllTransactions()
    expect(transactions[0].toJSON()).to.deep.equal({
      date: '09/09/2018',
      amount: 100
    })
    expect(transactions[1].toJSON()).to.deep.equal({
      date: '10/09/2018',
      amount: -200
    })
    expect(transactions[2].toJSON()).to.deep.equal({
      date: '12/09/2018',
      amount: 1000
    })
  })
})

const transactionFactory = transactionData => new Transaction(transactionData)
