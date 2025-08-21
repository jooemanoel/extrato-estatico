export class Currency {
    private _value = 0;
    constructor(value: number) {
        this.setValue(Math.floor(value));
    }
    get value() {
        return this._value;
    }
    setValue(value: number) {
        this._value = value;
    }
    toBrl() {
        return (this.value / 100).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        })
    }
    static formatValue(value = 0) {
        return Math.floor(value * 100);
    }
}