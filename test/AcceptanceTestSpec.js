import { expect } from 'chai'
import sinon from 'sinon'
import Printer from '../src/Printer';
import Account from '../src/Account';

describe('Bank Kata Acceptance test', () => {

    it('should print the statement', () => {
        const mockedPrinter = sinon.mock(Printer)
        const account = new Account({ printer: new Printer()})

        account.deposit(1000)
        account.withdraw(100)
        account.deposit(500)

        account.printStatement()
        mockedPrinter.expects('printLine').withArgs('DATE | AMOUNT | BALANCE')
        mockedPrinter.expects('printLine').withArgs('10/04/2018 | 500.00 | 1400.00')
        mockedPrinter.expects('printLine').withArgs('02/04/2018 | -100.00 | 900.00')
        mockedPrinter.expects('printLine').withArgs('01/04/2018 | 1000.00 | 1000.00')

    })
})