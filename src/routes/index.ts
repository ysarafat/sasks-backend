import { Router } from 'express';
import { MembersRoutes } from '../modules/members/members.routes';
import { UserRoutes } from '../modules/users/user.routes';
const router = Router();
const appRoutes = [
  {
    path: '/members',
    route: MembersRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
];

appRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
