import React from "react"
import { 
	MdClose 
} from 'react-icons/md';
import { Context } from "../../App";
import New from "./new";

const Footer = () => {

	const {
		selectedDay,
		setSelectedDay,
		selectedUser,
		setSelectedUser,
		users,
		setUsers
	} = React.useContext(Context)

	const handleDeleteUser = (user) => (e) => {
		e.stopPropagation()
		if (window.confirm('Silmek istediginden emin misin?')) {
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
				{users.map((user, i) => (
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
							opacity: (user.floor - user.currentFloor.length === 0 && user.pol - user.currentPol.length === 0) && .5
						}}
						onClick={(e) => {
							e.stopPropagation()
							setSelectedUser(user)
						}}
					>
						<span
							style={{
								textDecoration: (user.floor - user.currentFloor.length === 0 && user.pol - user.currentPol.length === 0) && 'line-through'
							}}
						>
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
								{user.floor - user.currentFloor.length}
							</span>
							<span>
								{user.pol - user.currentPol.length}
							</span>
						</div>
						<MdClose 
							onClick={handleDeleteUser(user)}
							style={{
								padding: 7,
							}}
						/>
					</div>
				))}
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
							background: 'grey',
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
