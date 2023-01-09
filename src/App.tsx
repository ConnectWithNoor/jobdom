import React, { useState } from 'react';
import './App.css';
import './components/style.css';
import InputField from './components/InputField';

function App() {
  const [job, setJob] = useState('');
  return (
    <div className='App'>
      <span className='heading'>Jobdom</span>

      <InputField />
    </div>
  );
}

export default App;
