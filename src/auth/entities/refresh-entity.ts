import { User } from 'src/users/entities/User.entity';

export class RefreshEntity {
  userId?: number;
  userAgent: string;
  ipAddress: string;
}
