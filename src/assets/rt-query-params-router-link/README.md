## RT QUERY PARAMS ROUTER LINK v1.0.0

![](/projects/rt-query-params-router-link/rt-query-params-router-link.gif)

- rtQueryParamsRouterLink - base path
- classActiveLink - class for active link

## Install
```bash
npm i rt-query-params-router-link
```

```bash
yarn add rt-query-params-router-link
```


## Usages

```ts
@NgModule({
...
  imports: [
  ...
    RtQueryParamsRouterLinkModule,
    RtPlatformModule.forRoot({
      localBaseUrl: 'some_local_url',
      serverBaseUrl: 'some_server_url',
    }),
  ],
})
export class AnyModule {
}
```


```html

<nav>
    <div
            class="rt-query-params-router-link__link"
            classActiveLink="rt-query-params-router-link__link_active"
            rtQueryParamsRouterLink
            [linkQueryParams]="{param: 'param-1'}">
        /components/rt-query-params-router-link?param=param-1
    </div>

    <div
            class="rt-query-params-router-link__link"
            classActiveLink="rt-query-params-router-link__link_active"
            rtQueryParamsRouterLink
            [linkQueryParams]="{param: 'param-2'}">
        /components/rt-query-params-router-link?param=param-2
    </div>

    <div
            class="rt-query-params-router-link__link"
            classActiveLink="rt-query-params-router-link__link_active"
            rtQueryParamsRouterLink
            [linkQueryParams]="{param: 'param-3'}">
        /components/rt-query-params-router-link?param=param-3
    </div>
</nav>
```
