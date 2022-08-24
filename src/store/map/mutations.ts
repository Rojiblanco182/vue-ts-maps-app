import Mapboxgl from 'mapbox-gl';
import { MutationTree } from 'vuex';
import { Feature } from '@/interfaces/places';
import { MapStateInterface } from './state';


const mutation: MutationTree<MapStateInterface> = {
  setMap( state, map: Mapboxgl.Map ) {
    state.map = map;
  },

  setMarkers(state, places: Feature[]) {
    state.markers = resetMarkers(state);

    if (!state.map) {
      return;
    }

    for (const place of places) {
      const [lng, lat] = place.center;

      const popUp = new Mapboxgl.Popup()
        .setLngLat([lng, lat])
        .setHTML(`
        <h4>${place.text}</h4>
        <p>${place.place_name}</p>
        `);

      const placeMarker = new Mapboxgl.Marker()
        .setLngLat([lng, lat])
        .setPopup(popUp)
        .addTo(state.map);
      
      state.markers.push(placeMarker);
    }
  }
}

const resetMarkers = (state: MapStateInterface) => {
  state.markers.forEach(marker => marker.remove());
  state.markers = [];
  return state.markers;
}


export default mutation;
