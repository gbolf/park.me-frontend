interface ImportMetaEnv {
  readonly VITE_MAPBOX_API_KEY: string;
  readonly VITE_MAPBOX_STYLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
