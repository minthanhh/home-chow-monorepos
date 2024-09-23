import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { PHONE_KEY } from '../constanst'

@Injectable()
export class PhoneAuthGuard extends AuthGuard(PHONE_KEY) {}
