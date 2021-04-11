import * as Yup from 'yup';
import { RequestHandler } from 'express';

function userRegistrationSchema() {
	return Yup.object().shape({
		emailId: Yup.string().strict(false).trim().required(),
		handle: Yup.string().strict(false).trim().required(),
	});
}

const validateNewUser: RequestHandler = async (req, res, next) => {
	try {
		const userToCheck = req.body;
		const user = await userRegistrationSchema().validate(userToCheck, { abortEarly: false });
		req.user = user;
		next();
	} catch (err) {
		next(err);
	}
};

export { validateNewUser };
