import React from "react";
import { 
	MdAdd,
	MdClose 
} from 'react-icons/md';
import { Context } from "../../../App";
import { v4 as uuidv4 } from 'uuid';

const New = () => {

	const {
		setSelectedUser,
		users,
		setUsers,
		dateItems,
	} = React.useContext(Context)

	const [open, setOpen] = React.useState(false)
	const submitRef = React.useRef()

	const handleOnSaveNewUser = (e) => {
		e.preventDefault()

		const elements = e.target.elements
		const name = elements['name'].value
		const color = elements['color'].value

		const newUser = {
			id: uuidv4(),
			name,
			color
		}

		dateItems.forEach(element => {
			const name = element.name
			newUser[name] = parseInt(elements[name].value)
		});

		setUsers([...users, newUser])
		setOpen(false)
	}

	return (
		<div
			style={{
				// minHeight: '125px',
				display: 'flex'
			}}
			onClick={(e) => {
				// e.stopPropagation()
				setSelectedUser(null)
				setOpen(true)
			}}
		>
			<MdAdd
				style={{
					fontSize: '25px',
					padding: 10,
				}}
			/>

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
							padding: 0
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
								Yeni Kullanici
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
						<form
							style={{
								display: 'flex',
								flexDirection: 'column',
							}}
							onSubmit={handleOnSaveNewUser}
						>
							<label 
								style={{ 
									margin: 7, 
									marginBottom: 0 
								}} 
								htmlFor="name"
							>
								Adi:
							</label>
							<input 
								style={{ 
									margin: 7 
								}} 
								type="text" 
								id="name" 
								name="name" 
								required
								autoFocus
							/>
							{dateItems && dateItems.length > 0 && dateItems.map((dt, i) => {
								const name = dt.name
								return (
									<React.Fragment key={i}>
										<label 
											style={{ 
												margin: 7, 
												marginBottom: 0 
											}} 
											htmlFor={name}
										>
											{dt.name}:
										</label>
										<input 
											style={{ 
												margin: 7,
												marginBottom: 0 

											}} 
											type="number" 
											id={name} 
											name={name} 
											required
										/>
										{/* <p
											style={{ 
												margin: 7,
												color: 'gray'
											}}
											onClick={() => {
												alert(2)
											}}
										>
											Kosul eklemek icin tiklayiniz
										</p> */}
									</React.Fragment>
								)
							})}
							<label 
								style={{ 
									margin: 7, 
									marginBottom: 0 
								}} 
								htmlFor="floor"
							>
								Renk:
							</label>
							<input 
								style={{ 
									margin: 7
								}} 
								type="color" 
								id="color" 
								name="color" 
								defaultValue={`#${Math.floor(Math.random()*16777215).toString(16)}`}
								required
							/>
							<button 
								type='button'
								style={{ 
									padding: "15px 0px",
									marginTop: 5,
									textAlign: 'center',
									border: 'none',
									background: 'none'
								}} 
								onClick={(e) => {
									e.stopPropagation()
									if(submitRef.current) {
										submitRef.current.click()
									}
								}}
							>
								Kaydet
								<input 
									ref={submitRef}
									hidden
									type='submit'
								/>
							</button>
						</form> 
					</dialog>
				</div>
			)}
		</div>
	)
}

export default New