import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@tmp/history';

const Router = DefaultRouter;

const routes = [
  {
    path: '/',
    component: require('../../layouts/index.js').default,
    routes: [
      {
        path: '/404',
        exact: true,
        component: require('../404/index.js').default,
      },
      {
        path: '/',
        exact: true,
        component: require('../index.js').default,
      },
      {
        path: '/user',
        exact: false,
        component: require('../user/_layout.js').default,
        routes: [
          {
            path: '/user/a',
            exact: true,
            component: require('../user/a.js').default,
          },
          {
            path: '/user/b',
            exact: true,
            component: require('../user/b.js').default,
          },
          {
            path: '/user',
            exact: true,
            component: require('../user/index.js').default,
          },
          {
            path: '/user/:id',
            exact: true,
            component: require('../user/$id.js').default,
          },
          {
            component: () =>
              React.createElement(
                require('C:/Users/Administrator/AppData/Roaming/npm/node_modules/umi/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'pages', hasRoutesInConfig: false },
              ),
          },
        ],
      },
      {
        component: () =>
          React.createElement(
            require('C:/Users/Administrator/AppData/Roaming/npm/node_modules/umi/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'pages', hasRoutesInConfig: false },
          ),
      },
    ],
  },
  {
    component: () =>
      React.createElement(
        require('C:/Users/Administrator/AppData/Roaming/npm/node_modules/umi/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'pages', hasRoutesInConfig: false },
      ),
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen = () => {};

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    routeChangeHandler(history.location);
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return <Router history={history}>{renderRoutes(routes, props)}</Router>;
  }
}
