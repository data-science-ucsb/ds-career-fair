export default function FormInput({
  name,
  label,
  register,
  errors,
  additionalOptions = {},
}) {
  return (
    <>
      <input {...register(name, { required: true, ...additionalOptions })} />
      {errors[name] && <p>Please enter your {label}.</p>}
    </>
  );
}
