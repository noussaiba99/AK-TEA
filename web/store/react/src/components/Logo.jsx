import React from 'react';
import {Link} from "react-router-dom";

class Logo extends React.Component {

	render() {
		return (
			<Link to="/" className="logo_link">	
			
			{/*<div className="logo-main">
					<img src="/static/img/logo.png"/>
			</div>*/}

				<div className="logo">
					
					<span className="logo_part1">AK </span>
					<span className="logo_part2">TEA</span>
				</div>
			</Link>
		);
	}
}

export default Logo;
