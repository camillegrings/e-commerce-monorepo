import * as trpcNext from '@trpc/server/adapters/next';
import { appRouter } from '../../../../../services/trpc-api/routers/_app';

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});