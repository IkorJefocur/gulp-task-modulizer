// Simple example of private task

const
	{src, dest} = require('gulp'),
	empty       = require('gulp-empty-pipe');


// Recieving argumets passed to "TaskList.init" method
module.exports = (tasks, {args, files}, {cache, browserSync}) =>

	() => src(files.src.move)
		.pipe(args['cache'] ? cache('move') : empty())

		.pipe(dest(files.prod.base))
		.pipe(browserSync.stream());