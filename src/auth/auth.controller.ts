import { Controller, Inject, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  LoginRequestDto,
  RegisterRequestDto,
  ValidateRequestDto,
} from './auth.dto';
import {
  AUTH_SERVICE_NAME,
  RegisterResponse,
  LoginResponse,
  ValidateResponse,
} from './auth.pb';
import { AuthService } from './service/auth.service';

@Controller()
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;
  private logger = new Logger('MSA-AUTH');

  @GrpcMethod(AUTH_SERVICE_NAME, 'Register')
  private register(payload: RegisterRequestDto): Promise<RegisterResponse> {
    this.logger.log(JSON.stringify(payload));
    return this.service.register(payload);
  }

  @GrpcMethod(AUTH_SERVICE_NAME, 'Login')
  private login(payload: LoginRequestDto): Promise<LoginResponse> {
    this.logger.log(JSON.stringify(payload));
    return this.service.login(payload);
  }

  @GrpcMethod(AUTH_SERVICE_NAME, 'Validate')
  private validate(payload: ValidateRequestDto): Promise<ValidateResponse> {
    this.logger.log(JSON.stringify(payload));
    return this.service.validate(payload);
  }
}
