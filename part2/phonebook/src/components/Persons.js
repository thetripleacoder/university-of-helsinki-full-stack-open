const Persons = ({ persons, filteredList }) => {
  return (filteredList.length ? filteredList : persons).map((person) => {
    return (
      <p key={person.id}>
        <span>{person.name}</span>
        <span> {person.number}</span>
      </p>
    );
  });
};

export default Persons;
