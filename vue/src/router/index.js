import Vue from 'vue';
import Router from 'vue-router';

import Root from '@/pages/Root';
import About from '@/pages/About';
import Member from '@/pages/Member';
import Paper from '@/pages/Paper';
import Project from '@/pages/Project';

import NotFound from '@/pages/NotFound';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '404',
    },
    {
      path: '/404',
      name: 'NotFound',
      component: NotFound,
    },
    {
      path: '/v2',
      component: Root,
      children: [
        {
          path: '',
          redirect: 'about',
        },
        {
          path: 'about',
          name: 'About',
          component: About,
        },
        {
          path: 'members',
          name: 'Member',
          component: Member,
        },
        {
          path: 'papers',
          name: 'Paper',
          component: Paper,
        },
        {
          path: 'projects',
          name: 'Project',
          component: Project,
        },
      ],
    },
  ],
});
