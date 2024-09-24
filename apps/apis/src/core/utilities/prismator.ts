import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaService } from 'src/shareds'

export const prismator = (model: PrismaService) => {
    return model.$extends(withAccelerate())
}

export const cacheStrategy = { swr: 60, ttl: 60 }
