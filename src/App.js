import React from 'react'
import './App.css';
import Calendar from './components/calendar';
import Header from './components/header';
import Nav from './components/footer';
import moment from 'moment';

export const Context = React.createContext()

const App = () => {

  const [users, setUsers] = React.useState([])
  const [polItems, setPolItems] = React.useState({})
  const [floorItems, setFloorItems] = React.useState({})

  const [selectedUser, setSelectedUser] = React.useState(null)
  const [selectedDay, setSelectedDay] = React.useState(null)

  const [month, setMonth] = React.useState(moment().format("M"))
  const [year, setYear] = React.useState(moment().format("Y"))

	const remainingFloor = (user) => {
		let count = 0
		Object.keys(floorItems).forEach(date => {
			count += floorItems[date].filter(u => u.id === user.id).length
		})
		return user.floor - count
	}

	const remainingPol = (user) => {
		let count = 0
		Object.keys(polItems).forEach(date => {
			count += polItems[date].filter(u => u.id === user.id).length
		})
		return user.pol - count
	}

  const handleOnDaySelect = (value) => {
    if (selectedUser) {
      if (value && value.floor && remainingFloor(selectedUser) > 0) {
        const date = value.floor.format('DD/MM/YYYY')
        setFloorItems({
          ...floorItems,
          [date]: [...(floorItems[date] || []), selectedUser]
        })
      } else if (value && value.pol && remainingPol(selectedUser) > 0) {
        const date = value.pol.format('DD/MM/YYYY')
        setPolItems({
          ...polItems,
          [date]: [...(polItems[date] || []), selectedUser]
        })
      }
      setSelectedUser(null)
    } else {
      setSelectedDay(value)
    }
  }

  return (
    <Context.Provider value={{
      users, 
      setUsers,
      selectedUser,
      setSelectedUser,
      selectedDay,
      setSelectedDay,
      polItems,
      setPolItems,
      floorItems,
      setFloorItems,
      month,
      setMonth,
      year,
      setYear,

      remainingFloor,
      remainingPol,
    }}>
      <Header />
      <Calendar 
        month={month}
        year={year}
        onDaySelected={handleOnDaySelect}
        selectedDay={selectedDay}
        items={{
          floor: floorItems,
          pol: polItems
        }}
      />
      <Nav />
    </Context.Provider> 
  );
}

export default App;
