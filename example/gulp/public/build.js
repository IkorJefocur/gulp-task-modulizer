// Simple example of public task, that using private task

const {parallel} = require('gulp');

// As mentioned in gulpfile, you can recieve other tasks in init funciton, but you can call them only inside task function
module.exports = ({move}) =>
	parallel(move);