import { defineComponent, ref, onMounted, watch } from 'vue';
import Mapboxgl from 'mapbox-gl';
import { usePlacesStore } from '@/composables';

export default defineComponent({
  name: 'MapView',
  setup() {
    const mapElement = ref<HTMLDivElement>();
    const { userLocation, isUserLocated } = usePlacesStore();

    const initMap = async () => {
      if (!mapElement.value || !userLocation.value) {
        return;
      }
      await Promise.resolve();

      const map = new Mapboxgl.Map({
        container: mapElement.value, // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: userLocation.value, // starting position [lng, lat]
        zoom: 9, // starting zoom
        projection: {name: 'globe'} // display the map as a 3D globe
      });

      const userLocationPopUp = new Mapboxgl.Popup()
        .setLngLat(userLocation.value)
        .setHTML(`
        <h5>You're here</h5>
        `);

      const userLocationMarker = new Mapboxgl.Marker()
        .setLngLat(userLocation.value)
        .setPopup(userLocationPopUp)
        .addTo(map);
    }

    onMounted(async () => {
      if (isUserLocated.value) {
        return await initMap();
      }
    })

    watch(isUserLocated, async (newValue) => {
      if (isUserLocated.value) {
        await initMap();
      }
    })

    return { 
      isUserLocated,
      mapElement,
      userLocation
    }
  }
})