import React from 'react';


const Rank = (props) => {
	return(
		<div className='white f1 middle'>
			<div className='white f3 '>
				{props.name} , your current entry count is...
			</div>
			{props.entries}
		</div>
	);
}

export default Rank;