import {expect} from 'chai'
import Printer from '../src/Printer';

describe('PrinterSpec', () => {
  it('should print the statement', () => {
    const printer = new Printer()
    printer.printLine({ date: '23/09/2018', amount: 100, balance: 100})

    expect(printer.printLine).withArgs
  })
})


