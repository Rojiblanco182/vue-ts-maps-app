import { useMapStore, usePlacesStore } from '@/composables';
import { Feature } from '@/interfaces/places';
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'SearchResults',
  setup() {
    const { isLoadingPlaces, places } = usePlacesStore();
    const { map, setMarkers } = useMapStore(); 
    const activePlace = ref('');

    watch(places, (newPlaces) => {
      activePlace.value = '';
      setMarkers(newPlaces);
    });

    return {
      isLoadingPlaces,
      places,
      activePlace,

      onPlaceClicked: (place: Feature) => {
        activePlace.value = place.id;
        const [lng, lat] = place.center;
        map?.value?.flyTo({
          center: [lng, lat],
          zoom: 14,
        })
      }
    };
  },
});
