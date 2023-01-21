import React from "react";
import { Context } from "../../App";
import { 
	MdClose,
	MdKeyboardArrowLeft,
	MdKeyboardArrowRight
} from 'react-icons/md';
import { 
	RxReset
} from 'react-icons/rx';
import { useNavigate } from "react-router";

const Header = () => {

	const navigate = useNavigate()

	const {
		selectedDay,
		setSelectedDay,
		selectedUser,
		setSelectedUser,
		year,
		setYear,
		month,
		setMonth,

		dateItems,
		items,
		setItems
	} = React.useContext(Context)

	const listRecord = () => {
		if (selectedDay) {
			const selectedDayKeys = Object.keys(selectedDay)
			return items[selectedDayKeys[0]][selectedDay[selectedDayKeys[0]].format('DD/MM/YYYY')]
		}
	}

	const showDate = () => {
		if (selectedDay) {
			const selectedDayKeys = Object.keys(selectedDay)
			return selectedDay[selectedDayKeys[0]].format('DD/MM/YYYY')
		}
	}
	
	return (
		<header
			style={{
				borderBottom: '1px solid lightgray',
				position: 'fixed',
				top: 0,
				left: 0,
				zIndex: 1,
				width: '100%',
				background: 'white'
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
						{showDate()}
					</span>
					<div
						style={{
							flex: 1,
							overflowY: 'auto',
							display: 'flex'
						}}
					>
						{(listRecord() || []).map((user, i) => (
							<div 
								key={i}
								style={{
									paddingLeft: '7px',
									margin: '3px',
									background: user.color,
									borderRadius: '5px',
									color: 'white',
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									border: '1px solid white',
								}}
							>
								<span
									style={{
										overflow: 'hidden',
										display: 'block',
										whiteSpace: 'nowrap',
										textOverflow: 'ellipsis',
									}}
								>
									{user.name}
								</span>
								<MdClose
									onClick={() => {
										const selectedDayKeys = Object.keys(selectedDay)
										const date = selectedDay[selectedDayKeys[0]].format('DD/MM/YYYY')
										const list = items[selectedDayKeys[0]][date]
										setItems({
											...items,
											[selectedDayKeys[0]]: {
												...items[selectedDayKeys[0]],
												[date]: list.filter((l, j) => j !== i && l)
											}
										})
									}}
									style={{
										padding: 7,
									}}
								/>
							</div>
						))}
					</div>
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
						alignItems: 'center',
						position: 'relative'
					}}
				>
					<RxReset 
						style={{
							fontSize: 20,
							padding: "7px",
							position: 'absolute',
							left: 0,
							top: 0
						}}
						onClick={() => {
							navigate('/clear')
						}}
					/>
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