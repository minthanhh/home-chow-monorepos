import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
import { PrismaService } from '../globals';
export declare class UniqueValidator implements ValidatorConstraintInterface {
    protected readonly prisma: PrismaService;
    constructor(prisma: PrismaService);
    validate<E>(value: string, args: IUniqueValidationArguments<E>): Promise<boolean>;
    defaultMessage(args: ValidationArguments): string;
}
type UniqueValidationConstraints<E> = [keyof PrismaService, (validationArguments: ValidationArguments, value: string) => E];
interface IUniqueValidationArguments<E> extends ValidationArguments {
    constraints: UniqueValidationConstraints<E>;
}
export declare function Unique<E>(constraints: Partial<UniqueValidationConstraints<E>>, validationOptions?: ValidationOptions): PropertyDecorator;
export {};
