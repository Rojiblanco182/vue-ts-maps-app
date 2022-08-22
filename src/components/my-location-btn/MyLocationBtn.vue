<template>
  <button v-if="isButtonReady"
    class="btn btn-primary"
    @click="onMyLocationClicked"
  >
    Go to my location
  </button>
</template>

<script lang="ts">
import { useMapStore, usePlacesStore } from '@/composables'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'MyLocationBtn',
  setup() {
    const { isUserLocated, userLocation } = usePlacesStore();
    const { map, isMapReady } = useMapStore();

    return {
      isButtonReady: computed<boolean>(() => isUserLocated.value && isMapReady.value ),
      onMyLocationClicked: () => {
        map.value?.flyTo({
          center: userLocation.value,
          zoom: 14,
        })
      }
    }
  },
})
</script>


<style scoped>
  button {
    position: fixed;
    top: 30px;
    right: 30px;
  }
</style>