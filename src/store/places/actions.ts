import { ActionTree } from 'vuex';
import { PlacesStateInterface } from './state';
import { StateInterface } from '../index';


const actions: ActionTree<PlacesStateInterface, StateInterface> = {
  getInitialLocation( { commit } ) {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => commit('setUserLocation', { lng: coords.longitude, lat: coords.latitude }),
      (error) => {
        console.error(error);
        throw new Error('geolocation not available');
      }
    )
  }
}



export default actions;
