import { MutationTree } from 'vuex';
import { PlacesStateInterface } from './state';


const mutation: MutationTree<PlacesStateInterface> = {
  setUserLocation( state: PlacesStateInterface, { lng, lat }: { lng: number, lat: number } ) {
    state.userLocation = [lng, lat];
    state.isLoading = false;
  }
}


export default mutation;
