// Simple example of dynamic config file
// Here we just getting command line arguments, to pass them into our tasks

const args = require('args');

args.options([

	{
		name: ['c', 'cache'],
		description: "Cache files, where it's possible"
	},

	{
		name: ['m', 'minify'],
		description: 'Minimize code files, optimize images, etc.'
	}

]);

const parsed = args.parse(process.argv);
module.exports = parsed;