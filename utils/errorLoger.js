function logError(error, fileName, functionName) {
    console.log('---------------------------------');
    console.log('\x1b[33m%s\x1b[0m', fileName + ' ', functionName + ' ', error);
    console.log('---------------------------------');
}
module.exports = logError;