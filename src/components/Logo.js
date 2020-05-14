import React from 'react';
import Tilt from 'react-tilt'
import Calum from './calum.jpg'


const Logo = () => {
	return(
		<div className='ma4 mt0'>
		   <div className='Tilt-inner pa3'>
			<Tilt className="Tilt br2 shadow-2" options={{ max : 75 }} style={{ height: 250, width: 250 }} >
 				<div className="Tilt-inner"> <img src={Calum} alt={"Logo"}/> 
 			</div>
		   </Tilt>
		   </div>
		</div>
		);
}
export default Logo;