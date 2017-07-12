'use strict'
const dbFileName = 'records.dat'

const fs = require( 'fs' );
//--------------------------------------------------------------------------------
module.exports = {
    readRecordsDataFromDB: readRecordsData,
    updateRecordsDataDB: updateRecordsData
}
//--------------------------------------------------------------------------------
function readRecordsData() {

    try {
        return JSON.parse( fs.readFileSync( dbFileName ).toString() );
    }
    catch ( err )  {
        console.log( 'Error during openning/parsing data file: ' + err.message );
        return undefined;
    }
}
//--------------------------------------------------------------------------------
function updateRecordsData( inputData ) {
    fs.writeFile( dbFileName, inputData );
}
//--------------------------------------------------------------------------------