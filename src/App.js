import React from 'react'
import './App.css';
import Calendar from './components/calendar';
import Header from './components/header';
import Nav from './components/footer';
import moment from 'moment';

export const Context = React.createContext()

const App = () => {

  const [users, setUsers] = React.useState([
    // {
    //   id: 1,
    //   name: "civildek",
    //   color: 'green',
    //   pol: 2,
    //   currentPol: 2,
    //   floor: 2,
    //   currentFloor: 2,
    // }, {
    //   id: 2,
    //   name: "slm",
    //   color: 'green',
    //   pol: 2,
    //   currentPol: 2,
    //   floor: 2,
    //   currentFloor: 2,
    // }
  ])

  console.log(users)

  const [selectedUser, setSelectedUser] = React.useState(null)
  const [selectedDay, setSelectedDay] = React.useState(null)

  const [month, setMonth] = React.useState(moment().format("M"))
  const [year, setYear] = React.useState(moment().format("Y"))

  return (
    <Context.Provider value={{
      users, 
      setUsers,
      selectedUser,
      setSelectedUser,
      selectedDay,
      setSelectedDay,
      month,
      setMonth,
      year,
      setYear
    }}>
      <Header />
      <Calendar 
        month={month}
        year={year}
        onDaySelected={(value) => {
          setSelectedDay(value)
        }}
        selectedDay={selectedDay}
      />
      <Nav />
    </Context.Provider> 
  );
}

export default App;
