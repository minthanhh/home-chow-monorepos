import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dtos/create-device.dto';
import { UpdateDeviceDto } from './dtos/update-device.dto';
export declare class DevicesController {
    private readonly devicesService;
    constructor(devicesService: DevicesService);
    create(createDeviceDto: CreateDeviceDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateDeviceDto: UpdateDeviceDto): string;
    remove(id: string): string;
}
