export interface IVehicle {
  id: number;
  name: string;
  model: string;
  year: number;
  color: string;
  price: string;
  latitude: number;
  longitude: number;
}

//export interface IVehicleData extends Omit<IVehicle, 'id'> {}