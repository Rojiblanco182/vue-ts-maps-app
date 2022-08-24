import { ActionTree } from 'vuex';
import { MapStateInterface } from './state';
import { StateInterface } from '../index';
import { directionsApi } from '@/apis';
import { DirectionsResponse } from '@/interfaces/directions';

export type LngLat = [number, number];

const actions: ActionTree<MapStateInterface, StateInterface> = {
  async getRouteBetweenPoints( { commit }, { start, end }: { start: LngLat, end:LngLat }) {
    const query = `${start.join(',')};${end.join(',')}`;
    const { data } = await directionsApi.get<DirectionsResponse>(query);

    commit('setDistanceAndDuration', {
      distance: data.routes[0].distance,
      duration: data.routes[0].duration,
    })
    
    commit('setRoutePolyline', data.routes[0].geometry.coordinates);
  }
}



export default actions;
