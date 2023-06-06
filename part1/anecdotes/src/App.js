import { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length));

  const highestVotesIndex = votes.reduce((accumulator, current, index) => {
    return current > votes[accumulator] ? index : accumulator;
  }, 0);

  function setRandomAnecdote() {
    let index = Math.floor(Math.random() * anecdotes.length);
    console.log(index);
    setSelected(index);
  }

  function voteSelectedAnecdote() {
    let copyVotes = [...votes];
    copyVotes[selected] += 1;
    setVotes(copyVotes);
  }

  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        <p>{anecdotes[selected]}</p>
        <p>has {votes[selected]} votes</p>
        <button onClick={() => voteSelectedAnecdote()}>vote</button>
        <button onClick={() => setRandomAnecdote()}>next anecdote</button>
      </div>
      <div>
        <h1>Anecdote with the most votes</h1>
        <p>{anecdotes[highestVotesIndex]}</p>
        <p>has {votes[highestVotesIndex]} votes</p>
      </div>
    </div>
  );
};

export default App;
