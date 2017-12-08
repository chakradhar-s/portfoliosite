module.exports = {
    "files": "./dist/**/*.{js, html, css}",
    "server": {
        "baseDir": "./dist",
        "middleware": {
            // overrides the second middleware default with new settings 
            1: require('connect-history-api-fallback')({ index: '/index.html', verbose: true })
        }
    },
    "https": false,
};