import { ActionTree } from 'vuex';
import { PlacesStateInterface } from './state';
import { StateInterface } from '../index';
import { searchApi } from '@/apis';
import { Feature, PlacesResponse } from '@/interfaces/places';


const actions: ActionTree<PlacesStateInterface, StateInterface> = {
  getInitialLocation( { commit } ) {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => commit('setUserLocation', { lng: coords.longitude, lat: coords.latitude }),
      (error) => {
        console.error(error);
        throw new Error('geolocation not available');
      }
    )
  },

  async searchPlaceByTerm({ commit, state }, query: string): Promise<Feature[]> {
    if (query.length === 0) {
      commit('setPlaces', []);
      return [];
    }

    if (!state.userLocation) {
      throw new Error('user location missing');
    }

    commit('setIsLoadingPlaces');
    
    const response = await searchApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: state.userLocation?.join(','),
      }
    })

    commit('setPlaces', response.data?.features);
    return response.data?.features;
  }
}



export default actions;
