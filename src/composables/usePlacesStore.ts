import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { StateInterface } from "@/store";

export const usePlacesStore = () => {
  const store = useStore<StateInterface>();

  onMounted(() => {
    if (!store.getters['places/isUserLocated']) {
      store.dispatch('places/getInitialLocation');
    }
  });

  return {
    isLoading: computed(() => store.state.places.isLoading),
    userLocation: computed(() => store.state.places.userLocation),
    isUserLocated: computed<boolean>(() => store.getters['places/isUserLocated']),
    isLoadingPlaces: computed(() => store.state.places.isLoadingPlaces),
    places: computed(() => store.state.places.places),
    searchPlaceByTerm: ( term = '' ) => store.dispatch('places/searchPlaceByTerm', term)
  }
}