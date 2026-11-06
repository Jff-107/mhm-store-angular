import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiButtonComponent } from '../../atoms/ui-button/ui-button.component';
import { UiFieldComponent } from '../../atoms/ui-field/ui-field.component';
import { ProductCardComponent, UiProduct } from '../../molecules/product-card/product-card.component';

@Component({
  selector: 'app-ui-library',
  standalone: true,
  imports: [CommonModule, UiButtonComponent, UiFieldComponent, ProductCardComponent],
  template: `
    <main class="library-page">
      <header class="lib-top">
        <button class="brand" type="button" (click)="returnToStore()" aria-label="Volver al inicio de MHM Store">
          <span class="brand-mark">M</span><span><b>MHM</b><small>STORE · UI KIT</small></span>
        </button>
        <button type="button" class="back" (click)="returnToStore()">← Volver a la tienda</button>
      </header>

      <section class="cover">
        <span class="kicker">MHM STORE · APF3</span>
        <h1>Una experiencia.<br><em>Un mismo lenguaje visual.</em></h1>
        <p>Librería de interfaz para construir pantallas consistentes, reutilizables, accesibles y adaptables.</p>
        <div class="cover-meta"><span>01 / TOKENS</span><span>02 / UI KIT</span><span>03 / COMPONENTES</span><span>04 / ESTADOS</span></div>
        <span class="cover-mark" aria-hidden="true">M</span>
      </section>

      <section class="lib-section">
        <div class="section-head"><div><span class="kicker">01 · FUNDAMENTOS</span><h2>Design System · tokens</h2><p>Valores compartidos que conservan la identidad visual en las pantallas.</p></div></div>
        <h3>Colores</h3>
        <div class="swatches"><article *ngFor="let color of colors"><div [style.background]="color.hex"></div><b>{{color.name}}</b><small>{{color.hex}}</small></article></div>
        <h3>Tipografía, espaciado y forma</h3>
        <div class="token-grid">
          <article><small>DISPLAY / MANROPE</small><strong class="display">Diseña con intención.</strong><span>Manrope · títulos</span></article>
          <article><small>BODY / DM SANS</small><strong class="body-sample">Una interfaz clara y cercana.</strong><span>DM Sans · lectura y controles</span></article>
          <article><small>ESPACIADO / RADIOS</small><div class="spaces"><i></i><i></i><i></i><i></i></div><span>8 · 16 · 24 · 32 px · radios 8 / 14 px</span></article>
        </div>
      </section>

      <section class="lib-section tinted">
        <div class="section-head"><div><span class="kicker">02 · UI KIT</span><h2>Átomos y estados</h2><p>Interactúa con controles y revisa estados visuales habituales.</p></div></div>
        <div class="atom-grid">
          <article class="sample"><h3>Botones</h3><div class="button-row"><mhm-button>Primario</mhm-button><mhm-button variant="secondary">Secundario</mhm-button><mhm-button variant="ghost">Terciario</mhm-button><mhm-button variant="danger">Peligro</mhm-button><mhm-button [disabled]="true">Deshabilitado</mhm-button><mhm-button [loading]="true">Guardando</mhm-button></div><small>Hover, foco por teclado, carga y deshabilitado.</small></article>
          <article class="sample"><h3>Campos</h3><div class="field-grid"><mhm-field label="Nombre" placeholder="Ej. Jaref" hint="Campo con ayuda."></mhm-field><mhm-field label="Correo" placeholder="nombre@correo.com" type="email" [error]="'Ingresa un correo válido.'"></mhm-field><mhm-field label="Solo lectura" value="MHM Store" [readonly]="true"></mhm-field><mhm-field label="Deshabilitado" value="No disponible" [disabled]="true"></mhm-field></div></article>
          <article class="sample"><h3>Estados semánticos</h3><div class="button-row"><span class="state-badge success">Disponible</span><span class="state-badge info">Nuevo</span><span class="state-badge warning">Stock bajo</span><span class="state-badge danger">Agotado</span></div><small>Estados expresados con texto y color.</small></article>
        </div>
      </section>

      <section class="lib-section">
        <div class="section-head"><div><span class="kicker">03 · COMPONENTES REUTILIZABLES</span><h2>Composiciones de tienda</h2><p>Átomos reutilizados dentro de componentes de producto y navegación.</p></div></div>
        <div class="molecule-grid">
          <article class="sample"><h3>Buscador</h3><label class="search-demo">⌕ <input aria-label="Buscar producto de ejemplo" placeholder="Buscar una mochila..."></label><small>Campo + icono + contenedor.</small></article>
          <article class="sample"><h3>Tarjeta de producto</h3><div class="card-demo"><mhm-product-card [product]="demoProduct" (add)="message='Producto de ejemplo seleccionado'"></mhm-product-card></div><p *ngIf="message" class="sample-message" role="status">{{message}}</p></article>
        </div>
        <div class="component-list"><article *ngFor="let component of components"><span>{{component.number}}</span><div><b>{{component.name}}</b><small>{{component.description}}</small></div><span class="status">Disponible</span></article></div>
      </section>

      <section class="lib-section evolution-section">
        <div class="section-head"><div><span class="kicker">EVOLUCIÓN APF2 → APF3</span><h2>Continuidad y mejora</h2><p>APF3 conserva los flujos existentes y refuerza su consistencia y adaptación a distintos tamaños de pantalla.</p></div></div>
        <div class="evolution-grid">
          <article><span>01</span><div><b>Flujos conservados</b><p>Catálogo, carrito, acceso y módulos de productos, compras, ventas, inventario y reportes siguen disponibles.</p></div></article>
          <article><span>02</span><div><b>Interacción reforzada</b><p>Estados visibles, navegación accesible, foco de teclado y animaciones con soporte para movimiento reducido.</p></div></article>
          <article><span>03</span><div><b>Sistema documentado</b><p>Colores, tipografía, espaciado, radios y movimiento comparten tokens de diseño.</p></div></article>
        </div>
      </section>
      <footer class="lib-footer"><span>MHM STORE · APF3 · UI KIT</span><button type="button" (click)="returnToStore()">Ir a la tienda ↗</button></footer>
    </main>
  `,
  styles: [`
    .library-page{min-height:100vh;background:var(--white,#fff);color:var(--ink,#30232a)}
    .lib-top{height:76px;padding:0 7%;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--line,#f1e6ea)}
    .brand{display:inline-flex;align-items:center;gap:9px;border:0;background:none;text-align:left;color:inherit;cursor:pointer}.brand b,.brand small{display:block}.brand b{font-weight:800;letter-spacing:.08em}.brand small{font-size:9px;letter-spacing:.18em;margin-top:4px}
    .back,.lib-footer button{border:0;background:none;color:var(--wine);font:700 12px 'DM Sans',sans-serif;cursor:pointer}
    .cover{position:relative;overflow:hidden;background:linear-gradient(120deg,#28131c,#411b2b);color:#fff;padding:75px 9% 36px;min-height:370px}.cover:after{content:'';position:absolute;width:310px;height:310px;border:1px solid #ffffff1a;border-radius:50%;right:14%;top:20px;box-shadow:0 0 0 35px #ffffff08,0 0 0 70px #ffffff05}.cover>*{position:relative;z-index:1}.cover .kicker{color:#e9b5c5}.cover h1{font-size:clamp(35px,5vw,58px);line-height:1.12;margin:24px 0 14px}.cover h1 em{font-style:normal;color:#e5a4b8}.cover p{max-width:480px;color:#e2cdd4;line-height:1.8;font-size:13px}.cover-meta{display:flex;flex-wrap:wrap;gap:22px;margin-top:43px;font-size:9px;letter-spacing:.1em;color:#e8c9d3}.cover-mark{position:absolute!important;right:12%;top:100px;font-size:200px;font-weight:800;color:#ffffff08;line-height:1}
    .lib-section{padding:58px 9%}.tinted{background:#fbf6f8}.section-head{margin-bottom:28px}.section-head h2{font-size:30px;margin:10px 0}.section-head p{font-size:13px;color:var(--muted,#89747d);line-height:1.7;margin:0}.lib-section>h3{font-size:14px;margin:26px 0 14px}.swatches,.token-grid,.atom-grid,.molecule-grid,.evolution-grid{display:grid;gap:14px}.swatches{grid-template-columns:repeat(5,minmax(0,1fr))}.swatches article,.sample,.token-grid article{min-width:0;border:1px solid var(--line,#efe3e8);border-radius:var(--radius-card,14px);padding:16px;background:#fff}.swatches article div{height:66px;border-radius:var(--radius-control,8px);margin-bottom:10px}.swatches b,.swatches small{display:block}.swatches b{font-size:12px}.swatches small,.token-grid small,.token-grid span,.sample>small{font-size:10px;color:var(--muted,#947f87)}.token-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.token-grid article>small,.token-grid article>span{display:block}.display{display:block;font:700 22px Manrope,sans-serif;margin:22px 0 0}.body-sample{display:block;font:400 14px 'DM Sans',sans-serif;margin:24px 0 0}.spaces{height:32px;display:flex;align-items:end;gap:8px;margin:19px 0 8px}.spaces i{width:8px;height:8px;border-radius:2px;background:var(--wine)}.spaces i:nth-child(2){width:16px;height:16px}.spaces i:nth-child(3){width:24px;height:24px}.spaces i:nth-child(4){width:32px;height:32px}
    .atom-grid{grid-template-columns:1.1fr 1.2fr .8fr}.sample h3{font-size:13px;margin:0 0 16px}.button-row{display:flex;align-items:center;flex-wrap:wrap;gap:9px}.button-row+small{display:block;margin-top:14px}.field-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.state-badge{display:inline-flex;border-radius:30px;padding:7px 10px;font-size:10px;font-weight:700}.success{background:#e6f4eb;color:#276b43}.info{background:var(--wine-soft,#f6e6ec);color:var(--wine)}.warning{background:#fff2df;color:#9a6724}.danger{background:#fde8e9;color:#b4233f}
    .molecule-grid{grid-template-columns:1fr 1fr;margin-bottom:24px}.search-demo{height:44px;display:flex;align-items:center;gap:10px;padding:0 12px;border:1px solid var(--line);border-radius:var(--radius-control,9px);color:var(--wine)}.search-demo input{border:0;outline:0;min-width:0;width:100%;font:13px 'DM Sans',sans-serif}.card-demo{width:min(100%,300px)}.sample-message{font-size:11px;color:var(--wine);margin-top:10px}.component-list{max-width:760px;border:1px solid var(--line);border-radius:var(--radius-card,14px);overflow:hidden;background:#fff}.component-list article{display:flex;align-items:center;gap:15px;padding:15px 18px;border-bottom:1px solid #f3e9ec}.component-list article:last-child{border:0}.component-list article>span:first-child{font-size:11px;color:#a48a94}.component-list article div{flex:1;display:grid;gap:5px}.component-list b{font-size:12px}.component-list small{font-size:11px;color:var(--muted)}.status{font-size:10px;font-weight:700;color:#276b43;background:#e6f4eb;border-radius:20px;padding:6px 9px}
    .evolution-section{background:#28131c;color:#fff}.evolution-section .section-head p{color:#e2cdd4}.evolution-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.evolution-grid article{display:flex;gap:14px;padding:18px;border:1px solid #ffffff24;border-radius:var(--radius-card,14px);background:#ffffff08}.evolution-grid article>span{color:#e5a4b8;font-weight:800}.evolution-grid b{font-size:13px}.evolution-grid p{margin:8px 0 0;color:#e2cdd4;font-size:11px;line-height:1.7}.lib-footer{padding:24px 9%;display:flex;justify-content:space-between;border-top:1px solid var(--line);font-size:10px;letter-spacing:.1em;color:var(--muted)}
    @media(max-width:850px){.atom-grid{grid-template-columns:1fr 1fr}.atom-grid .sample:last-child{grid-column:1/-1}.swatches{grid-template-columns:repeat(3,minmax(0,1fr))}}
    @media(max-width:650px){.cover{padding:52px 7% 28px}.cover-mark{right:-10px;top:140px;font-size:130px}.cover-meta{gap:12px}.lib-section{padding:42px 6%}.swatches{grid-template-columns:repeat(2,minmax(0,1fr))}.token-grid,.atom-grid,.molecule-grid,.evolution-grid{grid-template-columns:1fr}.atom-grid .sample:last-child{grid-column:auto}.field-grid{grid-template-columns:1fr}.lib-top{padding:0 5%}.lib-footer{padding:20px 6%}}
  `]
})
export class UiLibraryComponent {
  @Output() back = new EventEmitter<void>();
  message = '';
  colors = [
    { name: 'Rojo vino', hex: '#68142F' },
    { name: 'Vino oscuro', hex: '#390D20' },
    { name: 'Rosa suave', hex: '#F3E3E9' },
    { name: 'Texto', hex: '#202923' },
    { name: 'Fondo', hex: '#F8FAF8' }
  ];
  components = [
    { number: '01', name: 'UiButtonComponent', description: 'Variantes y estados de acción reutilizables.' },
    { number: '02', name: 'UiFieldComponent', description: 'Campos con ayuda, validación y estados de disponibilidad.' },
    { number: '03', name: 'ProductCardComponent', description: 'Resumen de producto con inventario y evento de agregar.' }
  ];
  demoProduct: UiProduct = { id: 101, name: 'Mochila Explorer', category: 'Viaje', price: 189.9, stock: 12, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80', tag: 'Más vendido' };
  returnToStore() { this.back.emit(); }
}
