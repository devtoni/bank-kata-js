import { expect } from 'chai'
import sinon from 'sinon'
import Clock from '../src/Clock'

describe.only('ClockSpec', () => {
  let fakeTimer
  beforeEach(() => {
    fakeTimer = sinon.useFakeTimers(new Date(2018, 8, 12))
  })

  afterEach(() => {
    fakeTimer.restore()
  })

  it('should return the current day with the expected format dd/MM/yyyy', () => {
    const clock = new Clock()
    const date = clock.getCurrentDate()
    expect(date).to.equal('12/09/2018')
  })
})
