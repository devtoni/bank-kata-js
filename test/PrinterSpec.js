import {expect} from 'chai'
import sinon from 'sinon'
import Printer from '../src/Printer';

describe('PrinterSpec', () => {
  let consoleSpyed
  let printer

  beforeEach(() => {
    consoleSpyed = sinon.spy(console, 'log')
    printer = new Printer({ console })
  })

  afterEach(() => {
    consoleSpyed.restore()
  })

  it('should print the statement', () => {
    printer.printLine({ date: '23/09/2018', amount: 100, balance: 100})
    expect(consoleSpyed.calledWith('23/09/2018 | 100.00 | 100.00')).to.true
  })

  it('should print the statement in descendant order', () => {
    printer.printLine({ date: '01/09/2018', amount: 100, balance: 100})
    printer.printLine({ date: '05/09/2018', amount: -300, balance: -200})
    printer.printLine({ date: '23/09/2018', amount: 500, balance: 300})
    expect(consoleSpyed.calledWith('23/09/2018 | 500.00 | 300.00')).to.true
    expect(consoleSpyed.calledWith('05/09/2018 | -300.00 | -200.00')).to.true
    expect(consoleSpyed.calledWith('01/09/2018 | 100.00 | 100.00')).to.true
  })
})


