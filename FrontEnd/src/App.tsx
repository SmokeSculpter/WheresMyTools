import './App.css'

import type { DataList } from './Utilities/interfaces'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToolbox } from '@fortawesome/free-solid-svg-icons';

import { useState, createContext } from 'react'

import EmployeeToolsView from './components/EmployeeTools';
import RecordsView from './components/RecordsView'
import Tools from './components/Tools';

export const DataContext = createContext<{ allData: DataList | undefined, setAllData: React.Dispatch<React.SetStateAction<DataList | undefined>> | undefined }>({ allData: undefined, setAllData: undefined });

function App() {
  const [allData, setAllData] = useState<DataList | undefined>(undefined);
  const [currentView, setCurrentView] = useState<string>("Inventory");

  return (
    <>
      <DataContext.Provider value={{ allData, setAllData }}>
        {/* Header */}
        <header className='max-w-240 mx-auto my-0 p-4 flex items-center text-blue-500'>
          <FontAwesomeIcon icon={faToolbox} size='xl'/>
          <h1 className='text-2xl font-medium px-2'>Where's My Tools?!</h1>
        </header>

        <main>
          <section className='max-w-240 mx-auto my-0'>
            <div className='px-4'>
              <div className='w-full bg-gray-300 h-px'/>
            </div>

            {/* Navigation */}
            <div className='w-full flex px-4 text-gray-500'>
              <h2 onClick={() => setCurrentView("Inventory")} className={`${currentView == "Inventory" ? "text-blue-500 border-b" : ""} py-4 hover:border-b hover:text-blue-500 cursor-pointer`}>Inventory</h2>
              <h2 onClick={() => setCurrentView("Check In")} className={`${currentView == "Check In" ? "text-blue-500 border-b" : ""} mx-4 py-4 hover:border-b hover:text-blue-500 cursor-pointer`}>Check In</h2>
              <h2 onClick={() => setCurrentView("Records")} className={`${currentView == "Records" ? "text-blue-500 border-b" : ""} py-4 hover:border-b hover:text-blue-500 cursor-pointer`}>Records</h2>
            </div>
          </section>
          <section className='w-full min-h-[calc(100dvh-122px)] bg-gray-100'>
            <div className='px-4'>
                <div className='w-full bg-gray-300 h-px'/>
            </div>
            <div className={`max-w-240 mx-auto my-0 p-4 ${currentView == "Inventory" ? "" : "hidden"}`}>
              <Tools/>
            </div>
            <div className={`max-w-240 mx-auto my-0 p-4 ${currentView == "Check In" ? "" : "hidden"}`}>
                {currentView == "Check In" ? <EmployeeToolsView/> : ""}
            </div>
            <div className={`max-w-240 mx-auto my-0 p-4 ${currentView == "Records" ? "" : "hidden"}`}>
                <RecordsView />
            </div>
          </section>
        </main>
      </DataContext.Provider>
    </>
  )
}

export default App
