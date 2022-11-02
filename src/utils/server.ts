import * as Hapi from '@hapi/hapi';
import { registerRoutes } from '../routes';

const initializeServer = async () => {
  const server = Hapi.server();
  registerRoutes(server);
  await server.start();
  server.log('info', 'Started hapi server');

  return server;
};

/**
 * Starts the server when running locally
 */
// if (!module.parent) {
//   (async () => {
//     const server = await initializeServer();
//     await server.start();
//     server.log('info', `Server running at: ${server.info.uri}`);
//   })();
// }

export { initializeServer };
