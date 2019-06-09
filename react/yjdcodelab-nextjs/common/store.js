import { observable } from 'mobx';

class Store {
  @observable mode = 'development';
}

export default (new Store);