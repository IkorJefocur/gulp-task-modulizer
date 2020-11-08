const
	fs   = require('fs'),
	path = require('path');


function requireAll(dir) {
	const
		files = fs.readdirSync(dir),
		result = {};

	for (let file of files) if (path.extname(file) === '.js')
		result[path.basename(file, '.js')] = require(path.join(process.cwd(), dir, file));
	return result;
}


class Task {
	constructor(name, func) {
		Object.assign(this, {
			name, func,
			isInited: false
		});
	}
	toString() {
		return this.name;
	}

	init(...args) {
		this.func = this.func(...args);
		this.isInited = true;
	}

	run(...args) {
		// Don't let task be runned before init
		if (!this.isInited)
			throw new Error(`Task called before it been initialized: ${this}`);

		return this.func(...args);
	}

	getCleanFunc() {
		const task = this;

		// Using some trick to set task name as function name
		// Gulp using function name for logging, so this is not useless shit
		const namer = {[this.name]: function(...args) {
			return task.run(...args);
		}};

		return namer[this.name];
	}
}


class TaskList {
	constructor(initFuncs) {
		this.tasks = {};
		for (let name in initFuncs)
			this.tasks[name] = new Task(name, initFuncs[name]);
	}

	initAll(...args) {
		for (let name in this.tasks)
			this.tasks[name].init(...args);
	}

	export() {
		const result = {};
		for (let name in this.tasks)
			result[name] = this.tasks[name].getCleanFunc();
		return result;
	}
}


module.exports = {requireAll, Task, TaskList};