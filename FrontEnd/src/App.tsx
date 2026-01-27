import './App.css'

import type { ToolsAndEmployees, Tool, DataList } from './Utilities/interfaces'
import { fetchDbData, fetchToolsAndEmployees } from './Utilities/fetchData';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToolbox } from '@fortawesome/free-solid-svg-icons';

import { useEffect, useState, useMemo, createContext } from 'react'

import ToolElement from './components/ToolElement';
import EmployeeToolsView from './components/EmployeeTools';
import RecordsView from './components/RecordsView';

export const DataContext = createContext<{ allData: DataList | undefined, setAllData: React.Dispatch<React.SetStateAction<DataList | undefined>> | undefined }>({ allData: undefined, setAllData: undefined });

function App() {
  const [allData, setAllData] = useState<DataList | undefined>(undefined);
  const [data, setData] = useState<ToolsAndEmployees>();
  const [currentView, setCurrentView] = useState<string>("Inventory");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [status, setStatus] = useState("All Statuses");


  useEffect(() => {
    fetchToolsAndEmployees(setData);
    fetchDbData(allData, setAllData, "Tools And Employees");
  }, []);

  const filteredTools = useMemo(() => {
  if (!data) return [];

  return allData?.toolsAndEmployees?.tools.filter(tool => {
    const matchesSearch =
      tool.toolName.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All Categories" || tool.category === category;

    const matchesStatus =
      status === "All Statuses" || (!tool.toolStatus && status == "Checked Out") || (tool.toolStatus && status == "Available");

    return matchesSearch && matchesCategory && matchesStatus;
  });
}, [data, search, category, status]);


  const getCategories = (data: ToolsAndEmployees) => {
    let categories: string[] = ["All Categories"];

    for(let index = 0; index < data.tools.length; index++){
      if(!categories.includes(data.tools[index].category)){
        categories.push(data.tools[index].category);
      }
    }

    return categories;
  }

  return (
    <>
      <DataContext.Provider value={{ allData, setAllData }}>
        {/* Header */}
        <header className='max-w-240 mx-auto my-0 p-4 flex items-center text-blue-500'>
          <FontAwesomeIcon icon={faToolbox} size='xl'/>
          <h1 onClick={() => console.log(allData)} className='text-2xl font-medium px-2'>Tool Inventory System</h1>
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

            {/* Inventory Content */}
            <div className={`max-w-240 mx-auto my-0 p-4 ${currentView == "Inventory" ? "" : "hidden"}`}>
              <div className='w-full bg-white p-4 rounded-md border-gray-300 border'>

                {/* Filters */}
                <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder='Search for tools' className='border-gray-300 border rounded-md focus:outline-blue-500 p-1 lg:w-2/3 lg:mb-0 md:w-full md:mb-3 sm:w-full sm:mb-3' type="text"/>

                <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className='border-gray-300 border rounded-md p-1 lg:w-1/6 md:w-1/2 sm:w-full focus:outline-none lg:mb-0 md:mb-3 sm:mb-3' name="Category" id="">
                    {allData?.toolsAndEmployees != undefined ? getCategories(allData?.toolsAndEmployees).map((category: string) => {
                      return (
                        <option key={category} value={category}>{category}</option>
                      )
                    }): <option>Loading...</option>}
                </select>

                <select
                value={status}
                onChange={e => setStatus(e.target.value)}
                className='border-gray-300 border rounded-md p-1 lg:w-1/6 md:w-1/2 sm:w-full focus:outline-none' name="Category" id="">
                  <option value="All Statuses">All Statuses</option>
                  <option value="Available">Available</option>
                  <option value="Checked Out">Checked Out</option>
                </select>
              </div>

              {/* Tools */}
              <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 mt-4 '>
                {filteredTools?.map((tool: Tool) => (
                  <ToolElement key={tool.toolId} toolId={tool.toolId} toolName={tool.toolName} category={tool.category} toolStatus={tool.toolStatus} employees={data?.employees} />
                ))}
              </div>
            </div>

            <div className={`max-w-240 mx-auto my-0 p-4 ${currentView == "Check In" ? "" : "hidden"}`}>
                <EmployeeToolsView />
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
