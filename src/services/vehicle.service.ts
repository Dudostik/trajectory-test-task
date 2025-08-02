import axios from 'axios';
import type { IVehicle } from '../types/vehicle.interface';

export const VehicleService = {
    async getAll() {
        const response = await axios.get('https://ofc-test-01.tspb.su/test-task/vehicles')
        return response.data
    },

    async getById(id: number) {
        const response = await axios.get(`https://ofc-test-01.tspb.su/test-task/vehicles?id=${id}`)
        return response.data[id-1]
    },

    async update(id: number, data: Partial<IVehicle>) {
        return { ...data, id }
    },
  
    async delete(id: number) {
        return { success: true, id }
    },
}