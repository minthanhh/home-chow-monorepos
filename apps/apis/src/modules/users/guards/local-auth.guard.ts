import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { LOCAL_KEY } from '../constanst'

@Injectable()
export class LocalAuthGuard extends AuthGuard(LOCAL_KEY) {}
