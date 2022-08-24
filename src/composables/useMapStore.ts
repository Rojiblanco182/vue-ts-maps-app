import { computed } from "vue";
import { useStore } from "vuex";
import Mapboxgl from "mapbox-gl";
import { StateInterface } from "@/store";
import { Feature } from "@/interfaces/places";
import { LngLat } from '../store/map/actions';

export const useMapStore = () => {
  const store = useStore<StateInterface>();

  return {
    map: computed(() => store.state.map.map),
    distance: computed(() => store.state.map.distance),
    duration: computed(() => store.state.map.duration),
    isMapReady: computed<boolean>(() => store.getters['map/isMapReady']),
    setMap: (map: Mapboxgl.Map) => store.commit('map/setMap', map),
    setMarkers: (places: Feature[]) => store.commit('map/setMarkers', places),
    getRoute: ((start: LngLat, end: LngLat) => store.dispatch('map/getRouteBetweenPoints', { start, end })),
  };
};
