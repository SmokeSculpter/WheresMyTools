import './App.css'

import type { Data, Tool, Employee, EmployeeTools, Record } from './Utilities/interfaces'
import { fetchToolsAndEmployees, fetchEmployeeTools, fetchRecords } from './Utilities/fetchData';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToolbox } from '@fortawesome/free-solid-svg-icons';

import { useEffect, useState } from 'react'

import axios from 'axios';

import ToolElement from './components/ToolElement';
import Dialog from './components/Dialog';

function App() {
  const [data, setData] = useState<Data>();
  const [employeeTools, setEmployeeTools] = useState<EmployeeTools[]>();
  const [records, setRecords] = useState<Record[]>();

  const [currentView, setCurrentView] = useState<string>("Inventory");
  const [dialogOpen, setDialogOpen] = useState(true);

  useEffect(() => {
    fetchToolsAndEmployees(setData);
  }, []);


  return (
    <>
      <Dialog/>
      {/* Header */}
      <header className='max-w-240 mx-auto my-0 p-4 flex items-center text-blue-500'>
        <FontAwesomeIcon icon={faToolbox} size='xl'/>
        <h1 className='text-2xl font-medium px-2'>Tool Inventory System</h1>
      </header>

      <main>
        <section className='max-w-240 mx-auto my-0'>
          <div className='px-4'>
            <div className='w-full bg-gray-300 h-px'/>
          </div>

          {/* Navigation */}
          <div className='w-full flex px-4 text-gray-500'>
            <h2 onClick={() => setCurrentView("Inventory")} className={`${currentView == "Inventory" ? "text-blue-500 border-b" : ""} py-4 hover:border-b hover:text-blue-500 cursor-pointer`}>Inventory</h2>
            <h2 onClick={() => setCurrentView("Employees")} className={`${currentView == "Employees" ? "text-blue-500 border-b" : ""} mx-4 py-4 hover:border-b hover:text-blue-500 cursor-pointer`}>Employees</h2>
            <h2 onClick={() => setCurrentView("Records")} className={`${currentView == "Records" ? "text-blue-500 border-b" : ""} py-4 hover:border-b hover:text-blue-500 cursor-pointer`}>Records</h2>
          </div>
        </section>
        <section className='w-full min-h-[calc(100dvh-122px)] bg-gray-100'>
          <div className='px-4'>
              <div className='w-full bg-gray-300 h-px'/>
          </div>

          {/* Inventory Content */}
          <div className={`max-w-240 mx-auto my-0 p-4 ${currentView == "Inventory" ? "" : "hidden"}`}>
            <div className='w-full bg-white p-4 rounded-md border-gray-300 border'>

              {/* Filters */}
              <input placeholder='Search for tools' className='border-gray-300 border rounded-md focus:outline-blue-500 p-1 lg:w-2/3 lg:mb-0 md:w-full md:mb-3 sm:w-full sm:mb-3' type="text"/>

              <select className='border-gray-300 border rounded-md p-1 lg:w-1/6 md:w-1/2 sm:w-full focus:outline-none lg:mb-0 md:mb-3 sm:mb-3' name="Category" id="">
                <option value="">All Categories</option>
                <option value="">Test</option>
                <option value="">Test</option>
              </select>

              <select className='border-gray-300 border rounded-md p-1 lg:w-1/6 md:w-1/2 sm:w-full focus:outline-none' name="Category" id="">
                <option value="">All Statuses</option>
                <option value="">Available</option>
                <option value="">Checked Out</option>
              </select>
            </div>

            {/* Tools */}
            <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 mt-4 '>
              {data?.tools.map((tool: Tool) => (
                <ToolElement key={tool.toolId} toolId={tool.toolId} toolName={tool.toolName} category={tool.category} toolStatus={tool.toolStatus}/>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default App
