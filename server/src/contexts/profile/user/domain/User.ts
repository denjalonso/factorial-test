export class User {
	readonly id: string;
	readonly name: string;

	constructor(params: { id: string; name: string }) {
		this.id = params.id;
		this.name = params.name;
	}
}
