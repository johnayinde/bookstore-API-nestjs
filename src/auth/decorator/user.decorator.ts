import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const { user } = context.switchToHttp().getRequest();
    console.log({ user });

    return user.userId;
  },
);
