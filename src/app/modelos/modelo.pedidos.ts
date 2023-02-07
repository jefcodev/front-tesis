// import { Moment } from 'moment';    
export interface ModelPedidosI{
    id_pedido:number;
    fecha_pedido:Date;
    fecha_entrega:Date;
    cantidad_libras:number;
    ruta:string;
    observasiones:string;
    client:string;
 }