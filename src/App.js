import React from 'react'
import Setup from './view/setup';
import Main from './view/main';

import { Routes, Route, Navigate } from "react-router-dom";

export const Context = React.createContext()

const App = () => {

  return (
    <Routes>
      <Route path="setup" element={<Setup />} />
      <Route path="main" element={<Main />} />
      <Route path="clear" element={React.createElement(() => {
        window.localStorage.clear()
        return (
          <Navigate to="/setup" replace />
        )
      })} />
      <Route path="/" exact element={React.createElement(() => {
        const users = window.localStorage.getItem('users')
        const items = window.localStorage.getItem('items')
        const dateItems = window.localStorage.getItem('dateItems')
        return !users && !items && !dateItems ? (
          <Navigate to="/setup" replace />
        ) : (
          <Navigate to="/main" replace />
        )
      })} />
    </Routes>
  )
}

export default App;
