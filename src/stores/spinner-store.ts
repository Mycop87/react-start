import { observable, action, computed } from 'mobx';

class Spinner {
  @observable spinnerQueue: number;

  constructor () {
    this.spinnerQueue = 0;
  }

  @action('addSpinner')
  add() {
    this.spinnerQueue++;
  }

  @action('finishSpinner')
  finish() {
    this.spinnerQueue--;
  }

  @computed get hasSpinner(){
    return this.spinnerQueue > 0
  }

}

const spinnerStore = new Spinner();

export default spinnerStore;
export { Spinner };
