import { ParseRoute } from '@tanstack/router-core';

import { routeTree } from '@/routeTree.gen';

export type AppRoute = Exclude<
  ParseRoute<typeof routeTree>['fullPath'],
  '/auth/' | '/account/'
>;
