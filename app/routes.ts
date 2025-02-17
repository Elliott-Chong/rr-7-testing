import { type RouteConfig } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";

export default flatRoutes() satisfies RouteConfig;

/*
 * import {
 *     type RouteConfig,
 *     route,
 *     index,
 *     layout,
 *     prefix,
 * } from "@react-router/dev/routes";
 */

/*
 * export default [
 *     index('routes/_index.tsx'),
 *     // route("about", "./about.tsx"),
 */

/*
 *     route('/login/*', 'routes/login-page.tsx'),
 *     route('/register/*', 'routes/register-page.tsx'),
 */

/*
 *     // Wrap the tasks route in a layout that handles the modal state
 *     // layout('layouts/tasks-layout.tsx', [
 *     // ]),
 *     route('/tasks/:id', 'routes/user-tasks-page.tsx', [
 *         route('add', 'routes/add-task-modal.tsx'),
 *     ]),
 */

/*
 *     // layout("./auth/layout.tsx", [
 *     //     route("login", "./auth/login.tsx"),
 *     //     route("register", "./auth/register.tsx"),
 *     // ]),
 */

/*
 *     // ...prefix("concerts", [
 *     //     index("./concerts/home.tsx"),
 *     //     route(":city", "./concerts/city.tsx"),
 *     //     route("trending", "./concerts/trending.tsx"),
 *     // ]),
 *     // Resource Routes
 *     route('/sync-user', 'routes/sync-user.tsx'),
 *     route('/trpc/*', 'routes/trpc-page.tsx'),
 *     route('*', 'routes/not-found.tsx')
 * ] satisfies RouteConfig;
 */
