import type { Data, Tool, Employee } from './Utilities/interfaces'
import { fetchToolsAndEmployees } from './Utilities/fetchData';

import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios';

function App() {
  const [data, setData] = useState<Data>();

  useEffect(() => {
    fetchToolsAndEmployees(setData);
    console.log(data);
  }, []);


  return (
    <>
      <header className='max-w-240 mx-auto my-0 p-4'>
        <h1 onClick={() => console.log(data)} className='text-2xl font-medium'>Tool Inventory System</h1>
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
