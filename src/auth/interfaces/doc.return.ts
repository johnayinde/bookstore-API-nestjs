import { ApiProperty } from '@nestjs/swagger';

export class loginReturn {
  @ApiProperty()
  accessToken: string;
  @ApiProperty()
  refreshToken: string;
}

export class refreshReturn {
  @ApiProperty()
  refreshToken: string;
}
