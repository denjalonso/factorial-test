export interface UserFinderResponse {
	id: string;
	name: string;
	email?: string;
	gender?: string;
	pronouns?: string;
	phone?: string;
	hostedOnboarding?: {
		id: string;
		status: string;
	};
}
