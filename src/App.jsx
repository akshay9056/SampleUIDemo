import React from 'react'
import "./index.css";
import Header from './component/Header';

import VPI_PARENT from "./component/VPI/VPI_PARENT"
import { Outlet } from 'react-router-dom';
function App() {
  return (
   <>
   <Header/>
   <Outlet/>

   </> 
  )
}

export default App