import Mapboxgl from 'mapbox-gl';
import { MutationTree } from 'vuex';
import { Feature } from '@/interfaces/places';
import { MapStateInterface } from './state';


const mutation: MutationTree<MapStateInterface> = {
  setMap( state, map: Mapboxgl.Map ) {
    state.map = map;
  },

  setDistanceAndDuration(state, {distance, duration}: {distance: number, duration: number}) {
    let kms = distance / 1000;
    kms = Math.round(kms * 100);
    kms /= 100;
    
    state.distance = kms;
    state.duration = Math.floor(duration / 60);
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
    state = clearRoute(state);
  },

  setRoutePolyline(state, coords: number[][]) {
    const start = coords[0];
    const end = coords[coords.length - 1];

    const bounds = new Mapboxgl.LngLatBounds(
      [start[0], start[1]],
      [start[0], start[1]],
    );

    for (const coord of coords) {
      const newCoord: [number, number] = [coord[0], coord[1]];
      bounds.extend(newCoord);
    }

    state.map?.fitBounds(bounds, { padding: 200 });

    const sourceData: Mapboxgl.AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords
            }
          }
        ]
      }
    };

    state = clearRoute(state);

    state.map?.addSource('RouteString', sourceData);

    state.map?.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        "line-cap": 'round',
        "line-join": 'round'
      },
      paint: {
        "line-color": 'black',
        "line-width": 3
      }
    });
  }
}

const resetMarkers = (state: MapStateInterface) => {
  state.markers.forEach(marker => marker.remove());
  state.markers = [];
  return state.markers;
}

const clearRoute = (state: MapStateInterface) => {
  if (state.map?.getLayer('RouteString')) {
    state.map.removeLayer('RouteString');
    state.map.removeSource('RouteString');
    state.distance = undefined;
    state.duration = undefined;
  }
  return state;
};


export default mutation;
