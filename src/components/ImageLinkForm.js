import React from 'react';


const ImageLinkForm = (props) => {
	return(
		<div className='f3 '>
				<p className='center f3 Code'>
					{'This program will detect faces. Give it the URL of a Photo!'}
				</p>
				<div className='center '>
					<div className='center w-50 pa3 br1 shadow-5 coolBg'>
						<input className='f4 pa2 w-70 center' type='text' onChange={props.onInputChange} />
						<button onClick={props.onSubmit} className='w-30 grow f4 link ph3 pv2 dib bg-light-purple' >Detect</button>
					</div>
				</div>
			</div>
	);
}

export default ImageLinkForm;