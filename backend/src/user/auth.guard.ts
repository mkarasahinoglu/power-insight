import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { JwtService } from "@nestjs/jwt"
import { Request } from "express"
import { IS_PUBLIC_KEY } from "src/utils/constants"

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService, private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    try {
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
        throw new UnauthorizedException("Invalid Session")
      }
  
      const decoded = await this.jwtService.verifyAsync(accessToken, {secret: process.env.ACCESS_TOKEN_KEY})
      req["email"] = decoded.email
      return true
    }
    catch(err) {
      throw new HttpException(
        err?.message || "An unexpected error occured",
        err?.status || HttpStatus.UNAUTHORIZED
      )
    }
  }

  private extractTokenFromHeader(req: Request):string | undefined {
    try {
      const [type, accessToken] = req.headers.authorization?.split(" ") ?? []
      return type === "Bearer" ? accessToken : undefined
    }
    catch(err) {
      throw new HttpException(
        err?.message,
        err?.status
      )
    }
  }
}