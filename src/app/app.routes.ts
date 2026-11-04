import { Routes } from '@angular/router';
import { RouteMarkerComponent } from './route-marker.component';
export const routes: Routes = [
 {path:'',component:RouteMarkerComponent},{path:'login',component:RouteMarkerComponent},{path:'registro',component:RouteMarkerComponent},
 {path:'productos',component:RouteMarkerComponent},{path:'producto/:id',component:RouteMarkerComponent},{path:'carrito',component:RouteMarkerComponent},
 {path:'libreria',component:RouteMarkerComponent},{path:'admin',component:RouteMarkerComponent},{path:'admin/productos',component:RouteMarkerComponent},
 {path:'admin/almacen',component:RouteMarkerComponent},{path:'admin/categorias',component:RouteMarkerComponent},{path:'admin/compras',component:RouteMarkerComponent},{path:'admin/ventas',component:RouteMarkerComponent},{path:'**',component:RouteMarkerComponent}
];
