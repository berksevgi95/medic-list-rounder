import React from 'react'
import { MdAdd, MdRemove } from 'react-icons/md'
import { useNavigate } from "react-router-dom";

const Setup = () => {

	const [typeCount, setTypeCount] = React.useState(1)

	const navigate = useNavigate()

	return (
		<form 
			style={{
				paddingLeft: '20px',
				paddingRight: '20px',
			}}
			onSubmit={(e) => {
				e.preventDefault()
				const values = Object.keys(e.target.elements)
					.filter(e => e.includes('typeName') || e.includes('typeColor'))
					.map(k => e.target.elements[k].value)

				const valueMap = values.map((v, i) => {
					if (i % 2 === 0) {
						return {
							name: v,
							color: values[i + 1]
						}
					}
				}).filter(v => v)

				window.localStorage.setItem('dateItems', JSON.stringify(valueMap))
				navigate('/main')
			}}
		>
			<h1>
				Kurulum
			</h1>
			<div style={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
			}}>
				<label htmlFor="cars">
					Nobet turu sayisi:
				</label>
				<div
					style={{
						display: 'flex',
						alignItems: 'center'
					}}
				>
					<button
						style={{
							display: 'flex'
						}}
						type='button'
						disabled={typeCount === 1}
						onClick={(e) => {
							setTypeCount(typeCount - 1)
						}}
					>
						<MdRemove style={{ margin: 'auto' }}/>
					</button>
					<p style={{ padding: '0px 15px' }}>
						{typeCount}
					</p>
					<button
						style={{
							display: 'flex'
						}}
						type='button'
						disabled={typeCount === 5}
						onClick={(e) => {
							setTypeCount(typeCount + 1)
						}}
					>
						<MdAdd style={{ margin: 'auto' }}/>
					</button>
				</div>
			</div>


			<table
				style={{
					marginTop: '25px',
					width: '100%'
				}}
			>
				<thead>
					<tr style={{ textAlign: 'left' }}>
						<th style={{ width: '50px' }}>#</th>
						<th>Tür adi</th>
						<th>Renk</th>
					</tr>
				</thead>
				<tbody>
					{typeCount > 0 && new Array(typeCount).fill(null).map((_, i) => {
						return (
							<tr key={i}>
								<td>1</td>
								<td>
									<input
										style={{
											width: '150px',
											boxSizing: 'border-box'
										}}
										required
										name={"typeName" + i}
									/>
								</td>
								<td style={{ width: '50px' }}>
									<input
										style={{
											boxSizing: 'border-box',
											width: '100%'
										}}
										type='color'
										required
										name={"typeColor" + i}
										defaultValue={`#${Math.floor(Math.random()*16777215).toString(16)}`}
									/>
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>

			<button 
				type='submit'
				style={{
					float: 'right',
					marginTop: '25px'
				}}
				disabled={typeCount === 0}
			>
				Kaydet
			</button>
		</form>
	)
}

export default Setup;
