import { CreateDeviceDto } from './dtos/create-device.dto';
import { UpdateDeviceDto } from './dtos/update-device.dto';
export declare class DevicesService {
    create(createDeviceDto: CreateDeviceDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateDeviceDto: UpdateDeviceDto): string;
    remove(id: number): string;
}
