import moment from "moment";
import React from "react";


const Calendar = ({
	month,
	year,
	onDaySelected,
	selectedDay
}) => {

	const [momentObj, setMomentObj] = React.useState(moment(`${year}-${month}`, "YYYY-MM"))

	React.useEffect(() => {
		setMomentObj(moment(`${year}-${month}`, "YYYY-MM"))
	}, [year, month])

	const renderHeader = () => {
		return ['Pzt', 'Sal', 'Car', 'Per', 'Cum', 'Cmrt', 'Pzr'].map((date, i) => (
			<div
				key={i}
				style={{
					width: `calc(100% / 7)`,
					float: "left",
					padding: '20px 0px'
				}}
			>
				{date}
			</div>
		))
	}

	const renderOffsetDays = () => {
		const startOfMonth = momentObj.startOf('month').day() - 1
		return new Array(startOfMonth < 0 ? 6 : startOfMonth).fill(null).map((_, i) => (
			<div
				key={i}
				style={{
					width: `calc(100% / 7)`,
					height: 100,
					float: "left"
				}}
			>
			</div>
		))
	}

	const renderDays = () => {
		const days = new Array(momentObj.daysInMonth())
			.fill(null)
			.map((_, day) => moment(`${momentObj.format("Y")}-${momentObj.format("M")}-${day + 1}`, "YYYY-MM-DD"))

		return days.map((day, i) => {

			const floorSelected = selectedDay && selectedDay.floor && selectedDay.floor.isSame(day)
			const polSelected = selectedDay && selectedDay.pol && selectedDay.pol.isSame(day)

			return (
				<div
					key={i}
					style={{
						width: `calc(100% / 7)`,
						height: 100,
						float: "left",
						position: 'relative',
						display: 'flex',
						flexDirection: 'column'
					}}
				>
					<h3
						style={{
							position: 'absolute',
							left: 0,
							top: 0,
							margin: 0,
							padding: 0
						}}
					>
						{day.date()}
					</h3>
					<div
						style={{
							flex: 1,
							textAlign: 'center',
							background: 'grey',
							border: `2px solid ${floorSelected ? "black" : 'grey'}`
						}}
						onClick={() => {
							if (onDaySelected) {
								// onDaySelected(floorSelected ? null : {
								// 	floor: day,
								// 	pol: null,
								// })

								onDaySelected({
									floor: day,
									pol: null,
								})
							}
						}}
					>
	
					</div>
					<div
						style={{
							flex: 1,
							textAlign: 'center',
							background: 'lightgrey',
							border: `2px solid ${polSelected ? "black" : 'lightgrey'}`
						}}
						onClick={() => {
							if (onDaySelected) {
								// onDaySelected(polSelected ? null : {
								// 	floor: null,
								// 	pol: day,
								// })

								onDaySelected({
									floor: null,
									pol: day,
								})
							}
						}}
					>
	
					</div>
				</div>
			)
		})
	}

	return (
		<section
			style={{
				flex: 1,
				overflow: 'auto',
				position: 'relative'
			}}
		>
			{renderHeader()}
			{renderOffsetDays()}
			{renderDays()}
		</section>
	)
}

export default Calendar;