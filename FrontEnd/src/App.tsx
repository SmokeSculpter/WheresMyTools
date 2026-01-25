import type { Data } from './components/interfaces'

import './App.css'
import { useEffect } from 'react'
import axios from 'axios';

function App() {
  useEffect(() => {
    axios.get<Data>("https://localhost:7014/api/view/loadData").then(response => {
      console.log(response.data)
    }).catch(err => {
      console.error(err);
    })
  });


  return (
    <>
      
    </>
  )
}

export default App
