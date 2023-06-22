## RT QUERY PARAMS ROUTER LINK v1.0.0

![](/projects/rt-query-params-router-link/rt-query-params-router-link.gif)

- rtQueryParamsRouterLink - base path
- classActiveLink - class for active link

```html

<nav>
    <div
            class="rt-query-params-router-link__link"
            classActiveLink="rt-query-params-router-link__link_active"
            rtQueryParamsRouterLink
            link="/components/rt-query-params-router-link"
            [linkQueryParams]="{param: 'param-1'}">
        /components/rt-query-params-router-link?param=param-1
    </div>

    <div
            class="rt-query-params-router-link__link"
            classActiveLink="rt-query-params-router-link__link_active"
            rtQueryParamsRouterLink
            link="/components/rt-query-params-router-link"
            [linkQueryParams]="{param: 'param-2'}">
        /components/rt-query-params-router-link?param=param-2
    </div>

    <div
            class="rt-query-params-router-link__link"
            classActiveLink="rt-query-params-router-link__link_active"
            rtQueryParamsRouterLink
            link="/components/rt-query-params-router-link"
            [linkQueryParams]="{param: 'param-3'}">
        /components/rt-query-params-router-link?param=param-3
    </div>
</nav>
```
