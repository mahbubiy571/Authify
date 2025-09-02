function FormInput({ label, name, type }) {
  return (
    <div>
      <label>{label}</label>
      <br />
      <input type={type} name={name} />
      <hr />
    </div>
  );
}

export default FormInput;
