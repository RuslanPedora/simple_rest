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

    url = `${host}records`;
    outputEl.innerHTML += '<br>Let check records, url:    ' + url;
    httpAgent.open( 'GET', url, false );
    httpAgent.send();
    displayResponse( httpAgent );    
    //--------------------------------------------------------------------------------

    url = `${host}records/Petro`;
    outputEl.innerHTML += '<br>Let get user Petro, url:    ' + url;
    httpAgent.open( 'GET', url, false );
    httpAgent.send();
    displayResponse( httpAgent );        
    //--------------------------------------------------------------------------------

    url = `${host}records/Petro`;
    outputEl.innerHTML += '<br>Let add user Petro url:    ' + url;    
    httpAgent.open( 'POST', url, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 123, scoreEat: 66 } ) );
    displayResponse( httpAgent );    
    //--------------------------------------------------------------------------------

    url = `${host}records/P_etro`;
    outputEl.innerHTML += '<br>Let add user P_etro url:    ' + url;    
    httpAgent.open( 'POST', url, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 123, scoreEat: 66 } ) );
    displayResponse( httpAgent );    
    //--------------------------------------------------------------------------------


    url = `${host}records/Petro`;
    outputEl.innerHTML += '<br>Let add user Petro url:    ' + url;
    httpAgent.open( 'POST', url, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 123, scoreEat: 66 } ) );
    displayResponse( httpAgent );    
    //--------------------------------------------------------------------------------

    url = `${host}records/Ivan`;
    outputEl.innerHTML += '<br>Let add user Ivan, url:    ' + url;
    httpAgent.open( 'POST', url, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 44, scoreEat: 66 } ) );
    displayResponse( httpAgent );    
    //--------------------------------------------------------------------------------

    url = `${host}records/Nina`
    outputEl.innerHTML += '<br>Let add user Nina, url:    ' + url;
    httpAgent.open( 'POST', url, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 11, scoreEat: 11 } ) );
    displayResponse( httpAgent );    
    //--------------------------------------------------------------------------------

    url = `${host}records/Nina`
    outputEl.innerHTML += '<br>Let update user Nina, url:    ' + url;
    httpAgent.open( 'PUT', url, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 4, scoreEat: 54 } ) );
    displayResponse( httpAgent );    
    //--------------------------------------------------------------------------------

    url = `${host}records/Nina`
    outputEl.innerHTML += '<br>Let update user Nina, url:    ' + url;
    httpAgent.open( 'PUT', url, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 444 } ) );
    displayResponse( httpAgent );    
    //--------------------------------------------------------------------------------

    url = `${host}records/Nina`
    outputEl.innerHTML += '<br>Let update user Nina, url:    ' + url;
    httpAgent.open( 'PUT', url, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send();
    displayResponse( httpAgent );    
    //--------------------------------------------------------------------------------

    url = `${host}records/Nina`
    outputEl.innerHTML += '<br>Let update user Nina, url:    ' + url;
    httpAgent.open( 'PUT', url, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 44, scoreEat: 88 } ) );
    displayResponse( httpAgent );    
    //--------------------------------------------------------------------------------

    url = `${host}records`;
    outputEl.innerHTML += '<br>Let check records, url:    ' + url;
    httpAgent.open( 'GET', url, false );
    httpAgent.send();
    displayResponse( httpAgent );
    //--------------------------------------------------------------------------------

    url = `${host}records/Ivan`;
    outputEl.innerHTML += '<br>Let delete user Ivan, url:    ' + url;
    httpAgent.open( 'DELETE', url, false );
    httpAgent.send();
    displayResponse( httpAgent );    
    //--------------------------------------------------------------------------------

    url = `${host}records`;
    outputEl.innerHTML += '<br>Let check records, url:    ' + url;
    httpAgent.open( 'GET', url, false );
    httpAgent.send();
    displayResponse( httpAgent );
    //--------------------------------------------------------------------------------

    url = `${host}records/Ivan`;
    outputEl.innerHTML += '<br>Let delete user Ivan, url:    ' + url;
    httpAgent.open( 'DELETE', url, false );
    httpAgent.send();
    displayResponse( httpAgent );    
    //--------------------------------------------------------------------------------

    url = `${host}records`;
    outputEl.innerHTML += '<br>Let check records, url:    ' + url;
    httpAgent.open( 'GET', url, false );
    httpAgent.send();
    displayResponse( httpAgent );
    //--------------------------------------------------------------------------------
}
//--------------------------------------------------------------------------------
runButtonEl.onclick = run;
cleanButtonEl.onclick = () => {
    let url = `${host}records`;
    let recordArray;    

    url = `${host}records`;
    httpAgent.open( 'GET', url, false );
    httpAgent.send();

    try {
        recordArray = JSON.parse( httpAgent.response );        
        httpAgent.open( 'DELETE', url, false );
        httpAgent.setRequestHeader( 'Content-type', 'application/json' );
        httpAgent.send( JSON.stringify( recordArray.map( elem => elem.userId ) ) );
        outputEl.innerHTML = '<br>';
        displayResponse( httpAgent );    

    } catch( err ) {
        outputEl.innerHTML = '<br>' + err.message;
    }


}
initButtonEl.onclick = () => {

    outputEl.innerHTML = '<br>';

    httpAgent.open( 'POST', `${host}records/Mykyta`, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 11.348888888855, scoreEat: 11 } ) );
    displayResponse( httpAgent );

    httpAgent.open( 'POST', `${host}records/Mykola`, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 22, scoreEat: 22 } ) );
    displayResponse( httpAgent );

    httpAgent.open( 'POST', `${host}records/Olena`, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 33, scoreEat: 33 } ) );
    displayResponse( httpAgent );

    httpAgent.open( 'POST', `${host}records/Taras`, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 44, scoreEat: 44 } ) );
    displayResponse( httpAgent );

    httpAgent.open( 'POST', `${host}records/Stepan`, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 55, scoreEat: 55 } ) );
    displayResponse( httpAgent );

    httpAgent.open( 'POST', `${host}records/Ihor`, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 123, scoreEat: 12 } ) );
    displayResponse( httpAgent );

    httpAgent.open( 'POST', `${host}records/Bohdan`, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 303, scoreEat: 59 } ) );
    displayResponse( httpAgent );

    httpAgent.open( 'POST', `${host}records/Volodymyr`, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 12, scoreEat: 100 } ) );
    displayResponse( httpAgent );

    httpAgent.open( 'POST', `${host}records/Vasyl`, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 3, scoreEat: 1 } ) );
    displayResponse( httpAgent );

    httpAgent.open( 'POST', `${host}records/Oleksiy`, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 60, scoreEat: 30 } ) );
    displayResponse( httpAgent );

    httpAgent.open( 'POST', `${host}records/Sophia`, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 45, scoreEat: 9 } ) );
    displayResponse( httpAgent );

    httpAgent.open( 'POST', `${host}records/Chrystyna`, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 17, scoreEat: 9 } ) );
    displayResponse( httpAgent );

    httpAgent.open( 'POST', `${host}records/Halyna`, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 28, scoreEat: 1 } ) );
    displayResponse( httpAgent );

    httpAgent.open( 'POST', `${host}records/Iryna`, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 1, scoreEat: 1 } ) );
    displayResponse( httpAgent );

    httpAgent.open( 'POST', `${host}records/Tetyana`, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 27, scoreEat: 15 } ) );
    displayResponse( httpAgent );

    httpAgent.open( 'POST', `${host}records/Lilia`, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 45, scoreEat: 33 } ) );
    displayResponse( httpAgent );

    httpAgent.open( 'POST', `${host}records/Markiyan`, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 1, scoreEat: 99 } ) );
    displayResponse( httpAgent );

    httpAgent.open( 'POST', `${host}records/Juja`, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 107, scoreEat: 11 } ) );
    displayResponse( httpAgent );

    httpAgent.open( 'POST', `${host}records/Solomiya`, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 11, scoreEat: 2 } ) );
    displayResponse( httpAgent );

    httpAgent.open( 'POST', `${host}records/Zorro`, false );
    httpAgent.setRequestHeader( 'Content-type', 'application/json' );
    httpAgent.send( JSON.stringify( { scoreTime: 90, scoreEat: 5 } ) );
    displayResponse( httpAgent );

}
run();
