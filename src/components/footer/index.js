import React from "react"
import { 
	MdClose 
} from 'react-icons/md';
import { Context } from "../../App";
import New from "./new";

const Footer = ({ dateTemplate }) => {

	const {
		setSelectedDay,
		selectedUser,
		setSelectedUser,
		users,
		setUsers,

		dateItems,
		items,
		setItems,

		calculateRemaining
	} = React.useContext(Context)

	const handleDeleteUser = (user) => (e) => {
		e.stopPropagation()
		if (window.confirm('Silmek istediginden emin misin?')) {

			const _items = {...items}

			Object.keys(_items).forEach((key, i) => {
				Object.keys(_items[key]).forEach(date => {
					_items[key][date] = _items[key][date].filter(u => u.id !== user.id)
				})
			})

			setItems(_items)
			setUsers(users.filter(u => user.id !== u.id))
			setSelectedUser(null)
		}
	}

	return (
		<footer
			onClick={() => {
				setSelectedUser(null)
				setSelectedDay(null)
			}}
			style={{
				display: 'flex',
				borderTop: '1px solid lightgray',
				position: 'fixed',
				bottom: 0,
				left: 0,
				width: '100%',
				background: 'white',
				zIndex: 1
			}}
		>
			<div
				style={{
					height: 100,
					flex: 1,
					padding: '7px',
					overflow: 'scroll'
				}}
			>
				{users && users.length > 0 ? users.map((user, i) => {
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
							}}
							onClick={(e) => {
								e.stopPropagation()
								setSelectedUser(user)
								setSelectedDay(null)
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
								{dateItems && dateItems.length > 0 && dateItems.map((dt, i) => {
									return (
										<span key={i}>
											{parseInt(user[dt.name]) - calculateRemaining(user, dt.name)}
										</span>
									)
								})}
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
					<span style={{ color: 'grey' }}>
						Kisi eklemek icin yandaki arti butonuna bas
					</span>
				)}
			</div>
			<div
				style={{
					margin: 3,
					marginRight: 7,
					padding: 2,
					position: 'absolute',
					bottom: '100%',
					right: 0,
					fontSize: 7
				}}
			>
				{dateItems && dateItems.length > 0 && dateItems.map((dt, i) => (
					<div
						key={i}
						style={{
							display: 'flex',
							alignItems: 'center'
						}}
					>
						<div 
							style={{
								width: 5,
								height: 5,
								background: dt.color,
								marginRight: 2,
								border: '1px solid black'
							}}
						/>
						<span>{dt.name}</span>
					</div>
				))}
			</div>
			<New />
		</footer>
	)
}

export default Footer;
