import { ActionTree } from 'vuex';
import { PlacesStateInterface } from './state';
import { StateInterface } from '../index';


const actions: ActionTree<PlacesStateInterface, StateInterface> = {
  getInitialLocation( { commit } ) {
    navigator.geolocation.getCurrentPosition(
      (position) => commit('setUserLocation', position.coords),
      (error) => {
        console.error(error);
        throw new Error('geolocation not available');
      }
    )
  }
}



export default actions;
