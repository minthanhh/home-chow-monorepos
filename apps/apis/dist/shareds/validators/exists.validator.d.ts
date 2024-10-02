import type { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
import { PrismaService } from '../globals';
export declare class ExistsValidator implements ValidatorConstraintInterface {
    private readonly prisma;
    constructor(prisma: PrismaService);
    validate<E>(value: string, args: IExistsValidationArguments<E>): Promise<boolean>;
    defaultMessage(args: ValidationArguments): string;
}
type ExistsValidationConstraints<E> = [keyof PrismaService, (validationArguments: ValidationArguments, value: string) => E];
interface IExistsValidationArguments<E> extends ValidationArguments {
    constraints: ExistsValidationConstraints<E>;
}
export declare function Exists<E>(constraints: Partial<ExistsValidationConstraints<E>>, validationOptions?: ValidationOptions): PropertyDecorator;
export {};
