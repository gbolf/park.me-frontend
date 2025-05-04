import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Router } from './components/Router';
import { ThemeProvider } from '@mui/material';
import { snacbars, theme } from './theme';
import { AuthProvider } from './contexts/auth';

import 'yet-another-react-lightbox/styles.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { SnackbarProvider } from 'notistack';
import { MapProvider } from '@contexts/map';
import axios from 'axios';
import { API_ENDPOINT } from '@common/constants';

const queryClient = new QueryClient({});

axios.defaults.baseURL = API_ENDPOINT;
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

createRoot(document.getElementById('root')).render(
  <SnackbarProvider maxSnack={5} autoHideDuration={5000} variant="success" anchorOrigin={{ vertical: 'top', horizontal: 'right' }} Components={snacbars}>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MapProvider>
          <ThemeProvider theme={theme}>
            <Router />
          </ThemeProvider>
        </MapProvider>
      </AuthProvider>
    </QueryClientProvider>
  </SnackbarProvider>
);
