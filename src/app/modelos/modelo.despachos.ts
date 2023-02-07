export interface ModelDespachoI {
    id_despacho: number;
    fecha_despacho: Date;
    cantidad_libras: number;
    numero_tinas: number;
    ruta: string;
    observasiones: string;
    cliente: string;
    guardia: string;
}