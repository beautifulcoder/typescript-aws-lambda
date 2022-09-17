declare module 'claudia-api-builder' {
  export class ApiResponse{
    constructor(response: any, headers: any, code: number)
  }

  export default class ApiBuilder {
    get(route: string, handler: Function, options: any = {}): void
    post(route: string, handler: Function, options: any = {}): void
    put(route: string, handler: Function, options: any = {}): void
    delete(route: string, handler: Function, options: any = {}): void
    head(route: string, handler: Function, options: any = {}): void
    patch(route: string, handler: Function, options: any = {}): void
    registerAuthorizer(name: string, config: any): void
    apiConfig(): any
  }
}
