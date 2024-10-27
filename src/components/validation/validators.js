export const validateEmail = (email, errors) => {
	const emailRegex = /^(?=.{1,256})(?=.{1,64}@.{1,255}$)[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/gm
	if (email.trim().length < 1) errors.email.push("Введите email.")
	else if (!emailRegex.test(email)) errors.email.push("Некорректный email.");
}

export const validateUsername = (username, errors) => {
	if (username.trim().length < 1 || username.trim().length > 50) errors.username.push("Имя пользователя должно иметь длину от 1 до 50 символов.")
}

export const validateName = (name, errors) => {
	if (name.trim().length < 1 || name.trim().length > 50) errors.name.push("Имя должно иметь длину от 1 до 50 символов.")
}

export const validateSurname = (surname, errors) => {
	if (surname.trim().length < 1 || surname.trim().length > 50) errors.surname.push("Фамилия должна иметь длину от 1 до 50 символов.")
}

export const validatePassword = (password, errors) => {
	if (password.trim().length < 8 || password.trim().length > 50) errors.password.push("Пароль должен иметь длину от 8 до 50 символов.")
}

export const validateSecondPassword = (password, repeatPassword, errors) => {
	if (password !== repeatPassword) errors.repeatPassword.push("Пароли не совпадают.")
}
