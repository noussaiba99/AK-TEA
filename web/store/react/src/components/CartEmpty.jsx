import React from 'react';
import { Link } from "react-router-dom";

class CartEmpty extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="emptyCartContainer">
				<div className="emptyCart">
					<img className="emptyCartImg"  src="/static/img/shopping-cart.png" />
					<div className="emptyCartText">Votre panier est vide</div>
					<Link to="/"><button className="blueButton">Revenir ​au catalogue</button></Link>
				</div>
			</div>
		);
	}
}

export default CartEmpty;
