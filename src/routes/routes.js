import Dashboard from "../components/admin/Dashboard";
import Profile from "../components/admin/Profile";

const routes = [
    { path: '/admin', exect: true, name: 'Admin'},
    { path: '/admin/dashboard', exect: true, name: 'Dashboard', component: Dashboard},
    { path: '/admin/profile', exect: true, name: 'Profile', component: Profile}
];

export default routes;
