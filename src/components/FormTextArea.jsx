function FormTextArea({ label, name, type }) {
  return (
    <div>
      <label htmlFor="">{label}</label>
      <textarea name={name} type={type}></textarea>
    </div>
  );
}

export default FormTextArea;
