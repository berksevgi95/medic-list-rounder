import React from "react";
import { Context } from "../../App";
import { 
	MdClose,
	MdKeyboardArrowLeft,
	MdKeyboardArrowRight
} from 'react-icons/md';

const Header = () => {

	const {
		selectedDay,
		setSelectedDay,
		selectedUser,
		setSelectedUser,
		year,
		setYear,
		month,
		setMonth
	} = React.useContext(Context)

	return (
		<header
			style={{
				borderBottom: '1px solid lightgray'
			}}
		>
			{selectedDay ? (
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center'
					}}
				>
					<span
						style={{
							padding: "7px",
						}}
					>
						{selectedDay.floor ? 
							selectedDay.floor.format('DD/MM/YYYY') : 
						selectedDay.pol ? 
							selectedDay.pol.format('DD/MM/YYYY') : 
						''}
					</span>
					<MdClose
						style={{
							fontSize: 20,
							padding: "7px",
						}}
						onClick={(e) => {
							e.stopPropagation()
							setSelectedDay(null)
						}}
					/>
				</div>
			) : selectedUser ? (
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center'
					}}
				>
					<span
						style={{
							padding: "7px",
						}}
					>
						{selectedUser.name}
					</span>
					<MdClose
						style={{
							fontSize: 20,
							padding: "7px",
						}}
						onClick={(e) => {
							e.stopPropagation()
							setSelectedUser(null)
						}}
					/>
				</div>
			) : (
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<MdKeyboardArrowLeft 
						style={{
							fontSize: 20,
							padding: "7px",
						}}
						onClick={(e) => {
							const newMonth = parseInt(month) - 1
							if (newMonth === 0) {
								setYear(parseInt(year) - 1)
							}
							setMonth(newMonth === 0 ? 12 : newMonth)
						}}
					/>
					<div
						style={{
							display: 'flex'
						}}
					>
						<select
							value={month}
							style={{
								border: 'none',
								WebkitAppearance: 'none',
								textAlign: 'end'
							}}
							onChange={(e) => setMonth(parseInt(e.target.value))}
						>
							{new Array(12).fill(null).map((_, i) => i + 1).map(option => (
								<option
									key={option}
									value={option}
								>
									{option}
								</option>
							))}
						</select>
						<span
							style={{
								padding: '0px 2px'
							}}
						>
							/
						</span>
						<select
							value={year}
							style={{
								border: 'none',
								WebkitAppearance: 'none'
							}}
							onChange={(e) => setYear(parseInt(e.target.value))}
						>
							{new Array(60).fill(null).map((_, i) => i + 1970).map(option => (
								<option
									key={option}
									value={option}
								>
									{option}
								</option>
							))}
						</select>
					</div>
					<MdKeyboardArrowRight 
						style={{
							fontSize: 20,
							padding: "7px",
						}}
						onClick={(e) => {
							const newMonth = parseInt(month) + 1
							if (newMonth > 12) {
								setYear(parseInt(year) + 1)
							}
							setMonth(newMonth > 12 ? 1 : newMonth)
						}}
					/>
				</div>
			)}
		</header>
	)
}

export default Header;