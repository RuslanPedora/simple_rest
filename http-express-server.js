'use strict'
const MAX_TIME_SCORE = 5 * 3600;
const MAX_EAT_SCORE = 500;
const MAX_TIME_PRESICION = 3;
const MAX_LENGTH = 15;
const MAX_RECORD_COUNT = 100;

const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const cors = require( 'cors' );
const Joi = require( 'joi' );

const expressApp = express();
const fsService = require( './fs-inner-features' );
const serverPort = 8080;

const userIdSchema = Joi.object().keys( {
    userId: Joi.string().alphanum().min( 1 ).max( 50 ).required()
});

let userRecordsSrc;

userRecordsSrc = fsService.readRecordsDataFromDB();
if ( !userRecordsSrc )  {
    console.log( 'DB file loading failed, service isn\'t abailable...' );
    process.exit( 0 );
}

const httpServer = expressApp.listen( serverPort, () => {
    console.log( 'Local http server has started port: ' + serverPort );
} ); 
//--------------------------------------------------------------------------------
expressApp.use( urlTracker );
expressApp.use( bodyParser.json() );
expressApp.use( cors() );

expressApp.route( '/records' )
    .get( getAllRecordsHandler )
    .delete( deleteAllRecordsHandler );

expressApp.route( '/records/:userId' )
    .post( addRecordHandler )
    .get( getRecordHandler )
    .put( updateRecordHandler )
    .delete( deleteRecordHandler );

expressApp.use( errorHandler );
//--------------------------------------------------------------------------------
function urlTracker( req, res, next ) {
    console.log( '' + new Date().toDateString() + ' ' + req.originalUrl );
    next();
} 
//--------------------------------------------------------------------------------
function getAllRecordsHandler( req, res, next ) {
    let querySchema = Joi.object().keys({
        top: Joi.string().valid( 'time', 'eat' ),
        count: Joi.number().integer().min( 1 ).max( MAX_RECORD_COUNT ),
        minValue: Joi.number().min(0).max( MAX_TIME_SCORE )
    }).with( 'minValue', 'top' );
    let isValidQuery = Joi.validate( req.query, querySchema );
    let finalArray;

    if ( isValidQuery.error ) {
        res.status( 400 );
        next( isValidQuery.error );
        return;        
    }

    res.writeHead( 200, {'Content-Type': 'application/json',
                         'Access-Control-Allow-Origin': '*',
                         'Access-Control-Allow-Methods': 'GET' } );            

    if ( userRecordsSrc.length === 0 ) {
        res.end( JSON.stringify( [] ) );
        return;
    }

    finalArray = userRecordsSrc.slice();
    if ( req.query.top === 'time' ) {
        finalArray.sort( ( a, b ) => b.scoreTime - a.scoreTime );
        if ( req.query.minValue ) {
            finalArray = finalArray.filter( elem => elem.scoreTime >= req.query.minValue );
        }
    } else if ( req.query.top === 'eat' ) {
        finalArray.sort( ( a, b ) => b.scoreEat - a.scoreEat );
        if ( req.query.minValue ) {
            finalArray = finalArray.filter( elem => elem.scoreEat >= req.query.minValue );
        }
    }
    if ( req.query.count && req.query.count < finalArray.length ) {
        finalArray = finalArray.slice( 0, req.query.count );
    }

    res.end( JSON.stringify( finalArray, null, '    ' ) );
}
//--------------------------------------------------------------------------------
function deleteAllRecordsHandler( req, res, next ) {

    if ( !Array.isArray( req.body ) ) {
        res.status( 400 );
        next( new Error( 'To delete all records must be passed an array of userId\'s' ) );
        return;        
    }

    userRecordsSrc = userRecordsSrc.filter( elem => !req.body.includes( elem.userId ) );    

    fsService.updateRecordsDataDB( JSON.stringify( userRecordsSrc, null, '    ' ) );

    res.status( 200 ).json( { status: 'deleted successfully' } );
}
//--------------------------------------------------------------------------------
function addRecordHandler( req, res, next ) {
    let newUser;
    let isValidUserId = Joi.validate( { userId: req.params.userId }, userIdSchema );
    let scoreShema = Joi.object().keys( {
        scoreTime: Joi.number().precision( MAX_TIME_PRESICION ).min( 0 ).max( MAX_TIME_SCORE ).required(),
        scoreEat: Joi.number().integer().min( 0 ).max( MAX_EAT_SCORE ).required()
    } );
    let isValidScore = Joi.validate( req.body, scoreShema );
    

    if ( isValidUserId.error ) {
        res.status( 400 );
        next( isValidUserId.error );
        return;        
    } else if ( isValidScore.error ) {
        res.status( 400 );
        next( isValidScore.error );
        return;        
    } else if ( userRecordsSrc.find( elem => elem.userId.toLowerCase() === ( '' + req.params.userId ).toLowerCase() ) ) {
        res.status( 403 );
        next( new Error( `User ${userId} already exist` ) );
        return;
    }

    newUser = new User( req.params.userId, req.body.scoreTime, req.body.scoreEat );    
    userRecordsSrc.push( newUser );
    fsService.updateRecordsDataDB( JSON.stringify( userRecordsSrc, null, '    ' ) );

    res.status( 201 ).json( userRecordsSrc[ userRecordsSrc.length - 1 ] );
}
//--------------------------------------------------------------------------------
function getRecordHandler( req, res, next ) {    
    let user;
    let isValidUserId = Joi.validate( { userId: req.params.userId }, userIdSchema );

    if ( isValidUserId.error ) {
        res.status( 400 );
        next( isValidUserId.error );
        return;
    } else if ( ! ( user = userRecordsSrc.find( elem => elem.userId.toLowerCase() === ( '' + req.params.userId ).toLowerCase() ) ) ) {
        res.status( 204 );
        next( new Error( `User ${userId} doesn\'t exist` ) );
        return;
    }

    res.status( 200 ).json( user );
}
//--------------------------------------------------------------------------------
function updateRecordHandler( req, res, next ) {
    let user;
    let isValidUserId = Joi.validate( { userId: req.params.userId }, userIdSchema );
    let scoreShema = Joi.object().keys( {
        scoreTime: Joi.number().precision( MAX_TIME_PRESICION ).min( 0 ).max( MAX_TIME_SCORE ),
        scoreEat: Joi.number().integer().min( 0 ).max( MAX_EAT_SCORE )
    } );
    let isValidScore = Joi.validate( req.body, scoreShema );

    if ( isValidUserId.error ) {
        res.status( 400 );
        next( isValidUserId.error );
        return;
    } else if ( isValidScore.error ) {
        res.status( 400 );
        next( isValidScore.error );
        return;        
    } else if ( ! ( user = userRecordsSrc.find( elem => elem.userId.toLowerCase() === ( '' + req.params.userId ).toLowerCase() ) ) ) {
        res.status( 204 );
        next( new Error( `User ${userId} doesn\'t exist` ) );
        return;
    }

    for ( let prop in req.body ) {
        user[ prop ] = req.body[ prop ];
    }
    
    res.status( 200 ).json( user );
    fsService.updateRecordsDataDB( JSON.stringify( userRecordsSrc, null, '    ' ) );
}
//--------------------------------------------------------------------------------
function deleteRecordHandler( req, res, next ) {
    let isValidUserId = Joi.validate( { userId: req.params.userId }, userIdSchema );
    let userIndex;

    if ( isValidUserId.error ) {
        res.status( 400 );
        next( isValidUserId.error );
        return;
    } else if ( ( userIndex = userRecordsSrc.findIndex( elem => elem.userId.toLowerCase() === ( '' + req.params.userId ).toLowerCase() ) ) === -1 ) {
        res.status( 204 );
        next( new Error( `User ${userId} doesn\'t exist` ) );
        return;
    }

    userRecordsSrc.splice( userIndex, 1 );
    fsService.updateRecordsDataDB( JSON.stringify( userRecordsSrc, null, '    ' ) );

    res.stauts( 200 ).json( { status: 'deleted successfully' } );
}
//--------------------------------------------------------------------------------
function errorHandler( err, req, res, next ) {
    res.setHeader( 'Content-Type', 'application/json' );
    res.setHeader( 'Access-Control-Allow-Origin', '*' );    
    res.json( { errorMessage: err.message } );
}
//--------------------------------------------------------------------------------
class User {    
    constructor ( name, scoreTime = 0, scoreEat = 0 ) {
        this.userId = name;
        this.scoreTime = scoreTime;
        this.scoreEat = scoreEat;
    }
}
//--------------------------------------------------------------------------------