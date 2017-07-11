'use strict'
const express = require( 'express' );
const bodyParser = require('body-parser');
const cors = require('cors');
const expressApp = express();
const fsService = require( './fs-inner-features' );
const serverPort = 8080;

let userScoresSrc;


userScoresSrc = fsService.readScoresDataFromDB();
if ( !userScoresSrc )  {
    console.log( 'DB file loading failed, service isn\'t abailable...' );
    process.exit( 0 );
}

const httpServer = expressApp.listen( serverPort, () => {
    console.log( 'Local http server has started port: ' + serverPort );
} ); 
//--------------------------------------------------------------------------------
expressApp.use( echoURL );
expressApp.use( bodyParser.json() );
expressApp.use( cors() );

expressApp.get( '/scores', totalScoresHandler );
expressApp.delete( '/scores/delete-all', deleteScoresHandler );

expressApp.route( '/scores/user/:userId' )
    .post( addUserHandler )
    .get( getUserScoreHandler )
    .put( updateUserScoreHandler )
    .delete( deleteUserHandler );

expressApp.use( errorHandler );
//--------------------------------------------------------------------------------
function echoURL( req, res, next ) {
    console.log( 'URL request detected ' + req.originalUrl );
    next();
} 
//--------------------------------------------------------------------------------
function totalScoresHandler( req, res, next ) {
    
    res.writeHead( 200, {'Content-Type': 'application/json',
                         'Access-Control-Allow-Origin': '*',
                         'Access-Control-Allow-Methods': 'GET' } );            

    if ( userScoresSrc.length === 0 ) {
        res.end( JSON.stringify( [] ) );
        return;
    }

    res.end( JSON.stringify( userScoresSrc, null, '    ' ) );
}
//--------------------------------------------------------------------------------
function deleteScoresHandler( req, res, next ) {

    userScoresSrc = [];
    fsService.updateScoresDataDB( JSON.stringify( userScoresSrc, null, '    ' ) );

    res.writeHead( 200, {'Content-Type': 'application/json',
                         'Access-Control-Allow-Origin': '*',
                         'Access-Control-Allow-Methods': 'DELETE' } );
    res.end( JSON.stringify( { status: 'deleted successfully' }) );
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
    let newUser = new User( userId, req.body.scoreTime, req.body.scoreEat );
    console.log( 'New user added: '  +JSON.stringify( newUser ) );
    userScoresSrc.push( newUser );
    fsService.updateScoresDataDB( JSON.stringify( userScoresSrc, null, '    ' ) );

    res.writeHead( 201, {'Content-Type': 'application/json',
                         'Access-Control-Allow-Origin': '*',
                         'Access-Control-Allow-Methods': 'PUT' } );        
    res.end( JSON.stringify( userScoresSrc[ userScoresSrc.length - 1 ], null, '    ' ) );
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
        res.status( 204 );
        next( new Error( `User ${userId} doesn\'t exist` ) );
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
        res.status( 204 );
        next( new Error( `User ${userId} doesn\'t exist` ) );
        return;
    }

    user.scoreTime = req.body.scoreTime;
    user.scoreEat = req.body.scoreEat;
    
    res.writeHead( 200, {'Content-Type': 'application/json',
                         'Access-Control-Allow-Origin': '*',
                         'Access-Control-Allow-Methods': 'PUT' } );        
    res.end( JSON.stringify( user, null, '    ' ) );
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
        res.status( 204 );
        next( new Error( `User ${userId} doesn\'t exist` ) );
        return;
    }

    userScoresSrc.splice( userIndex, 1 );
    fsService.updateScoresDataDB( JSON.stringify( userScoresSrc, null, '    ' ) );

    res.writeHead( 200, {'Content-Type': 'application/json',
                         'Access-Control-Allow-Origin': '*',
                         'Access-Control-Allow-Methods': 'DELETE' } );        
    res.end( JSON.stringify( { status: 'deleted successfully' } ) );
}
//--------------------------------------------------------------------------------
function errorHandler( err, req, res, next ) {
    console.error( err.message );
    res.setHeader( 'Content-Type', 'application/json' );
    res.setHeader( 'Access-Control-Allow-Origin', '*' );    
    res.end( JSON.stringify( { errorMessage: err.message } ) );
}
//--------------------------------------------------------------------------------
function User( name, scoreTime = 0, scoreEat = 0 ) {    
    this.userId = name;
    this.scoreTime = scoreTime;
    this.scoreEat = scoreEat;
}
//--------------------------------------------------------------------------------