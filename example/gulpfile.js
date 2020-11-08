const
	{requireAll, TaskList} = require('gulp-task-modulizer'),
	cache                  = require('gulp-cached'),
	browserSync            = require('browser-sync').create();


// Creating two task lists for private and public tasks, based on files from specified directories
const
	private = new TaskList(requireAll('gulp/private')),
	public  = new TaskList(requireAll('gulp/public'));

const
	// Getting list of tasks wrapper functions
	tasks   = Object.assign(private.export(), public.export()),
	// We can pass any data to tasks init functions. For example, one BrowserSync instance for all tasks.
	config  = requireAll('gulp/config'),
	plugins = {cache, browserSync};

// Initializing our tasks. Now we can run them!
private.initAll(tasks, config, plugins);
public.initAll(tasks, config, plugins);

// Exporting only public tasks for gulp
module.exports = public.export();