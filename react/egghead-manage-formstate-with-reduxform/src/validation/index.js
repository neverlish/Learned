export const required = value => 
  value ? undefined : 'Value is required';

export const minLength = value =>
  value.length < 4
    ? 'Value must be at least 4 characters'
    : undefined;

export const maxLength = value =>
   value.length > 10
    ? 'Value is too long'
    : undefined;

export const matchesPassword = (value, allValues) => 
  value === allValues.password ? undefined : 'Passwords must match';
