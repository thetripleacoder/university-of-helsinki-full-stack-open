const Filter = ({ keyword, filterList }) => {
  return (
    <p>
      <span>filter shown with</span>
      <input value={keyword} onChange={(e) => filterList(e.target.value)} />
    </p>
  );
};

export default Filter;
