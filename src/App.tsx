import { useState } from 'react';

import './App.css';
import FakeReact from './FakeReact';

function App() {
  const [myCount, setMyCount] = FakeReact.useState(0);
  const [yourCount, setYourCount] = useState(0);

  return (
    <>
      <h1>useState</h1>
      <div className="card">
        <button onClick={() => setMyCount(myCount + 1)}>my count is {myCount}</button>
        <button onClick={() => setYourCount(yourCount + 1)}>your count is {yourCount}</button>
      </div>
    </>
  );
}

export default App;
