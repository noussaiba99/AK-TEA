import React from 'react';
import { Link } from "react-router-dom";

class CartThankYou extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="container">
				<div className="cartCenter">
					<div className="emptyCartContainer">
						<div className="emptyCart">
²							<div className="emptyCartText">Merci pour votre commande ♥</div>
							<div className="emptyCartText">Nous vous contacterons bientôt.</div>
							<Link to="/"><button className="blueButton">Revenir au catalogue</button></Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default CartThankYou;
