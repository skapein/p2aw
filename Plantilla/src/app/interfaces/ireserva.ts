export interface IReserva {
    reservacion_id: number;
    evento_id: number;
    cliente_id: number;
    fecha_reservacion: string; // O Date si lo prefieres como objeto de fecha
  }