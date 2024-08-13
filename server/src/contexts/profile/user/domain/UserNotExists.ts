export class UserNotExist extends Error {
	constructor() {
		super('The user does not exists');
	}
}
