import React , {useState}from 'react'
import Sidebar from '../Layout/Sidebar'; 
import Header from "../Layout/Header"

const AppLayout = ({children}) => {
  const [isSidebarOpen , setIsSidebarOpen] = useState(false); 

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); 
  };
  return (
    <div className='flex min-h-screen bg-neutral-50 text-neutral-900 overflow-hidden'>
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className='flex-1 flex flex-col overflow-hidden' >
        <Header toggleSidebar={toggleSidebar} />
        <main className='mt-20 md:ml-64 h-[calc(100vh-4rem)] overflow-y-auto p-5 bg-neutral-50 pl-10'>
          {children}
        </main>
      </div>
    </div>
  )
}

export default AppLayout ; 