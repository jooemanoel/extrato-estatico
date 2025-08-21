export class Timestamp {
  private _value = '';
  private _time = 0;
  constructor(value = '') {
    this._value = value.slice(0, 23);
    this._time = new Date(value).getTime();
  }
  getTime() {
    return this._time;
  }
  toDate() {
    return new Date(this._time);
  }
  toDateString() {
    const [ano, mes, dia] = this._value.slice(0, 10).split('-');
    return `${ano}-${mes}-${dia}`;
  }
  toBrazilianDateString() {
    const [ano, mes, dia] = this._value.slice(0, 10).split('-');
    return `${dia}/${mes}/${ano}`;
  }
  static fromDate(date: Date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return new Timestamp(`${year}-${month}-${day} 00:00:00.000`);
  }
}
