import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { JwtService } from "@nestjs/jwt"
import { Request } from "express"
import { IS_PUBLIC_KEY } from "src/Utils/constants"

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService, private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    if(isPublic) {
      return true
    }

    const req = context.switchToHttp().getRequest()
    const accessToken = this.extractTokenFromHeader(req)
    
    if(!accessToken) {
      throw new UnauthorizedException("This session is invalid")
    }

    const email = await this.jwtService.verifyAsync(accessToken, {secret: process.env.ACCESS_TOKEN_KEY})
    req["email"] = email
    return true
  }

  private extractTokenFromHeader(req: Request):string | undefined {
    const [type, accessToken] = req.headers.authorization?.split(" ") ?? []
    return type === "Bearer" ? accessToken : undefined
  }
}