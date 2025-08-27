export class Data extends Date {
  constructor(data?: string | Date) {
    if (!data) {
      super();
      return;
    }
    if (data instanceof Date) {
      super(data.getTime());
      return;
    }
    const dataCut = data.replace('Z', '');
    const year = dataCut.slice(0, 4).padStart(4, '0');
    const month = dataCut.slice(5, 7).padStart(2, '0');
    const day = dataCut.slice(8, 10).padStart(2, '0');
    const hours = dataCut.slice(11, 13).padStart(2, '0');
    const minutes = dataCut.slice(14, 16).padStart(2, '0');
    const seconds = dataCut.slice(17, 19).padStart(2, '0');
    const millis = dataCut.slice(20, 23).padStart(3, '0');
    super(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${millis}`);
  }
  override toJSON() {
    return `${this.getFullYear()}-${(this.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${this.getDate()
      .toString()
      .padStart(2, '0')} ${this.getHours()
      .toString()
      .padStart(2, '0')}:${this.getMinutes()
      .toString()
      .padStart(2, '0')}:${this.getSeconds()
      .toString()
      .padStart(2, '0')}.${this.getMilliseconds().toString().padStart(3, '0')}`;
  }
}
