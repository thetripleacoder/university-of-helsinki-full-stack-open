import axios from 'axios';
import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((response) => {
      console.log('promise fulfilled', response);
      setPersons(response.data);
    });
  }, []);

  function addNumber(e) {
    e.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      let newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
      setPersons(persons.concat(newPerson));
      setNewName('');
      setNewNumber('');
    }
  }

  function filterList(keyword) {
    let copyPersons = persons;
    let newFilteredList = copyPersons.filter((person) =>
      person.name.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredList(newFilteredList);
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filterList={filterList} />

      <h3>Add a new</h3>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleSubmit={addNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />

      <h3>Numbers</h3>

      <Persons persons={persons} filteredList={filteredList} />
    </div>
  );
};

export default App;
