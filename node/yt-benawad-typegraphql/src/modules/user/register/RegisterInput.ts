import { Length, IsEmail } from 'class-validator';
import { InputType, Field } from 'type-graphql';
import { IsEmailAlreadyExist } from './isEmailAlreadyExists';
import { PasswordMixin } from '../../../modules/shared/PasswordInput';

@InputType()
export class RegisterInput extends PasswordMixin(class { }) {
  @Field()
  @Length(1, 255)
  firstName: string;

  @Field()
  @Length(1, 255)
  lastName: string;

  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({ message: 'email alreay in use' })
  email: string;
}
