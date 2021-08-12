import React from 'react';
import './App.css';
import { FormPage } from './form/FormPage';
import data from './/data.json';
import secondData from './/static.json';

function App() {
  return (
    <div className="App">
     <FormPage data={data}/>
     <FormPage data={secondData}/>
    </div>
  );
}

export default App;
