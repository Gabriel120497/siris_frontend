import { EquiposModel } from './equipos';

export class ReservaEquiposModel {
    id: string;
    equipos: EquiposModel[];
    fechaInicio: string;
    fechaFin: string;
    descripcionNecesidad: string;
}