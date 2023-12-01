import { Router } from 'express';
import { MembersRoutes } from '../modules/members/members.routes';
const router = Router();
const appRoutes = [
  {
    path: '/members',
    route: MembersRoutes,
  },
];

appRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
