import {expect} from 'chai'
import sinon from 'sinon'
import Repository from '../src/Repository';
import Printer from '../src/Printer';
import Account from '../src/Account';
import Transaction from '../src/Transaction';


describe('Account test', () => {
    let mockedRepository
    let mockedPrinter
    let account

    beforeEach(() => {
        mockedPrinter = sinon.mock(Printer.prototype)
        mockedRepository = sinon.mock(Repository.prototype)
        account = new Account({ printer: new Printer(), repository: new Repository()})
    })

    afterEach(() => {
        mockedRepository.restore()
        mockedPrinter.restore()
    })


    it('should add a deposit amount', () => {
        mockedRepository.expects('add').withArgs(1000)
        account.deposit(1000)
        mockedRepository.verify()
    })

    it('should withdraw an amount', () => {
        mockedRepository.expects('withdraw').withArgs(100)
        account.withdraw(100)
        mockedRepository.verify()
    })

    it('should print the statement', () => {
        const transaction = new Transaction({ date: '10/04/2018' , amount: 500 })
        mockedRepository.expects('getAllTransactions').returns([transaction])
        mockedPrinter.expects('printLine').withArgs('DATE | AMOUNT | BALANCE')
        mockedPrinter.expects('printLine').withArgs('10/04/2018 | 500.00 | 500.00')
        account.printStatement()
        mockedPrinter.verify()
    })

    it('should print all the transactions', () => {
        mockedRepository.expects('getAllTransactions').returns(allTransactions())
        mockedPrinter.expects('printLine').withArgs('DATE | AMOUNT | BALANCE')
        mockedPrinter.expects('printLine').withArgs('10/04/2018 | 500.00 | 1400.00')
        mockedPrinter.expects('printLine').withArgs('02/04/2018 | -100.00 | 900.00')
        mockedPrinter.expects('printLine').withArgs('01/04/2018 | 1000.00 | 1000.00')
        account.printStatement()
        mockedPrinter.verify()
    })
})

const allTransactions = () => [
    new Transaction({ date: '10/04/2018' , amount: 500 }),
    new Transaction({ date: '02/04/2018' , amount: -100 }),
    new Transaction({ date: '01/04/2018' , amount: 1000 })
]