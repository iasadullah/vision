export {};

declare global {
  namespace NodeJS {
    interface Global {
      authToken?: string;
    }
  }
}
