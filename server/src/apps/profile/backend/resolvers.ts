const users = [
	{
		name: 'Kate Chopin'
	},
	{
		name: 'Paul Auster'
	}
];

const resolvers = {
	Query: {
		users: () => users
	}
};

export default resolvers;
