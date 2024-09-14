import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { GOOGLE_KEY } from '../constanst'

@Injectable()
export class GoogleOAuthGuard extends AuthGuard(GOOGLE_KEY) {}
