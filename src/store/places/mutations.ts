import { MutationTree } from 'vuex';
import { PlacesStateInterface } from './state';


const mutation: MutationTree<PlacesStateInterface> = {
  setUserLocation( state: PlacesStateInterface, location ) {
    state.userLocation = location;
    state.isLoading = false;
  }
}


export default mutation;
