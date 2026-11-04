import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({selector:'app-root',standalone:true,imports:[CommonModule,FormsModule],templateUrl:'./app.component.html'})
export class AppComponent implements OnInit {
 page=localStorage.getItem('mhm-page')||'inicio'; token=localStorage.getItem('mhm-token')||''; user:any=JSON.parse(localStorage.getItem('mhm-user')||'null'); toast=''; busy=false;
 products:any[]=[]; categories:any[]=[]; employees:any[]=[]; purchases:any[]=[]; sales:any[]=[]; cart:any[]=[]; selectedProduct:any=null;
 search=''; categoryFilter='Todas'; sort='name'; activeTab='';
 email='admin@mhmstore.pe'; password='Admin123*';
 productForm:any={name:'',brand:'',category_id:'',description:'',price:0,cost:0,stock:0,colors:'',sku:''}; productFile:File|null=null; editingProduct:any=null;
 categoryName=''; categoryDescription=''; employeeForm:any={name:'',email:'',password:'',confirmPassword:'',role:'trabajador',permissions:{sales:true,stock:true,products:false,reports:false,employees:false}}; editingEmployee:any=null;
 purchaseForm:any={brand:'',supplier:'',date:new Date().toISOString().slice(0,10),detail:'',status:'Recibido'}; purchaseLines:any[]=[{product_id:'',quantity:1,unit_cost:0}];
 saleForm:any={customer_name:'',document_type:'boleta',payment_method:'Efectivo'}; saleItems:any[]=[];
 private keys={products:'mhm-products',categories:'mhm-categories',employees:'mhm-employees',purchases:'mhm-purchases',sales:'mhm-sales'};
 constructor(){}
 ngOnInit(){this.seedData();this.loadPublic();if(this.page.startsWith('admin')||['productos-admin','producto-form','trabajadores','trabajador-form','compras','ventas','categorias','almacen','reportes'].includes(this.page)){if(this.isLogged)this.loadAdmin();else this.go('login');}}
 private read(key:string):any[]{try{return JSON.parse(localStorage.getItem(key)||'[]')}catch{return []}}
 private write(key:string,value:any[]){localStorage.setItem(key,JSON.stringify(value))}
 private seedData(){
  if(!localStorage.getItem(this.keys.categories))this.write(this.keys.categories,[{id:1,name:'Urbana',description:'Diseños cómodos para todos los días.'},{id:2,name:'Viaje',description:'Espacio y resistencia para viajar.'},{id:3,name:'Aventura',description:'Preparadas para explorar.'}]);
  if(!localStorage.getItem(this.keys.products))this.write(this.keys.products,[
   {id:1,name:'Mochila Urbana Classic',brand:'MHM',category_id:1,category_name:'Urbana',category:'Urbana',description:'Mochila cómoda para uso diario.',price:129.90,cost:65,stock:18,colors:'Negro, beige',sku:'MHM-URB-001',image_url:'https://images.unsplash.com/photo-1622560480654-d96214fdc887?auto=format&fit=crop&w=900&q=85'},
   {id:2,name:'Mochila de Viaje Explorer',brand:'MHM',category_id:2,category_name:'Viaje',category:'Viaje',description:'Espaciosa y resistente para viajes.',price:189.90,cost:95,stock:24,colors:'Negro, gris',sku:'MHM-VIA-002',image_url:'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85'},
   {id:3,name:'Mochila Adventure Pro',brand:'MHM',category_id:3,category_name:'Aventura',category:'Aventura',description:'Diseñada para actividades al aire libre.',price:249.90,cost:130,stock:12,colors:'Verde, negro',sku:'MHM-ADV-003',image_url:'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=900&q=85'},
   {id:4,name:'Mochila Minimal Beige',brand:'MHM',category_id:1,category_name:'Urbana',category:'Urbana',description:'Diseño minimalista y ligero.',price:99.90,cost:48,stock:31,colors:'Beige',sku:'MHM-URB-004',image_url:'https://images.unsplash.com/photo-1581605405669-fan4b7d1e9a0?auto=format&fit=crop&w=900&q=85'},
   {id:5,name:'Mochila Trekking 40L',brand:'MHM',category_id:3,category_name:'Aventura',category:'Aventura',description:'Capacidad amplia para trekking.',price:279.90,cost:145,stock:9,colors:'Gris, verde',sku:'MHM-ADV-005',image_url:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85'},
   {id:6,name:'Mochila Daily Compact',brand:'MHM',category_id:1,category_name:'Urbana',category:'Urbana',description:'Compacta para llevar lo esencial.',price:89.90,cost:42,stock:15,colors:'Negro, rosa',sku:'MHM-URB-006',image_url:'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?auto=format&fit=crop&w=900&q=85'}
  ]);
  if(!localStorage.getItem(this.keys.employees))this.write(this.keys.employees,[{id:1,name:'Administrador MHM',email:'admin@mhmstore.pe',password:'Admin123*',role:'admin',permissions:{sales:true,stock:true,products:true,reports:true,employees:true},active:true,created_at:new Date().toISOString()}]);
  for(const k of [this.keys.purchases,this.keys.sales])if(!localStorage.getItem(k))this.write(k,[]);
 }
 get isLogged(){return !!this.token&&!!this.user}
 get isAdmin(){return this.user?.role==='admin'}
 get filteredProducts(){return this.products.filter(p=>(this.categoryFilter==='Todas'||p.category===this.categoryFilter)&&(`${p.name} ${p.brand||''}`).toLowerCase().includes(this.search.toLowerCase())).sort((a,b)=>this.sort==='priceAsc'?a.price-b.price:this.sort==='priceDesc'?b.price-a.price:a.name.localeCompare(b.name));}
 get stockTotal(){return this.products.reduce((a,p)=>a+Number(p.stock),0)}
 get lowStockCount(){return this.products.filter(p=>Number(p.stock)<10).length}
 get salesTotal(){return this.sales.reduce((a,x)=>a+Number(x.total),0)}
 get purchasesTotal(){return this.purchases.reduce((a,x)=>a+Number(x.amount),0)}
 get activeEmployees(){return this.employees.filter(e=>e.active).length}
 get saleTotal(){return this.saleItems.reduce((s,x)=>s+x.quantity*x.price,0)}
 notify(s:string){this.toast=s;setTimeout(()=>this.toast='',3200)}
 go(p:string){const adminPages=['admin','productos-admin','producto-form','trabajadores','trabajador-form','compras','ventas','categorias','almacen','reportes'];if(adminPages.includes(p)&&!this.isLogged)p='login';this.page=p;localStorage.setItem('mhm-page',p);window.scrollTo(0,0);if(p==='catalogo')this.loadPublic();if(adminPages.includes(p))this.loadAdmin();}
 loadPublic(){this.products=this.read(this.keys.products);this.categories=this.read(this.keys.categories);this.syncProductCategories()}
 loadAdmin(){this.products=this.read(this.keys.products);this.categories=this.read(this.keys.categories);this.employees=this.read(this.keys.employees);this.purchases=this.read(this.keys.purchases);this.sales=this.read(this.keys.sales);this.syncProductCategories()}
 private syncProductCategories(){for(const p of this.products){const c=this.categories.find(x=>x.id===Number(p.category_id));p.category_name=c?.name||p.category_name||'';p.category=c?.name||p.category||''}}
 handle(e:any){this.notify(e?.message||'Ocurrió un error. Verifica los datos ingresados.')}
 login(){this.busy=true;const employee=this.read(this.keys.employees).find(e=>e.email.toLowerCase()===this.email.toLowerCase()&&e.password===this.password&&e.active!==false);if(!employee){this.busy=false;this.notify('Correo o contraseña incorrectos');return;}this.user={id:employee.id,name:employee.name,email:employee.email,role:employee.role,permissions:employee.permissions||{}};this.token='local-session';localStorage.setItem('mhm-token',this.token);localStorage.setItem('mhm-user',JSON.stringify(this.user));this.busy=false;this.go('admin');this.notify('Bienvenido, '+this.user.name);this.loadAdmin()}
 logout(){this.token='';this.user=null;localStorage.removeItem('mhm-token');localStorage.removeItem('mhm-user');this.go('inicio')}
 hasPermission(p:string){return this.isAdmin||!!this.user?.permissions?.[p]}
 showProductDetails(p:any){this.selectedProduct=p}
 closeProductDetails(){this.selectedProduct=null}
 openProduct(p?:any){this.editingProduct=p||null;this.productForm=p?{...p,category_id:p.category_id||''}:{name:'',brand:'',category_id:this.categories[0]?.id||'',description:'',price:0,cost:0,stock:0,colors:'',sku:''};this.productFile=null;this.page='producto-form';localStorage.setItem('mhm-page',this.page)}
 saveProduct(){const p=this.productForm;if(!String(p.name||'').trim()){this.notify('Ingresa el nombre del producto');return;}if(!Number.isFinite(Number(p.price))||Number(p.price)<0||!Number.isFinite(Number(p.stock))||Number(p.stock)<0||!Number.isFinite(Number(p.cost||0))||Number(p.cost||0)<0){this.notify('Revisa el precio, costo y stock');return;}const all=this.read(this.keys.products);const category=this.categories.find(c=>c.id===Number(p.category_id));const item={...p,id:this.editingProduct?.id||Math.max(0,...all.map(x=>Number(x.id)))+1,category_id:Number(p.category_id)||null,category_name:category?.name||'',category:category?.name||'',price:Number(p.price),cost:Number(p.cost||0),stock:Number(p.stock),image_url:this.editingProduct?.image_url||''};if(this.productFile){const reader=new FileReader();reader.onload=()=>{item.image_url=String(reader.result);this.persistProduct(all,item)};reader.readAsDataURL(this.productFile);return;}this.persistProduct(all,item)}
 private persistProduct(all:any[],item:any){const i=all.findIndex(x=>x.id===item.id);if(i>=0)all[i]=item;else all.push(item);this.write(this.keys.products,all);this.notify('Producto guardado');this.go('productos-admin')}
 onFile(e:any){this.productFile=e.target.files?.[0]||null}
 deleteProduct(p:any){if(confirm(`¿Eliminar ${p.name}?`)){this.write(this.keys.products,this.read(this.keys.products).filter(x=>x.id!==p.id));this.loadAdmin();this.notify('Producto eliminado')}}
 saveCategory(){if(!this.categoryName.trim()){this.notify('Ingresa el nombre de la categoría');return;}const all=this.read(this.keys.categories);all.push({id:Math.max(0,...all.map(x=>Number(x.id)))+1,name:this.categoryName.trim(),description:this.categoryDescription.trim()});this.write(this.keys.categories,all);this.categoryName='';this.categoryDescription='';this.loadAdmin();this.notify('Categoría creada')}
 deleteCategory(c:any){if(confirm('¿Eliminar categoría?')){this.write(this.keys.categories,this.read(this.keys.categories).filter(x=>x.id!==c.id));this.loadAdmin()}}
 openEmployee(e?:any){this.editingEmployee=e||null;this.employeeForm=e?{...e,confirmPassword:'',password:'',permissions:{...e.permissions}}:{name:'',email:'',password:'',confirmPassword:'',role:'trabajador',permissions:{sales:true,stock:true,products:false,reports:false,employees:false}};this.page='trabajador-form';localStorage.setItem('mhm-page',this.page)}
 saveEmployee(){if(!this.employeeForm.name||!this.employeeForm.email){this.notify('Completa nombre y correo');return;}if(!this.editingEmployee&&this.employeeForm.password!==this.employeeForm.confirmPassword){this.notify('Las contraseñas no coinciden');return;}if(!this.editingEmployee&&this.employeeForm.password.length<6){this.notify('La contraseña debe tener al menos 6 caracteres');return;}const all=this.read(this.keys.employees);if(all.some(e=>e.email.toLowerCase()===this.employeeForm.email.toLowerCase()&&e.id!==this.editingEmployee?.id)){this.notify('Ese correo ya está registrado');return;}const item={...this.employeeForm,id:this.editingEmployee?.id||Math.max(0,...all.map(x=>Number(x.id)))+1,active:true,created_at:this.editingEmployee?.created_at||new Date().toISOString()};if(this.editingEmployee&&!item.password)item.password=this.editingEmployee.password;delete item.confirmPassword;const i=all.findIndex(x=>x.id===item.id);if(i>=0)all[i]=item;else all.push(item);this.write(this.keys.employees,all);this.notify('Trabajador guardado');this.go('trabajadores')}
 deleteEmployee(e:any){if(confirm(`¿Eliminar a ${e.name}?`)){this.write(this.keys.employees,this.read(this.keys.employees).filter(x=>x.id!==e.id));this.loadAdmin();this.notify('Trabajador eliminado')}}
 stockForPurchase(productId:any){return this.products.find(p=>p.id===Number(productId))?.stock??'—'}

 productNameForPurchase(productId:any){return this.products.find(p=>p.id===Number(productId))?.name||''}
 selectPurchaseProduct(line:any){
  const term=String(line.product_search||'').trim().toLocaleLowerCase();
  const product=this.products.find(p=>String(p.name||'').trim().toLocaleLowerCase()===term);
  if(!product){line.product_id='';return}
  line.product_id=product.id;
  if(!Number(line.unit_cost))line.unit_cost=Number(product.cost||0);
 }
 addPurchaseLine(){this.purchaseLines.push({product_id:'',quantity:1,unit_cost:0})}
 removePurchaseLine(i:number){if(this.purchaseLines.length===1){this.purchaseLines[0]={product_id:'',quantity:1,unit_cost:0};return;}this.purchaseLines.splice(i,1)}
 get purchaseGrandTotal(){return this.purchaseLines.reduce((sum,x)=>sum+Number(x.quantity||0)*Number(x.unit_cost||0),0)}
 get lastFiveMonths(){const now=new Date();return Array.from({length:5},(_,i)=>{const d=new Date(now.getFullYear(),now.getMonth()-4+i,1);const key=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0');const purchases=this.purchases.filter(x=>String(x.date||x.created_at||'').slice(0,7)===key).reduce((a,x)=>a+Number(x.amount||0),0);const sales=this.sales.filter(x=>String(x.created_at||x.date||'').slice(0,7)===key).reduce((a,x)=>a+Number(x.total||0),0);return {key,label:d.toLocaleDateString('es-PE',{month:'short'}).replace('.',''),purchases,sales,max:Math.max(purchases,sales,1)}})}
 get popularProducts(){const totals:any={};for(const sale of this.sales){for(const item of (sale.items||[])){const key=String(item.product_id??item.name);if(!totals[key])totals[key]={name:item.name||item.product_name||'Producto',quantity:0};totals[key].quantity+=Number(item.quantity||0)}}return (Object.values(totals) as {name:string;quantity:number}[]).sort((a,b)=>b.quantity-a.quantity).slice(0,5)}
 get monthlyReport(){const now=new Date();return Array.from({length:12},(_,i)=>{const d=new Date(now.getFullYear(),now.getMonth()-11+i,1);const key=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0');const purchases=this.purchases.filter(x=>String(x.date||x.created_at||'').slice(0,7)===key).reduce((a,x)=>a+Number(x.amount||0),0);const sales=this.sales.filter(x=>String(x.created_at||x.date||'').slice(0,7)===key).reduce((a,x)=>a+Number(x.total||0),0);return {month:d.toLocaleDateString('es-PE',{month:'long',year:'numeric'}),key,purchases,sales}})}
 exportMonthlyExcel(){const esc=(v:any)=>String(v??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');const sheet=(name:string,headers:string[],rows:any[][])=>`<Worksheet ss:Name="${name}"><Table><Row>${headers.map(h=>`<Cell><Data ss:Type="String">${esc(h)}</Data></Cell>`).join('')}</Row>${rows.map(r=>`<Row>${r.map(v=>`<Cell><Data ss:Type="${typeof v==='number'?'Number':'String'}">${esc(v)}</Data></Cell>`).join('')}</Row>`).join('')}</Table></Worksheet>`;const monthly=this.monthlyReport.map(x=>[x.month,x.purchases,x.sales,x.sales-x.purchases]);const popular=this.popularProducts.map((x:any,i:number)=>[i+1,x.name,x.quantity]);const pairs=this.lastFiveMonths.map(x=>[x.label,x.key,x.purchases,x.sales]);const xml=`<?xml version="1.0"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">${sheet('Reporte mensual',['Mes','Compras (S/)','Ventas (S/)','Balance (S/)'],monthly)}${sheet('Top productos',['Puesto','Producto','Unidades vendidas'],popular)}${sheet('Ultimos 5 meses',['Mes','Periodo','Compras (S/)','Ventas (S/)'],pairs)}</Workbook>`;const blob=new Blob([xml],{type:'application/vnd.ms-excel;charset=utf-8;'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='MHM-Reporte-mensual.xls';a.click();URL.revokeObjectURL(url);this.notify('Reporte Excel generado')}
 savePurchase(){const p=this.purchaseForm;if(!p.date||!this.purchaseLines.length||this.purchaseLines.some(x=>!x.product_id||!Number.isInteger(Number(x.quantity))||Number(x.quantity)<1||!Number.isFinite(Number(x.unit_cost))||Number(x.unit_cost)<0)){this.notify('Completa producto, cantidad y costo en cada fila');return;}const all=this.read(this.keys.products);const purchases=this.read(this.keys.purchases);for(const line of this.purchaseLines){if(!all.some(x=>x.id===Number(line.product_id))){this.notify('Hay un producto no válido');return;}}const groupId=Date.now();for(const line of this.purchaseLines){const product=all.find(x=>x.id===Number(line.product_id));const quantity=Number(line.quantity);const amount=quantity*Number(line.unit_cost);if(p.status==='Recibido')product.stock=Number(product.stock)+quantity;purchases.unshift({...p,id:groupId+Math.random(),group_id:groupId,product_id:product.id,product_name:product.name,quantity,unit_cost:Number(line.unit_cost),amount,created_at:new Date().toISOString()});}this.write(this.keys.products,all);this.write(this.keys.purchases,purchases);this.purchaseLines=[{product_id:'',quantity:1,unit_cost:0}];this.purchaseForm={...p,date:new Date().toISOString().slice(0,10),detail:''};this.loadAdmin();this.notify('Compra registrada y stock actualizado')}
 addSaleItem(p:any){const line=this.saleItems.find(x=>x.product_id===p.id);if(line){if(line.quantity>=p.stock){this.notify('Stock insuficiente');return;}line.quantity++}else if(p.stock>0)this.saleItems.push({product_id:p.id,name:p.name,quantity:1,price:Number(p.price),stock:p.stock});else this.notify('Producto sin stock')}
 changeSaleQty(i:number,d:number){const item=this.saleItems[i];if(d>0&&item.quantity>=item.stock){this.notify('No hay más unidades disponibles');return;}item.quantity+=d;if(item.quantity<1)this.saleItems.splice(i,1)}
 saveSale(){if(!this.saleItems.length){this.notify('Agrega productos a la venta');return;}const all=this.read(this.keys.products);for(const line of this.saleItems){const p=all.find(x=>x.id===line.product_id);if(!p||p.stock<line.quantity){this.notify('Stock insuficiente para '+line.name);return;}}for(const line of this.saleItems){const p=all.find(x=>x.id===line.product_id);p.stock=Number(p.stock)-line.quantity;}const sale={id:Date.now(),...this.saleForm,items:this.saleItems.map(x=>({...x})),total:this.saleTotal,created_at:new Date().toISOString()};this.write(this.keys.products,all);this.write(this.keys.sales,[sale,...this.read(this.keys.sales)]);this.saleItems=[];this.loadAdmin();this.notify('Venta registrada. Inventario actualizado.')}
 downloadReceipt(id:number){
  const sale=this.sales.find(x=>x.id===id);
  if(!sale)return;
  const rows=sale.items.map((x:any)=>`<tr>
    <td class="item-name">${x.name}<small>${x.quantity} × S/ ${this.money(x.price)}</small></td>
    <td class="item-total">S/ ${this.money(x.quantity*x.price)}</td>
  </tr>`).join('');
  const html=`<!doctype html><html lang="es"><head><meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Ticket MHM ${id}</title>
  <style>
    @page{size:80mm auto;margin:3mm}
    *{box-sizing:border-box}
    html,body{margin:0;padding:0;background:#fff;color:#171717}
    body{font:12px/1.4 Arial,Helvetica,sans-serif}
    .ticket{width:100%;max-width:74mm;margin:0 auto;padding:2mm 1mm}
    .brand{text-align:center;padding:3mm 0 2mm;border-bottom:1px dashed #777}
    .brand h1{font-size:23px;letter-spacing:2px;margin:0;font-weight:800}
    .brand p{font-size:9px;letter-spacing:3px;margin:1px 0 0}
    .ticket-title{text-align:center;font-weight:700;font-size:13px;margin:3mm 0 1mm;text-transform:uppercase}
    .meta{font-size:10px;margin:2mm 0}
    .meta div{display:flex;justify-content:space-between;gap:8px;margin:1mm 0}
    .rule{border:0;border-top:1px dashed #777;margin:3mm 0}
    table{width:100%;border-collapse:collapse;font-size:11px}
    td{padding:2mm 0;vertical-align:top}
    .item-name{width:70%;padding-right:3mm}
    .item-name small{display:block;font-size:9px;color:#444;margin-top:1px}
    .item-total{text-align:right;white-space:nowrap;font-weight:600}
    .total{display:flex;justify-content:space-between;align-items:center;font-size:16px;font-weight:800;margin:3mm 0}
    .payment{font-size:10px;margin:2mm 0}
    .thanks{text-align:center;font-size:10px;margin:5mm 0 2mm}
    .legal{text-align:center;font-size:8px;color:#555;margin-top:2mm}
    @media screen{body{background:#eee;padding:12px}.ticket{background:#fff;box-shadow:0 2px 12px #0002;padding:6mm}}
    @media print{body{padding:0}.ticket{box-shadow:none;padding:0}}
  </style></head><body><main class="ticket">
    <header class="brand"><h1>MHM</h1><p>STORE</p></header>
    <div class="ticket-title">Ticket de venta</div>
    <section class="meta">
      <div><span>Comprobante</span><b>${sale.document_type||'Venta'}</b></div>
      <div><span>N.º de operación</span><b>${id}</b></div>
      <div><span>Fecha</span><b>${new Date(sale.created_at).toLocaleString('es-PE')}</b></div>
      <div><span>Cliente</span><b>${sale.customer_name||'Consumidor final'}</b></div>
    </section>
    <hr class="rule">
    <table><tbody>${rows}</tbody></table>
    <hr class="rule">
    <div class="total"><span>TOTAL</span><span>S/ ${this.money(sale.total)}</span></div>
    <p class="payment">Medio de pago: <b>${sale.payment_method||'No especificado'}</b></p>
    <hr class="rule">
    <p class="thanks">¡Gracias por tu compra!<br>Vuelve pronto a MHM STORE</p>
    <p class="legal">Documento interno de demostración.<br>No es comprobante electrónico autorizado por SUNAT.</p>
  </main></body></html>`;
  const receiptWindow=window.open('','_blank');
  if(!receiptWindow){this.notify('Permite las ventanas emergentes para generar el ticket');return;}
  receiptWindow.document.open();receiptWindow.document.write(html);receiptWindow.document.close();
  receiptWindow.focus();receiptWindow.print();
 }
 money(n:any){return Number(n||0).toFixed(2)}
}
