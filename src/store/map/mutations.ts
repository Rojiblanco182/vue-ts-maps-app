import Mapboxgl from 'mapbox-gl';
import { MutationTree } from 'vuex';
import { MapStateInterface } from './state';


const mutation: MutationTree<MapStateInterface> = {
  setMap( state, map: Mapboxgl.Map ) {
    state.map = map;
  }
}


export default mutation;
