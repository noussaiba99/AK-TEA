import React from 'react';
import Logo from "./Logo";

class Header extends React.Component {

	render() {
		return (
			<footer>
				<div className="container">
					<div className="footer_inside">
						<div className="copyright">
							<Logo />
							<div className="year">© 2021</div>
						</div>
						<div className="contacts">
							<p>Abdelkader Tea</p>
							<p>Oued Smar, Alger</p>
							<p>+213 555969887</p>
							<p>abdelkader@gmail.dz</p>
						</div>
					</div>
				</div>
			</footer>
		);
	}
}

export default Header;
