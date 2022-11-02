import { Server, ServerRoute } from '@hapi/hapi';

import resourceRoutes from './resource/routes';

const routes = [...resourceRoutes] as ServerRoute[];

const registerRoutes = (server: Server) => {
  routes.forEach((route) => {
    server.route(route);
  });
};

export { registerRoutes };
