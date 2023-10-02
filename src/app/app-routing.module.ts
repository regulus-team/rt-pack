import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [{
    path: 'components',
    loadChildren: () => import('./rt-components/rt-components.module').then(m => m.RtComponentsModule),
},
    {
        path: '',
        redirectTo: 'components',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
