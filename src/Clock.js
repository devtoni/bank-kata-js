export default class Clock {
  getCurrentDate() {
    return new Date()
      .toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
      .split('-')
      .reverse()
      .join('/')
  }
}
