const Persons = ({ persons, filteredList, handleDelete }) => {
  return (filteredList.length ? filteredList : persons).map((person) => {
    return (
      <p key={person.id}>
        <span>{person.name}</span>
        <span> {person.number}</span>
        <button onClick={() => handleDelete(person)}>delete</button>
      </p>
    );
  });
};

export default Persons;
