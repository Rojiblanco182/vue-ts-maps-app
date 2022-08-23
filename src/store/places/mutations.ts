import { MutationTree } from 'vuex';
import { Feature } from '@/interfaces/places';
import { PlacesStateInterface } from './state';


const mutation: MutationTree<PlacesStateInterface> = {
  setUserLocation( state: PlacesStateInterface, { lng, lat }: { lng: number, lat: number } ) {
    state.userLocation = [lng, lat];
    state.isLoading = false;
  },

  setIsLoadingPlaces(state: PlacesStateInterface) {
    state.isLoadingPlaces = true;
  },

  setPlaces(state: PlacesStateInterface, places: Feature[]) {
    state.places = places;
    state.isLoadingPlaces = false;
  }
}


export default mutation;
