const Total = ({ parts }) => {
  const total = parts
    .map((part) => part.exercises)
    .reduce((total, exercisesVal) => total + exercisesVal);
  console.log(total);
  return <p>total of {total} exercises</p>;
};

export default Total;
