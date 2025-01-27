export const getFormRule = (
  type: 'required' | 'minLength' | 'maxLength' | 'pattern',
  value?: number
) => {
  if (type === 'required') {
    return 'Value is required';
  } else if (type === 'minLength') {
    return `Value should be at least ${value}`;
  } else if (type === 'maxLength') {
    return `Value should be at most ${value}`;
  } else if (type === 'pattern') {
    return 'Invalid value';
  }
  return '';
};
