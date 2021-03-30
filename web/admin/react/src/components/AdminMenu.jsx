import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu, Icon } from 'antd';
import {logout} from "../actions";

const { SubMenu } = Menu;

class AdminMenu extends Component {
	logout = () => {
		this.props.logout();
	};

	render() {
		return (
			<Menu
				mode="inline"
				theme="dark"
				className="menu"
			>
				<SubMenu
					key="2"
					title={
						<span>
									<Icon type="shopping-cart" />
									<span>Commandes</span>
								</span>
					}
				>
					<Menu.Item key="2_1" className="submenu_item">
						<Link to="/admin/orders/new">
							<Icon type="fire" />
							<span>Nouvelle</span>
						</Link>
					</Menu.Item>
					<Menu.Item key="2_2">
						<Link to="/admin/orders/verified">
							<Icon type="safety-certificate" />
							<span>Vérifiée</span>
						</Link>
					</Menu.Item>
			
					<Menu.Item key="2_6">
						<Link to="/admin/orders/completed">
							<Icon type="check" />
							<span>Terminée</span>
						</Link>
					</Menu.Item>
					<Menu.Item key="2_7">
						<Link to="/admin/orders/canceled">
							<Icon type="close" />
							<span>Annulée</span>
						</Link>
					</Menu.Item>
				</SubMenu>
				<SubMenu
					key="3"
					title={
						<span>
							<Icon type="appstore" />
							<span>Produits</span>
						</span>
					}
				>
					<Menu.Item key="3_1">
						<Link to="/admin/products/new">
							<Icon type="plus" />
							<span>Nouveau</span>
						</Link>
					</Menu.Item>
					<Menu.Item key="3_2">
						<Link to="/admin/products/list">
							<Icon type="bars" />
							<span>Liste</span>
						</Link>
					</Menu.Item>
				</SubMenu>
				<Menu.Item key="5">
					<span onClick={this.logout}>
						<Icon type="logout" />
						<span>Se déconnecter</span>
					</span>
				</Menu.Item>
			</Menu>
		)
	}
}

const mapDispatchToProps = {
	logout
};

export default connect(null, mapDispatchToProps)(AdminMenu);
