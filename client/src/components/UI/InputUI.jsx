import '@/styles/ui/input-ui.module.scss';

const InputUI = ({
  type = 'text',
  placeholder = 'Username',
  name,
  style = {},
  onChange,
  register = () => {},
  defaultValue = '',
  validationSchema,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      {...register(name, validationSchema)}
      defaultValue={defaultValue}
      name={name}
      onChange={onChange}
      style={style}
      autoComplete="off"
    />
  )
}

export default InputUI;
