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
import { CircularProgress } from '@mui/material';
import { Registration } from '../views/Registration';
import { NavigationLayout } from '../layouts/NavigationLayout';
import { Parkinglist } from '../views/client/ParkingListView';
import { Profile } from '../views/Profile';
import { cookieSetup } from '@common/crud';

export const ROUTES = {
  landing: {
    path: '/',
    title: 'Početna stranica',
    Component: Landing,
    layout: null as null,
    role: [] as UserRoles[],
  },
  login: {
    path: '/login',
    title: 'Prijava',
    Component: Login,
    layout: MainLayout,
    role: [] as UserRoles[],
  },
  register: {
    path: '/register',
    title: 'Prijava',
    Component: Registration,
    layout: MainLayout,
    role: [] as UserRoles[],
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
    Component: () => <Navigate to="/login" />,
    layout: null as null,
    role: [] as UserRoles[],
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

export function Router() {
  const {
    loading,
    user: { role },
  } = useAuth();

  const routes = Object.values(ROUTES)
    .filter((value) => !value.role.length || value.role.includes(role))
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

  useEffect(() => {
    cookieSetup();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return <RouterProvider router={router} />;
}
