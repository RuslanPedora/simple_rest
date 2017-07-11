'use strict'

const httpAgent = new XMLHttpRequest();
const host = 'http://localhost:8080/'
//--------------------------------------------------------------------------------
const outputEl = document.getElementById( 'output' );
const runButtonEl = document.getElementById( 'run-test' );
const initButtonEl = document.getElementById( 'init-score' );
const cleanButtonEl = document.getElementById( 'clean-score' );
//--------------------------------------------------------------------------------
function displayResponse( res ) {

    outputEl.innerHTML += '<br>Ready state: ' + res.readyState + '<br>';
    outputEl.innerHTML += 'Status: ' + res.status + ' ' + res.statusText + '<br>';
    outputEl.innerHTML += res.responseText + '<hr>';    
}

//--------------------------------------------------------------------------------
function run() {
    let url;

    outputEl.innerHTML = '<br>';

    url = `${host}scores`;
    outputEl.innerHTML += '<br>Let check scores, url:    ' + url;
    httpAgent.open( 'GET', url, false );
    httpAgent.send();
    displayResponse( httpAgent );    
    //--------------------------------------------------------------------------------

    url = `${host}scores/user/Petro`;
    outputEl.innerHTML += '<br>Let get user Petro, url:    ' + url;
    httpAgent.open( 'GET', url, false );
    httpAgent.send();
    displayResponse( httpAgent );        
    //--------------------------------------------------------------------------------

    url = `${host}scores/user/Petro`;
    outputEl.innerHTML += '<br>Let add user Petro url:    ' + url;    
    httpAgent.open( 'POST', url, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 123, scoreEat: 66 } ) );
    displayResponse( httpAgent );    
    //--------------------------------------------------------------------------------

    url = `${host}scores/user/Petro`;
    outputEl.innerHTML += '<br>Let add user Petro url:    ' + url;
    httpAgent.open( 'POST', url, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 123, scoreEat: 66 } ) );
    displayResponse( httpAgent );    
    //--------------------------------------------------------------------------------

    url = `${host}scores/user/Ivan`;
    outputEl.innerHTML += '<br>Let add user Ivan, url:    ' + url;
    httpAgent.open( 'POST', url, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 44, scoreEat: 66 } ) );
    displayResponse( httpAgent );    
    //--------------------------------------------------------------------------------

    url = `${host}scores/user/Nina`
    outputEl.innerHTML += '<br>Let add user Nina, url:    ' + url;
    httpAgent.open( 'POST', url, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 11, scoreEat: 11 } ) );
    displayResponse( httpAgent );    
    //--------------------------------------------------------------------------------

    url = `${host}scores/user/Nina`
    outputEl.innerHTML += '<br>Let update user Nina, url:    ' + url;
    httpAgent.open( 'PUT', url, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 4, scoreEat: 54 } ) );
    displayResponse( httpAgent );    
    //--------------------------------------------------------------------------------

    url = `${host}scores/user/Nina`
    outputEl.innerHTML += '<br>Let update user Nina, url:    ' + url;
    httpAgent.open( 'PUT', url, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 44, scoreEat: 88 } ) );
    displayResponse( httpAgent );    
    //--------------------------------------------------------------------------------

    url = `${host}scores`;
    outputEl.innerHTML += '<br>Let check scores, url:    ' + url;
    httpAgent.open( 'GET', url, false );
    httpAgent.send();
    displayResponse( httpAgent );
    //--------------------------------------------------------------------------------

    url = `${host}scores/user/Ivan`;
    outputEl.innerHTML += '<br>Let delete user Ivan, url:    ' + url;
    httpAgent.open( 'DELETE', url, false );
    httpAgent.send();
    displayResponse( httpAgent );    
    //--------------------------------------------------------------------------------

    url = `${host}scores`;
    outputEl.innerHTML += '<br>Let check scores, url:    ' + url;
    httpAgent.open( 'GET', url, false );
    httpAgent.send();
    displayResponse( httpAgent );
    //--------------------------------------------------------------------------------

    url = `${host}scores/user/Ivan`;
    outputEl.innerHTML += '<br>Let delete user Ivan, url:    ' + url;
    httpAgent.open( 'DELETE', url, false );
    httpAgent.send();
    displayResponse( httpAgent );    
    //--------------------------------------------------------------------------------

    url = `${host}scores`;
    outputEl.innerHTML += '<br>Let check scores, url:    ' + url;
    httpAgent.open( 'GET', url, false );
    httpAgent.send();
    displayResponse( httpAgent );
    //--------------------------------------------------------------------------------
}
//--------------------------------------------------------------------------------
runButtonEl.onclick = run;
cleanButtonEl.onclick = () => {
    let url = `${host}scores/delete-all`;
    
    outputEl.innerHTML = '<br>';
    httpAgent.open( 'DELETE', url, false );
    httpAgent.send();
    displayResponse( httpAgent );    
}
initButtonEl.onclick = () => {

    outputEl.innerHTML = '<br>';

    httpAgent.open( 'POST', `${host}scores/user/Mykyta`, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 11, scoreEat: 11 } ) );
    displayResponse( httpAgent );

    httpAgent.open( 'POST', `${host}scores/user/Mykola`, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 22, scoreEat: 22 } ) );
    displayResponse( httpAgent );

    httpAgent.open( 'POST', `${host}scores/user/Olena`, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 33, scoreEat: 33 } ) );
    displayResponse( httpAgent );

    httpAgent.open( 'POST', `${host}scores/user/Taras`, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 44, scoreEat: 44 } ) );
    displayResponse( httpAgent );

    httpAgent.open( 'POST', `${host}scores/user/Stepan`, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 55, scoreEat: 55 } ) );
    displayResponse( httpAgent );

    httpAgent.open( 'POST', `${host}scores/user/Ihor`, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 123, scoreEat: 12 } ) );
    displayResponse( httpAgent );

    httpAgent.open( 'POST', `${host}scores/user/Bohdan`, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 303, scoreEat: 59 } ) );
    displayResponse( httpAgent );

    httpAgent.open( 'POST', `${host}scores/user/Volodymyr`, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 12, scoreEat: 100 } ) );
    displayResponse( httpAgent );

    httpAgent.open( 'POST', `${host}scores/user/Vasyl`, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 3, scoreEat: 1 } ) );
    displayResponse( httpAgent );

    httpAgent.open( 'POST', `${host}scores/user/Oleksiy`, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 60, scoreEat: 30 } ) );
    displayResponse( httpAgent );

    httpAgent.open( 'POST', `${host}scores/user/Sophia`, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 45, scoreEat: 9 } ) );
    displayResponse( httpAgent );

    httpAgent.open( 'POST', `${host}scores/user/Chrystyna`, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 17, scoreEat: 9 } ) );
    displayResponse( httpAgent );

    httpAgent.open( 'POST', `${host}scores/user/Halyna`, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 28, scoreEat: 1 } ) );
    displayResponse( httpAgent );

    httpAgent.open( 'POST', `${host}scores/user/user`, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 1, scoreEat: 1 } ) );
    displayResponse( httpAgent );

    httpAgent.open( 'POST', `${host}scores/user/Tetyana`, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 27, scoreEat: 15 } ) );
    displayResponse( httpAgent );

    httpAgent.open( 'POST', `${host}scores/user/Lilia`, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 45, scoreEat: 33 } ) );
    displayResponse( httpAgent );

    httpAgent.open( 'POST', `${host}scores/user/Markiyan`, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 1, scoreEat: 99 } ) );
    displayResponse( httpAgent );

    httpAgent.open( 'POST', `${host}scores/user/Juja`, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 107, scoreEat: 11 } ) );
    displayResponse( httpAgent );

    httpAgent.open( 'POST', `${host}scores/user/Solomiya`, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 11, scoreEat: 2 } ) );
    displayResponse( httpAgent );

    httpAgent.open( 'POST', `${host}scores/user/Zorro`, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 90, scoreEat: 5 } ) );
    displayResponse( httpAgent );

}
run();
