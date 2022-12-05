import React from "react"
import { 
	MdClose 
} from 'react-icons/md';
import { Context } from "../../App";
import New from "./new";

const Footer = () => {

	const {
		// selectedDay,
		polItems,
		setPolItems,
		floorItems,
		setFloorItems,
		setSelectedDay,
		selectedUser,
		setSelectedUser,
		users,
		setUsers,
		remainingFloor,
		remainingPol
	} = React.useContext(Context)

	const handleDeleteUser = (user) => (e) => {
		e.stopPropagation()
		if (window.confirm('Silmek istediginden emin misin?')) {
			setUsers(users.filter(u => user.id !== u.id))
			setSelectedUser(null)

			const newPolItems = {...polItems}
			Object.keys(polItems).forEach(day => {
				newPolItems[day] = newPolItems[day].filter(u => u.id !== user.id)
			})
			setPolItems(newPolItems)

			const newFloorItems = {...floorItems}
			Object.keys(floorItems).forEach(day => {
				newFloorItems[day] = newFloorItems[day].filter(u => u.id !== user.id)
			})
			setFloorItems(newFloorItems)
		}
	}

	// const remainingFloor = (user) => {
	// 	let count = 0
	// 	Object.keys(floorItems).forEach(date => {
	// 		count += floorItems[date].filter(u => u.id === user.id).length
	// 	})
	// 	return user.floor - count
	// }

	// const remainingPol = (user) => {
	// 	let count = 0
	// 	Object.keys(polItems).forEach(date => {
	// 		count += polItems[date].filter(u => u.id === user.id).length
	// 	})
	// 	return user.pol - count
	// }

	return (
		<footer
			onClick={() => {
				setSelectedUser(null)
				setSelectedDay(null)
			}}
			style={{
				display: 'flex',
				borderTop: '1px solid lightgray',
				position: 'relative'
			}}
		>
			<div
				style={{
					height: '100%',
					flex: 1,
					padding: '7px'
				}}
			>
				{users && users.length > 0 ? users.map((user, i) => {
					const disabled = remainingFloor(user) <= 0 && remainingPol(user) <= 0
					return (
						<div 
							key={i}
							style={{
								float: 'left',
								paddingLeft: '7px',
								margin: '3px',
								background: user.color,
								minWidth: 55,
								borderRadius: '5px',
								color: 'white',
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								boxShadow: selectedUser && selectedUser.id === user.id && '0 0 0 1px black',
								border: '1px solid white',
								opacity: disabled && .5
							}}
							onClick={(e) => {
								e.stopPropagation()
								if (!disabled) {
									setSelectedUser(user)
									setSelectedDay(null)
								}
							}}
						>
							<span>
								{user.name}
							</span>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									fontSize: 7,
									marginLeft: 3
								}}
							>
								<span>
									{remainingFloor(user)}
								</span>
								<span>
									{remainingPol(user)}
								</span>
							</div>
							<MdClose 
								onClick={handleDeleteUser(user)}
								style={{
									padding: 7,
								}}
							/>
						</div>
					)
				}) : (
					<span style={{
						color: 'grey'
					}}>
						Kisi eklemek icin yandaki arti butonuna bas
					</span>
				)}
			</div>
			<div
				style={{
					margin: 3,
					marginRight: 7,
					// background: "white",
					padding: 2,
					position: 'absolute',
					top: -30,
					right: 0,
					fontSize: 7
				}}
			>
				<div
					style={{
						display: 'flex',
						alignItems: 'center'
					}}
				>
					<div 
						style={{
							width: 5,
							height: 5,
							background: 'darkgrey',
							marginRight: 2,
							border: '1px solid black'
						}}
					/>
					<span>Kat</span>
				</div>
				<div
					style={{
						display: 'flex',
						alignItems: 'center'
					}}
				>
					<div 
						style={{
							width: 5,
							height: 5,
							background: 'lightgrey',
							marginRight: 2,
							border: '1px solid black'
						}}
					/>
					<span>Pol</span>
				</div>
			</div>
			<New />
		</footer>
	)
}

export default Footer;
