import axios from 'axios';
import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import notesService from './services/persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filteredList, setFilteredList] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState(null);

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
        notesService
          .update(updatedPersonData.id, updatedPersonData)
          .then((response) => {
            console.log(response);
            if (response) {
              let copyPersons = persons;
              copyPersons[personIndex] = updatedPersonData;
              setPersons(copyPersons);
              setNewName('');
              setNewNumber('');
              setNotificationMessage(
                `${updatedPersonData.name}'s number has been updated`
              );
              setTimeout(() => {
                setNotificationMessage(null);
              }, 3000);
            }
          })
          .catch((error) => {
            setNotificationMessage(
              `Information of ${updatedPersonData.name} has already been removed from server`
            );
            setTimeout(() => {
              setNotificationMessage(null);
            }, 3000);
          });
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
      setNotificationMessage(`Added ${newPerson.name}`);
      setTimeout(() => {
        setNotificationMessage(null);
      }, 3000);
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
      notesService
        .deleteNumber(personData.id)
        .then((response) => {
          if (response) {
            let copyPersons = persons;
            copyPersons = copyPersons.filter(
              (person) => person.id !== personData.id
            );
            setPersons(copyPersons);
          }
        })
        .catch((error) => {
          console.log('fail');
        });
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />

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
