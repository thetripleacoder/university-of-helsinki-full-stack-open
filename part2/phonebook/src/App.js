import axios from 'axios';
import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import notesService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    notesService.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  function addNumber(e) {
    e.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      // alert(`${newName} is already added to phonebook`);
      let personIndex = persons.findIndex((person) => person.name === newName);
      let updatedPersonData = {
        name: newName,
        number: newNumber,
        id: personIndex + 1,
      };
      if (
        window.confirm(
          `${updatedPersonData.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        notesService.update(updatedPersonData.id, updatedPersonData);
        let copyPersons = persons;
        copyPersons[personIndex] = updatedPersonData;
        setPersons(copyPersons);
        setNewName('');
        setNewNumber('');
      }
    } else {
      let newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
      notesService.create(newPerson);
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

  function deleteNumber(personData) {
    if (window.confirm(`Delete ${personData.name} ?`)) {
      notesService.deleteNumber(personData.id);
      let copyPersons = persons;
      copyPersons = copyPersons.filter((person) => person.id !== personData.id);
      setPersons(copyPersons);
    }
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

      <Persons
        persons={persons}
        filteredList={filteredList}
        handleDelete={deleteNumber}
      />
    </div>
  );
};

export default App;
