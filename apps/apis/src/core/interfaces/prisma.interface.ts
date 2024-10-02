import { DefaultArgs } from '@prisma/client/runtime/library'
import { Prisma, PrismaClient } from '@prisma/client'

export interface IPrismaTransaction
    extends Omit<
        PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
        '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
    > {}
