import Vue from 'vue';
import Vuex from 'vuex';

import { fetchDevices, fetchBuilds, fetchMaintainers } from '../services/github';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    devices: [],
    builds: {},
    device: {},
    maintainers: [],
    deviceLoader: true,
    buildLoader: true,
    expandedBuild: null,
  },
  mutations: {
    setDevices(state, devices) {
      state.devices = devices;
    },
    setDevice(state, device) {
      state.device = device;
    },
    setMaintainers(state, maintainers) {
      state.maintainers = maintainers;
    },
    setBuilds(state, builds) {
      state.builds = builds;
    },
    updateDeviceLoader(state, status) {
      state.deviceLoader = status;
    },
    updateBuildLoader(state, status) {
      state.buildLoader = status;
    },
    setExpandedBuild(state, index) {
      state.expandedBuild = index;
    },
  },
  actions: {
    async fetchDevices({ commit }) {
      const devices = await fetchDevices();

      if (devices) {
        commit('setDevices', devices);
        commit('updateDeviceLoader', false);
      }
    },

    async fetchBuilds({ commit, state }, props) {
      commit('updateBuildLoader', true);
      commit('setBuilds', []);

      commit('setMaintainers', []);

      const data = await fetchMaintainers();

      commit('setMaintainers', data);

      console.log("BUILD FETCH " + state.device.supported_types);

      if (state.device.supported_types == undefined) {
        await fetchDevices();
      }

      const builds = {};

      if (state.device.supported_types) {

        await Promise.all(state.device.supported_types.map(async (type) => {
          builds[type] = await fetchBuilds(props.codename, type);
        }))

        commit('setBuilds', builds);
      }
      commit('updateBuildLoader', false);
    },
    filterDevice({ commit, state }, props) {

      let maintainer = {};

      for (const m of state.maintainers) {
        if(m.devices.find((device) => device.codename === props.codename)) {
          maintainer = m;
        }
      }

      state.devices
        .map(brand => brand.devices
          .filter(devices => devices.codename == props.codename)
          .map(device => commit('setDevice', {...device, maintainer})));

      console.log(state.builds);
    },
    getIndexOfExpandedBuild({ commit, state }, filename) {
      let list = [];
      if (state.device.supported_types) {
        list = Object.values(state.builds).flat()
        commit('setExpandedBuild', list.findIndex(b => b.filename === filename));
      }

    },

  },
});
