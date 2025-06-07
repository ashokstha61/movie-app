/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_OMDB_API_KEY: string;
    // Add more custom env variables here if needed
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  