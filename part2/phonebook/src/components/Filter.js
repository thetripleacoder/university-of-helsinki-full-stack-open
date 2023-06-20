const Filter = ({ handleChange }) => {
  return (
    <p>
      <span>filter shown with</span>
      <input onChange={handleChange} />
    </p>
  );
};

export default Filter;
