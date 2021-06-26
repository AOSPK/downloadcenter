import Home from './views/Home.vue';
import Device from './views/Device.vue';
import Changelog from './views/Changelog.vue';
import Changes from './views/Changes.vue';

export const routes = [
  { path: '', component: Home, name: 'home' },
  { path: '/changes', component: Changes, name: 'changes' },
  {
    path: '/:codename',
    component: Device,
    name: 'device',
    children: [
      { path: ':filename?', name: 'filename' },
    ],
  },
];
