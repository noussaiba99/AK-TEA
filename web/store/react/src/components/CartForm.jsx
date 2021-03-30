import { Formik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import { connect } from 'react-redux'
import customerActions from "../actions/customer";

class Cart extends React.Component {
	constructor(props) {
		super(props);
	}

	phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

	validationSchema = Yup.object().shape({
		name: Yup.string()
			.required('Required'),
		phone: Yup.string()
			.required('Required')
			.matches(this.phoneRegExp, 'Phone number is not valid'),
		address: Yup.string()
			.required('Required'),
		email: Yup.string().required('Champs requis').email('Entrer un email valide'),

	});

	handleCompleteOrder = (values) => {
		this.props.checkout(values);
	};

	render() {
		return (
			<React.Fragment>
				<div className="cartTitle">Vos coordonnées</div>
				<div className="cartFormContainer">
					<Formik
						initialValues={
							{
								name: '',
								phone: '',
								email: '',
								address: '',
								comment: ''
							}
						}
						validationSchema={this.validationSchema}
						onSubmit={this.handleCompleteOrder}
					>
						{({
								values,
								errors,
								touched,
								handleChange,
								handleBlur,
								handleSubmit
							}) => (
								<form onSubmit={handleSubmit}>
									<div className="field">
										<label>Comment on devrait vous appeler</label>
										<input name="name" type="text" onChange={handleChange} onBlur={handleBlur} value={values.name}/>
										<div className="errors">
										{touched.name && errors.name}
										</div>
									</div>
									<div className="field">
										<label>Numéro de téléphone</label>
										<input name="phone" onChange={handleChange} onBlur={handleBlur} value={values.phone}/>
										<div className="errors">
											{touched.phone && errors.phone}
										</div>
									</div>
									<div className="field">
										<label>Email</label>
										<input name="email" onChange={handleChange} onBlur={handleBlur} value={values.email}/>
										<div className="errors">
											{touched.email && errors.email}
										</div>
									</div>
									<div className="field">
										<label>Adresse</label>
										<textarea name="address" rows={3} onChange={handleChange} onBlur={handleBlur} value={values.address}/>
										<div className="errors">
											{touched.address && errors.address}
										</div>
									</div>
									<div className="field">
										<label>Si vous avez quelques choses à ajouter, n'hésitez pas</label>
										<textarea name="comment" rows={3} onChange={handleChange} onBlur={handleBlur} value={values.comment}/>
										<div className="errors">
											{touched.comment && errors.comment}
										</div>
									</div>
									<div className="completeOrderButtonContainer">
										<button className="blueButton" type="submit" disabled={this.props.isSubmitting}>Terminer la commande {this.props.isSubmitting && (<div className="spinner"></div>)}</button>
									</div>
								</form>
							)}
					</Formik>
				</div>
			</React.Fragment>
		);
	}
}

function mapStateToProps (state) {
	return {
		isSubmitting: state.checkout.isSubmitting
	}
}

const mapDispatchToProps = {
	checkout: customerActions.checkout
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
