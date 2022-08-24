import { useMapStore, usePlacesStore } from '@/composables';
import { Feature } from '@/interfaces/places';
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'SearchResults',
  setup() {
    const { isLoadingPlaces, places, userLocation } = usePlacesStore();
    const { map, setMarkers, getRoute } = useMapStore(); 
    const activePlace = ref('');

    watch(places, (newPlaces) => {
      activePlace.value = '';
      setMarkers(newPlaces);
    });

    return {
      isLoadingPlaces,
      places,
      activePlace,
      getRoute,

      onPlaceClicked: (place: Feature) => {
        activePlace.value = place.id;
        const [lng, lat] = place.center;

        map?.value?.flyTo({
          center: [lng, lat],
          zoom: 14,
        })
      },

      getDirections(place: Feature) {
        if (!userLocation.value) {
          return;
        }
        
        const [lng, lat] = place.center;
        const start: [number, number] = userLocation.value;
        const end: [number, number] = [lng, lat];

        getRoute(start, end);
      }
    };
  },
});
