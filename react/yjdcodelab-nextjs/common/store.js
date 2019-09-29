import { observable } from 'mobx';

class Store {
  @observable user = null;
}

export default (new Store);