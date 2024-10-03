import {
  CreateMaintenanceDto,
  UpdateMaintenanceDto,
} from '../dtos/maintenances.dto';
import { Maintenances } from '../repositories/maintenances.entity';

export interface IMaintenanacesService {
  findAll(): Promise<Maintenances[]>;
  create(newMaintenance: CreateMaintenanceDto): Promise<Maintenances[]>;
  update(
    id: number,
    updateMaintenance: UpdateMaintenanceDto,
  ): Promise<Maintenances>;
  delete(id: number): Promise<void>;
  maintenanceHistory(id: number): Promise<Maintenances[]>;
  countMaintenancesByMonth(
    facilityId: number,
    year: number,
  ): Promise<ChartData>;
}

// Define the interface for the chart data
export interface ChartData {
  labels: string[];
  datasets: Dataset[];
}

interface Dataset {
  data: number[];
}
