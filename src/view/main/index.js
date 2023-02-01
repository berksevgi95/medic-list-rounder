import React from "react";

import Calendar from '../../components/calendar';
import Header from '../../components/header';
import Footer from '../../components/footer';
import moment from 'moment';
import { Context } from "../../App";

const Main = () => {

	const dateItems = JSON.parse(window.localStorage.getItem('dateItems')) || []

	const [users, _setUsers] = React.useState(
		window.localStorage.getItem('users') ? 
			JSON.parse(window.localStorage.getItem('users')) :
			[]
	)

	const [items, _setItems] = React.useState(
		window.localStorage.getItem('items') ? 
			JSON.parse(window.localStorage.getItem('items')) :
			{}
	)

	const [conditions, _setConditions] = React.useState(
		window.localStorage.getItem('conditions') ? 
			JSON.parse(window.localStorage.getItem('conditions')) :
			{}
	)

	const [selectedUser, setSelectedUser] = React.useState(null)
	const [selectedDay, setSelectedDay] = React.useState(null)

	const [month, setMonth] = React.useState(moment().format("M"))
	const [year, setYear] = React.useState(moment().format("Y"))

	React.useEffect(() => {
		if (Object.keys(items).length === 0) {
			let obj = {}
			dateItems.forEach(item => {
				obj[item.name] = {}
			})
			setItems(obj)
		}
	}, [])

	const handleOnDaySelect = (value) => {
		if (selectedUser) {
			const key = Object.keys(value)[0]
			const date = value[key]
			const dateStr = date.format('DD/MM/YYYY')

			if (parseInt(selectedUser[key]) - calculateRemaining(selectedUser, key) === 0) {
				alert(`${selectedUser.name} daha fazla ${key} tutamaz`)
				return;
			}

			const controlDayStr = moment(date).format('DD/MM/YYYY')
			const controlDayStrOneBefore = moment(date).subtract(1, 'days').format('DD/MM/YYYY')
			const controlDayStrTwoBefore = moment(date).subtract(2, 'days').format('DD/MM/YYYY')
			const controlDayStrOneAfter = moment(date).add(1, 'days').format('DD/MM/YYYY')
			const controlDayStrTwoAfter = moment(date).add(2, 'days').format('DD/MM/YYYY')

			const controlItems = (items[key][controlDayStr] || []).filter(u => {
				return u.id === selectedUser.id
			})
			const controlOneDayBeforeItems = (items[key][controlDayStrOneBefore] || []).filter(u => {
				return u.id === selectedUser.id
			})
			const controlTwoDayBeforeItems = (items[key][controlDayStrTwoBefore] || []).filter(u => {
				return u.id === selectedUser.id
			})
			const controlOneDayAfterItems = (items[key][controlDayStrOneAfter] || []).filter(u => {
				return u.id === selectedUser.id
			})
			const controlTwoDayAfterItems = (items[key][controlDayStrTwoAfter] || []).filter(u => {
				return u.id === selectedUser.id
			})

			if(controlItems.length > 0 || 
				controlOneDayBeforeItems.length > 0 || 
				controlTwoDayBeforeItems.length > 0 || 
				controlOneDayAfterItems.length > 0 || 
				controlTwoDayAfterItems.length > 0
			) {
				alert(`${selectedUser.name} kullanicisinin bu tarihte nobeti olamaz`)
			} else if (conditions[selectedUser.name] && 
				conditions[selectedUser.name][key] &&
				conditions[selectedUser.name][key].find(d => moment(d).isSame(date))
			) {
				alert(`${selectedUser.name} kullanicisi bu tarihte musait degil`)
			} else {
				setItems({
					...items,
					[key]: {
						...items[key],
						[dateStr]: [...(items[key][dateStr] || []), selectedUser]
					}
				})
			}
			// setSelectedUser(null)
		} else {
			setSelectedDay(value)
		}
	}

	const setItems = (items) => {
		_setItems(items)
		window.localStorage.setItem('items', JSON.stringify(items))
	}

	const setUsers = (users) => {
		_setUsers(users)
		window.localStorage.setItem('users', JSON.stringify(users))
	}

	const setConditions = (conditions) => {
		_setConditions(conditions)
		window.localStorage.setItem('conditions', JSON.stringify(conditions))
	}

	const calculateRemaining = (user, dt) => {
		let count = 0;
		Object.keys(items[dt]).forEach(date => {
			count += items[dt][date].filter(u => u.id === user.id).length
		})
		return count
	}

	return (
		<main>
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
				setYear,

				dateItems,
				items,
				setItems,

				calculateRemaining,

				conditions,
				setConditions
			}}>
				<Header />
				<div
					style={{
						paddingTop: 35,
						paddingBottom: 130
					}}
				>
					<Calendar
						dateTemplate={dateItems}
						month={month}
						year={year}
						onDaySelected={handleOnDaySelect}
						selectedDay={selectedDay}
						items={items}
					/>
				</div>
				<Footer />
			</Context.Provider>
		</main>
	)
}

export default Main