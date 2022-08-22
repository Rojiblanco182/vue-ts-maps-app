import { computed, defineComponent, ref } from 'vue';
import SearchResults from '@/components/search-results/SearchResults.vue';

export default defineComponent({
  name: 'SearchBar',
  components: { SearchResults },
  setup() {
    const debounceTimeout = ref();
    const debouncedValue = ref('');

    return {
      debouncedValue,
      searchTerm: computed({
        get() {
          return debouncedValue.value;
        },
        set(value: string) {
          if (debounceTimeout.value) {
            clearTimeout(debounceTimeout.value);
          }
          debounceTimeout.value = setTimeout(() => {
            debouncedValue.value = value;
          }, 2000);
        }
      })
    };
  },
});
