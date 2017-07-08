'use strict'
const express = require( 'express' );
const bodyParser = require('body-parser');
const cors = require('cors');
const expressApp = express();
const fsService = require( './fs-inner-features' );

let userScoresSrc;


userScoresSrc = fsService.readScoresDataFromDB();
if ( !userScoresSrc )  {
    console.log( 'DB file loading failed, service isn\'t abailable...' );
    process.exit( 0 );
}

const httpServer = expressApp.listen( 8080, () => {
    console.log( 'Local http server has started port: 8080' );
} ); 
//--------------------------------------------------------------------------------
expressApp.use( preHandler );
expressApp.use( bodyParser.json() );
expressApp.use( cors() );

expressApp.route( '/scores' )
     .get( totalScoresHandler )
     .delete( deleteScoresHandler );

expressApp.route( '/scores/user/:userId' )
    .post( addUserHandler )
    .get( getUserScoreHandler )
    .put( updateUserScoreHandler )
    .delete( deleteUserHandler );

expressApp.use( errorHandler );
//--------------------------------------------------------------------------------
function preHandler( req, res, next ) {
    console.log( 'URL request detected ' + req.originalUrl );
    next();
} 
//--------------------------------------------------------------------------------
function totalScoresHandler( req, res, next ) {
    
    res.writeHead( 200, {'Content-Type': 'application/json',
                         'Access-Control-Allow-Origin': '*',
                         'Access-Control-Allow-Methods': 'GET' } );            

    if ( userScoresSrc.length === 0 ) {
        res.end( 'Score table is empty' );
        return;
    }

    res.end( JSON.stringify( userScoresSrc, null, '    ' ) );
}
//--------------------------------------------------------------------------------
function deleteScoresHandler( req, res, next ) {

    userScoresSrc = [];
    fsService.updateScoresDataDB( JSON.stringify( userScoresSrc, null, '    ' ) );

    res.writeHead( 200, {'Content-Type': 'plain/text',
                         'Access-Control-Allow-Origin': '*',
                         'Access-Control-Allow-Methods': 'DELETE' } );                
    res.end( 'Score table has been cleaned' );                         
}
//--------------------------------------------------------------------------------
function addUserHandler( req, res, next ) {
    let userId = req.params.userId;

    if ( userId === undefined ) {
        res.status( 400 );
        next( new Error( 'Unable to create user with undefined Id' ) );
        return;
    } else if ( userScoresSrc.find( elem => elem.userId.toLowerCase() === ( '' + userId ).toLowerCase() ) ) {
        res.status( 403 );
        next( new Error( `User ${userId} already exist` ) );
        return;
    }

    userScoresSrc.push( new User( userId, req.query.scoreTime, req.query.scoreEat ) );
    fsService.updateScoresDataDB( JSON.stringify( userScoresSrc, null, '    ' ) );

    res.writeHead( 200, {'Content-Type': 'application/json',
                         'Access-Control-Allow-Origin': '*',
                         'Access-Control-Allow-Methods': 'PUT' } );        
    res.end( 'User ' + userId + ' has been created\n' + JSON.stringify( userScoresSrc[ userScoresSrc.length - 1 ], null, '    ' ) );
    
    console.log( 'Body when adding new user: ' + JSON.stringify( req.body ) );
}
//--------------------------------------------------------------------------------
function getUserScoreHandler( req, res, next ) {
    let userId = req.params.userId;    
    let user;

    if ( userId === undefined ) {
        res.status( 400 );
        next( new Error( 'Unable to get user with undefined Id' ) );
        return;
    } else if ( ! ( user = userScoresSrc.find( elem => elem.userId.toLowerCase() === ( '' + userId ).toLowerCase() ) ) ) {
        res.status( 404 );
        next( new Error( `User ${userId} doesn't exist` ) );
        return;
    }

    res.writeHead( 200, {'Content-Type': 'application/json',
                         'Access-Control-Allow-Origin': '*',
                         'Access-Control-Allow-Methods': 'GET' } );        
    res.end( JSON.stringify( user, null, '    ' ) );
}
//--------------------------------------------------------------------------------
function updateUserScoreHandler( req, res, next ) {
    let userId = req.params.userId;    
    let user;

    if ( userId === undefined ) {
        res.status( 400 );
        next( new Error( 'Unable to get user with undefined Id' ) );
        return;
    } else if ( ! ( user = userScoresSrc.find( elem => elem.userId.toLowerCase() === ( '' + userId ).toLowerCase() ) ) ) {
        res.status( 404 );
        next( new Error( `User ${userId} doesn't exist` ) );
        return;
    }

    user.scoreTime = req.query.scoreTime;
    user.scoreEat = req.query.scoreEat;
    
    res.writeHead( 200, {'Content-Type': 'application/json',
                         'Access-Control-Allow-Origin': '*',
                         'Access-Control-Allow-Methods': 'PUT' } );        
    res.end( 'User ' + userId + ' has been updated\n' + JSON.stringify( user, null, '    ' ) );
    fsService.updateScoresDataDB( JSON.stringify( userScoresSrc, null, '    ' ) );
}
//--------------------------------------------------------------------------------
function deleteUserHandler( req, res, next ) {
    let userId = req.params.userId;
    let userIndex;

    if ( userId === undefined ) {
        res.status( 400 );
        next( new Error( 'Unable to delete user with undefined Id' ) );
        return;
    } else if ( ( userIndex = userScoresSrc.findIndex( elem => elem.userId.toLowerCase() === ( '' + userId ).toLowerCase() ) ) === -1 ) {
        res.status( 404 );
        next( new Error( `User ${userId} doesn't exist` ) );
        return;
    }

    userScoresSrc.splice( userIndex, 1 );
    fsService.updateScoresDataDB( JSON.stringify( userScoresSrc, null, '    ' ) );

    res.writeHead( 200, {'Content-Type': 'application/json',
                         'Access-Control-Allow-Origin': '*',
                         'Access-Control-Allow-Methods': 'DELETE' } );        
    res.end( 'User ' + userId + ' has been deleted' );
}
//--------------------------------------------------------------------------------
function errorHandler( err, req, res, next ) {
    console.error( err.message );
    res.setHeader( 'Content-Type', 'text/html' );
    res.setHeader( 'Access-Control-Allow-Origin', '*' );    
    res.end( err.message );
}
//--------------------------------------------------------------------------------
function User( name, scoreTime = 0, scoreEat = 0 ) {    
    this.userId = name;
    this.scoreTime = scoreTime;
    this.scoreEat = scoreEat;
}
//--------------------------------------------------------------------------------