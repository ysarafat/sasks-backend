import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
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
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

appRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
