/// <reference types="vite/client" />
declare module '*.vue' {
  import { Component } from 'vue';
  const comp: Component;
  export default comp;
}
