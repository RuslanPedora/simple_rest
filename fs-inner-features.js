'use strict'
const dbFileName = 'user-scores.dt'

const fs = require( 'fs' );
//--------------------------------------------------------------------------------
module.exports = {
    readScoresDataFromDB: readScoresData,
    updateScoresDataDB: updateScoresData
}
//--------------------------------------------------------------------------------
function readScoresData() {

    try {
        return JSON.parse( fs.readFileSync( dbFileName ).toString() );
    }
    catch ( err )  {
        console.log( 'Error during openning/parsing data file: ' + err.message );
        return undefined;
    }
}
//--------------------------------------------------------------------------------
function updateScoresData( inputData ) {
    fs.writeFile( dbFileName, inputData );
}
//--------------------------------------------------------------------------------