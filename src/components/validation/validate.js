import * as validators from "@/components/validation/validators.js";

export function validateSignUpForm(email, username, name, surname, password, repeatPassword) {
	let errors = {
		email: [],
		username: [],
		name: [],
		surname: [],
		password: [],
		repeatPassword: []
	}

	validators.validateEmail(email, errors)
	validators.validateUsername(username, errors)
	validators.validateName(name, errors)
	validators.validateSurname(surname, errors)
	validators.validatePassword(password, errors)
	validators.validateSecondPassword(password, repeatPassword, errors)

	return errors
}