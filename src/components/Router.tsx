import React, { ReactNode, useEffect } from 'react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router';
import { Login } from '../views/Login';
import { Landing } from '../views/Landing';
import { ParkingDetailsView } from '../views/client/ParkingDetailsView';
import { MainLayout } from '../layouts/MainLayout';
import { Dashboard } from '../views/client/DashboardView';
import { DashboardRenter } from '../views/renter/Dashboard';
import { useAuth } from '@contexts/auth';
import { RenterRentPlace } from '../views/renter/RentPlace';
import { Box, CircularProgress } from '@mui/material';
import { Registration } from '../views/Registration';
import { NavigationLayout } from '../layouts/NavigationLayout';
import { Parkinglist } from '../views/client/ParkingListView';
import { Profile } from '../views/Profile';

export const ROUTES = {
  landing: {
    path: '/',
    title: 'Početna stranica',
    Component: Landing,
    layout: null as null,
    role: ['CUSTOMER', 'RENTER', null] as UserRoles[],
  },
  login: {
    path: '/login',
    title: 'Prijava',
    Component: Login,
    layout: MainLayout,
    role: [null] as UserRoles[],
  },
  register: {
    path: '/register',
    title: 'Prijava',
    Component: Registration,
    layout: MainLayout,
    role: [null] as UserRoles[],
  },
  parkingOverview: {
    path: '/parking/:parkingId',
    title: 'Pregled parkirnog mjesta',
    Component: ParkingDetailsView,
    layout: MainLayout,
    role: ['CUSTOMER', 'RENTER'] as UserRoles[],
  },
  me: {
    path: '/me',
    title: 'Uređivanje profila',
    Component: Profile,
    layout: NavigationLayout,
    role: ['CUSTOMER', 'RENTER'] as UserRoles[],
  },
  parkinglist: {
    path: '/parkings',
    title: 'Početna',
    Component: Parkinglist,
    layout: NavigationLayout,
    role: ['CUSTOMER', 'RENTER'] as UserRoles[],
  },
  dashboard: {
    path: '/dashboard',
    title: 'Početna',
    Component: Dashboard,
    layout: NavigationLayout,
    role: ['CUSTOMER'] as UserRoles[],
  },
  dashboardRenter: {
    path: '/dashboard',
    title: 'Početna',
    Component: DashboardRenter,
    layout: NavigationLayout,
    role: ['RENTER'] as UserRoles[],
  },
  rentPlace: {
    path: '/rent-place',
    title: 'Iznajmi',
    Component: RenterRentPlace,
    layout: MainLayout,
    role: ['RENTER'] as UserRoles[],
  },
  redirect: {
    path: '/*',
    title: '',
    Component: () => <Navigate to="/dashboard" />,
    layout: null as null,
    role: ['CUSTOMER', 'RENTER'] as UserRoles[],
  },
  redirectUnknown: {
    path: '/*',
    title: '',
    Component: () => <Navigate to="/" />,
    layout: null as null,
    role: [null] as UserRoles[],
  },
} as const;

export const buildLink = (path: keyof typeof ROUTES, params: Record<string, string | number> = {}) => {
  if (path in ROUTES) {
    let finalPath: string = ROUTES[path].path;
    Object.entries(params).forEach(([key, value]) => {
      finalPath = finalPath.replace(`:${key}`, '' + value);
    });

    return finalPath;
  }

  return '/';
};

function Title({ title, children }: { title: string; children: ReactNode }) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return children;
}

function Router() {
  const {
    user: { role },
  } = useAuth();

  const routes = Object.values(ROUTES)
    .filter((value) => value.role.includes(role))
    .map(({ path, layout: Layout = null, Component, title }) => ({
      path,
      Component: () => (
        <Title title={title}>
          {Layout ? (
            <Layout>
              <Component />
            </Layout>
          ) : (
            <Component />
          )}
        </Title>
      ),
    }));

  let router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}

export function App() {
  const { loading } = useAuth();
  if (loading)
    return (
      <Box sx={{ display: 'grid', placeItems: 'center', height: '100%' }}>
        <CircularProgress size={100} />
      </Box>
    );
  return <Router />;
}
