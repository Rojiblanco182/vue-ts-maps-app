import { onMounted } from "vue";
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

  }
}