import React from 'react'
import { MdClose } from 'react-icons/md'
import { Context } from '../../App'
import Calendar from '../calendar'

const Condition = ({ 
	roundType,
	currentConditions,
	onSave
}) => {

	const [open, setOpen] = React.useState(false)

	const {
		month,
		year,
	} = React.useContext(Context)

	const [tempConditions, setTempConditions] = React.useState({})

	React.useEffect(() => {
		if (open) {
			setTempConditions(currentConditions)
		}
	}, [open])

	return (
		<React.Fragment>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					margin: 7,
					color: 'gray'
				}}
				onClick={() => {
					setOpen(true)
				}}
			>
				<p style={{ margin: 0 }}>
					Kosul eklemek icin tiklayiniz
				</p>
				<p style={{ margin: 0 }}>
					{`(${(currentConditions[roundType] || []).length})`}
				</p>
			</div>
			
			{open && (
				<div
					style={{
						display: 'flex',
						top: 0,
						left: 0,
						width: "100%",
						height: '100%',
						position: 'fixed',
						background: '#00000077',
						zIndex: 5,
						alignItems: 'center'
					}}
				>
					<dialog 
						open
						style={{
							background: 'white',
							width: "100%",
							boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
							border: 'none',
							padding: 0,
							height: '85%',
							position: "relative"
						}}
					>
						<div
							style={{
								width: '100%',
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center'
							}}
						>
							<span
								style={{
									paddingLeft: 7
								}}
							>
								Yeni Kosul
							</span>
							<MdClose
								style={{
									fontSize: 20,
									padding: 7,
								}}
								onClick={(e) => {
									e.stopPropagation()
									setOpen(false)
								}}
							/>
						</div>
						<div
							style={{
								height: 'calc(100% - 80px)',
								width: '100%',
								overflow: 'auto'
							}}
						>
							<Calendar
								dateTemplate={[{
									name: roundType,
									color: 'lightgrey'
								}]}
								month={month}
								year={year}
								onDaySelected={(selectedDay) => {
									const day = selectedDay[roundType]
									if ((tempConditions[roundType] || []).find(d => d.isSame(day))) {
										setTempConditions({
											...tempConditions,
											[roundType]: tempConditions[roundType].filter(d => !d.isSame(day))
										})
									} else {
										setTempConditions({
											...tempConditions,
											[roundType]: [...(tempConditions[roundType] || []), day]
										})
									}
								}}
								selectedDay={tempConditions}
								items={{
									[roundType]: {}
								}}
							/>
						</div>
						<button
							type='button'
							style={{
								padding: "15px 0px",
								width: '100%',
								textAlign: 'center',
								border: 'none',
								background: 'none',
								position: 'absolute',
								bottom: 0
							}}
							onClick={(e) => {
								e.stopPropagation()
								if (onSave) {
									onSave(tempConditions)
									setOpen(false)
								}
							}}
						>
							Kaydet
						</button>
					</dialog>
				</div>
			)}
		</React.Fragment>
	)
}

export default Condition;