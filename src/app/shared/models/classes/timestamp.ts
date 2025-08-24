export class Timestamp {
  private _time = 0;
  year = '';
  month = '';
  day = '';
  hours = '';
  minutes = '';
  seconds = '';
  milliseconds = '';
  constructor(value = '') {
    if (!value) return;
    this.year = value.slice(0, 4).padStart(4, '0');
    this.month = value.slice(5, 7).padStart(2, '0');
    this.day = value.slice(8, 10).padStart(2, '0');
    this.hours = value.slice(11, 13).padStart(2, '0');
    this.minutes = value.slice(14, 16).padStart(2, '0');
    this.seconds = value.slice(17, 19).padStart(2, '0');
    this.milliseconds = value.slice(20, 23).padStart(3, '0');
    this._time = new Date(this.toString()).getTime();
  }
  getTime() {
    return this._time;
  }
  toDate() {
    if (!this._time) return null;
    return new Date(this._time);
  }
  toString() {
    return `${this.year}-${this.month}-${this.day} ${this.hours}:${this.minutes}:${this.seconds}.${this.milliseconds}`;
  }
  toDateString() {
    return `${this.year}-${this.month}-${this.day}`;
  }
  toBrazilianDateString() {
    return `${this.day}/${this.month}/${this.year}`;
  }
  static fromDate(date: Date = new Date()) {
    const year = date.getFullYear().toString().padStart(4, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const milliseconds = date.getMilliseconds().toString().padStart(3, '0');
    return new Timestamp(
      `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`
    );
  }
}
