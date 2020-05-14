import React from 'react';
import './FaceReconition.css';

const FaceReconition = (props) => {
	return(
		<div className='center ma  mt2'>
		<div className='absolute'>
				<img id='inputImage'src={props.imageUrl} width='500px' height='auto' alt='' />
				<div className='bounding-box' style={{left: props.box.leftCol, top: props.box.topRow, right: props.box.rightCol, bottom: props.box.bottomRow }} ></div>
			</div>
		</div>
	);
}

export default FaceReconition;