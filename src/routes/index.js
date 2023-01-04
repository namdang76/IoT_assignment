const newsRouter = require('./news');
const meRouter = require('./me');
const coursesRouter = require('./courses');
const passwordsRouter = require('./passwords');
const siteRouter = require('./site');

function route(app) {
    app.use('/news', newsRouter);
    app.use('/me', meRouter);
    app.use('/passwords', passwordsRouter);
    app.use('/courses', coursesRouter);

    app.use('/', siteRouter);
}

module.exports = route;
