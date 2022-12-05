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
		setUsers
	} = React.useContext(Context)

	const [open, setOpen] = React.useState(false)
	const submitRef = React.useRef()

	const handleOnSaveNewUser = (e) => {
		e.preventDefault()
		const [
			nameElem,
			polElem,
			floorElem,
			colorElem
		] = e.target.elements

		const name = nameElem.value
		const pol = polElem.value
		const floor = floorElem.value
		const color = colorElem.value

		setUsers([
			...users, {
				id: uuidv4(),
				name,
				pol: parseInt(pol),
				floor: parseInt(floor),
				color
			}
		])
		setOpen(false)
	}

	return (
		<React.Fragment>
			<div
				style={{
					minHeight: '125px',
					display: 'flex'
				}}
				onClick={(e) => {
					e.stopPropagation()
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
			</div>
			{open && (
				<dialog 
					open
					style={{
						background: 'white',
						width: "100%",
						position: 'fixed',
						zIndex: 2,
						boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
						border: 'none',
						top: '30%',
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
							onClick={() => {
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
						<label 
							style={{ 
								margin: 7, 
								marginBottom: 0 
							}} 
							htmlFor="pol"
						>
							Pol Nobeti:
						</label>
						<input 
							style={{ 
								margin: 7 
							}} 
							type="number" 
							id="pol" 
							name="pol" 
							required
						/>
						<label 
							style={{ 
								margin: 7, 
								marginBottom: 0 
							}} 
							htmlFor="floor"
						>
							Kat Nobeti:
						</label>
						<input 
							style={{ 
								margin: 7 
							}} 
							type="number" 
							id="floor" 
							name="floor" 
							required
						/>
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
						<div 
							style={{ 
								padding: "15px 7px",
								marginTop: 5,
								textAlign: 'center'
							}} 
							onClick={() => {
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
						</div>
					</form> 
				</dialog>
			)}
			{open && (
				<div
					style={{
						top: 0,
						left: 0,
						width: "100%",
						height: '100%',
						position: 'fixed',
						background: 'black',
						opacity: '.5',
						zIndex: 1
					}}
					onClick={() => {
						setOpen(false)
					}}
				/>
			)}
		</React.Fragment>
	)
}

export default New