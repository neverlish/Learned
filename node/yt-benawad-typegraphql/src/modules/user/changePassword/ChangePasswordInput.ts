import { InputType, Field } from 'type-graphql';
import { PasswordMixin } from '../../../modules/shared/PasswordInput';

@InputType()
export class ChangePasswordInput extends PasswordMixin(class { }) {
  @Field()
  token: string;
}
