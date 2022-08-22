import { createStore } from 'vuex';

// My custom modules
import placesModule from './places';
import { PlacesStateInterface } from './places/state';
import mapModule from './map';
import { MapStateInterface } from './map/state';


export interface StateInterface {
  // Define your own store structure, using submodules if needed
  // example: ExampleStateInterface;
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
  places: PlacesStateInterface,
  map: MapStateInterface,
}

export default createStore<StateInterface>({
  modules: {
    places: placesModule,
    map: mapModule,
  }
})
