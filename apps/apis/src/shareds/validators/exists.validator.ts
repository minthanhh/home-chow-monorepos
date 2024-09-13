import { Injectable } from '@nestjs/common'
import type { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator'
import { registerDecorator, ValidatorConstraint } from 'class-validator'
import { PrismaService } from '../globals'

@ValidatorConstraint({ name: 'existsValidator', async: true })
@Injectable()
export class ExistsValidator implements ValidatorConstraintInterface {
    constructor(private readonly prisma: PrismaService) {}

    public async validate<E>(value: string, args: IExistsValidationArguments<E>): Promise<boolean> {
        const [modelName, findCondition] = args.constraints

        const record = await this.prisma[modelName]['findFirst']({
            where: findCondition(args, value),
        })

        return record !== null
    }

    defaultMessage(args: ValidationArguments): string {
        const [modelName] = args.constraints
        const entity = modelName || 'Entity'

        return `The selected ${args.property} does not exist in ${entity} entity`
    }
}

type ExistsValidationConstraints<E> = [keyof PrismaService, (validationArguments: ValidationArguments, value: string) => E]

interface IExistsValidationArguments<E> extends ValidationArguments {
    constraints: ExistsValidationConstraints<E>
}

export function Exists<E>(constraints: Partial<ExistsValidationConstraints<E>>, validationOptions?: ValidationOptions): PropertyDecorator {
    return (object, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints,
            validator: ExistsValidator,
        })
    }
}
