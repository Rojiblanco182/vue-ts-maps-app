import { ActionTree } from 'vuex';
import { MapStateInterface } from './state';
import { StateInterface } from '../index';


const actions: ActionTree<MapStateInterface, StateInterface> = {
  someAction( /*{ commit }, payload  */) {
    // a line to prevent linter errors
  }
}



export default actions;
