const Persons = ({ persons }) => {
  return persons.map((person) => {
    return (
      <p key={person.id}>
        <span>{person.name}</span>
        <span> {person.number}</span>
      </p>
    );
  });
};

export default Persons;
