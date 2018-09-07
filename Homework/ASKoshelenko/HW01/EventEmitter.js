// Написать свой ивент эмиттер, который будет при запуске тестов, тоесть будет при ране команды тест эмитить нынишнее
// состояние теста, т.е. раннинг, рераннинг и т.д. имя его , а также при том что тест заканчивается возвращает стейт
// по рендому либо фейлед либо  пассед
const { EventEmitter } = require('events');
const LISTEN = 'listen';

class Test extends EventEmitter{
  constructor(name) {
    super();
    this.name = name;
    if (!this.status) this.status = 'Not running';
    this.state = Math.random() < 0.5 ? 'Failed' : 'Passed';

    this.on(LISTEN, () => {
      console.log(`Test "${this.name}" is ${this.status}`);
      console.log(this.state);
    });
  };
  test() {
    this.status = (this.status == 'Not running') ? 'Running' : 'Rerunning';
    this.emit(LISTEN);
  };
};

const unit = new Test("unit");
unit.test();
unit.test();