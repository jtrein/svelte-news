module.exports = {
	transform: {
    "\\.js$": "babel-jest",
    "\\.svelte$": "jest-transform-svelte"
	},
	moduleFileExtensions: ['js', 'json', 'svelte'],
	bail: false,
	verbose: false
};
