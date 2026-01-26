import type { Data, Tool, Employee } from './components/interfaces'

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
      <header className='max-w-240 mx-auto my-0 p-4'>
        <h1 className='text-2xl font-medium'>Tool Inventory System</h1>
      </header>
      <main className='max-w-240 mx-auto my-0'>
        <div className='px-4'>
          <div className='w-full bg-gray-300 h-px'/>
        </div>
        <section className='w-full flex px-4 text-gray-500'>
          <h2 className='py-4'>Inventory</h2>
          <h2 className='mx-4 py-4'>Checked Out</h2>
          <h2 className='py-4'>History</h2>
        </section>
        <div className='px-4'>
          <div className='w-full bg-gray-300 h-px'/>
        </div>
      </main>
    </>
  )
}

export default App
