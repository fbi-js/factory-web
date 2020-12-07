/// <reference types="node" />
/// <reference types="vue" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly PUBLIC_URL: string;
  }
}

declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module '*.js'
