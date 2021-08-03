import React from 'react';
import './App.css';
import { Form } from './form/Form';
import data from './/data.json';
import secondData from './/static.json';

function App() {
  return (
    <div className="App">
     <Form data={data}/>
     <Form data={secondData}/>
    </div>
  );
}

export default App;
