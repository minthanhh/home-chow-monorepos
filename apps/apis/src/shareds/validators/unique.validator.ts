import { Injectable } from '@nestjs/common'
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { PrismaService } from '../globals'

@ValidatorConstraint({ name: 'uniqueValidator', async: true })
@Injectable()
export class UniqueValidator implements ValidatorConstraintInterface {
    constructor(protected readonly prisma: PrismaService) {}

    public async validate<E>(value: string, args: IUniqueValidationArguments<E>): Promise<boolean> {
        const [modelName, findCondition] = args.constraints

        if (!value) return true

        const record = await this.prisma[modelName]['findUnique']({
            where: findCondition(args, value),
        })

        return record === null
    }

    defaultMessage(args: ValidationArguments): string {
        return `${args.value} already exists`
    }
}

type UniqueValidationConstraints<E> = [keyof PrismaService, (validationArguments: ValidationArguments, value: string) => E]

interface IUniqueValidationArguments<E> extends ValidationArguments {
    constraints: UniqueValidationConstraints<E>
}

export function Unique<E>(constraints: Partial<UniqueValidationConstraints<E>>, validationOptions?: ValidationOptions): PropertyDecorator {
    return function (object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints,
            validator: UniqueValidator,
        })
    }
}
