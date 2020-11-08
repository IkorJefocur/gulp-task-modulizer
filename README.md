# GULP-TASK-MODULIZER

**Split your gulp tasks into multiple modules!**

## Quick start

You can check "example" folder for gulpfile and tasks examples.

## Some theory

In this module system, each task is function, that returns other function. First function called "init function", second is "task function".

Task function - is simply a gulp task. Write it just like you writing ordinary gulp task.

Init function - is a wrapper around task. It's needed to recieve arguments, handle them, and then make closure to use them into task. Arguments can be a config files, global plugin instances, etc.. Also you can pass other tasks.

How do other tasks passing into init function before they're initialized? For this situation each task has a "wrapper function", that call task if it's already initialized, or throws error if not. So on init function you can only access link to function, but not to call it. This feature can be used, for example, in "gulp.series".

```
module.exports = function(tasks) {
	// Here you will recieve error: "Task called before it been initialized: task1"
	tasks.task1();
	// This will work, because gulp.series just recieving functions, but don't call them before it will be called itself
	return gulp.series(tasks.task1, tasks.task2);
};
```

## API

### *function* requireAll

Helper function, gets all js files in specified directory using "require".

- (param) **dir** *string*: Where to search files. Supports only relative path.
- (return) *Object*: Each key matches file basename in directory

---

### *class* Task

Wrapper around gulp task. In most cases, you will not need to use this, because **TaskList** can do same things, but with multiple tasks.

#### Task~constructor

- (param) **name** *string*
- (param) **func** *function*: Init function

#### Task~init

Running init function, then allows to run task

- (param) **...args** *mixed*: Will be passed to init function

#### Task~run

Run task

- (param) **...args** *mixed*: Same as for gulp task

#### Task~getCleanFunc

Get "run" method as independed function. Useful when exporting tasks for gulp

- (return) *function*

---

### *class* TaskList

Useful to handle multiple task files. Your main tool.

#### TaskList~constructor

- (param) **initFuncs** *Object*: List of init functions, where keys are they names

#### TaskList~initAll

Init each task in list

- (param) **...args** *mixed*: Will be passed to init function

#### TaskList~export

Export tasks functions for use in gulp or running from other tasks

- (return) *Object*