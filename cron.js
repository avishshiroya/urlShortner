const cron = require('node-cron');
const printLogger = require('./middlewares/winstonLogger');

cron.schedule(' 1 0 * * *',()=>{
    printLogger('info','file created')
})