'use strict'

const httpAgent = new XMLHttpRequest();
const host = 'http://localhost:8080/'
//--------------------------------------------------------------------------------
const outputEl = document.getElementById( 'output' );
const runButtonEl = document.getElementById( 'run-test' );
const cleanButtonEl = document.getElementById( 'clean-score' );
//--------------------------------------------------------------------------------
function displayResponse( res ) {

    outputEl.innerHTML += '<br>Ready state: ' + res.readyState + '<br>';
    outputEl.innerHTML += 'Status: ' + res.status + '<br>';
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

    url = `${host}scores/user/Petro?scoreTime=123&scoreEat=66`;
    outputEl.innerHTML += '<br>Let add user Petro url:    ' + url;
    httpAgent.open( 'POST', url, false );
    httpAgent.send();
    displayResponse( httpAgent );    
    //--------------------------------------------------------------------------------

    url = `${host}scores/user/Petro?scoreTime=123&scoreEat=66`;
    outputEl.innerHTML += '<br>Let add user Petro url:    ' + url;
    httpAgent.open( 'POST', url, false );
    httpAgent.send();
    displayResponse( httpAgent );    
    //--------------------------------------------------------------------------------

    url = `${host}scores/user/Ivan?scoreTime=123&scoreEat=66`;
    outputEl.innerHTML += '<br>Let add user Ivan, url:    ' + url;
    httpAgent.open( 'POST', url, false );
    httpAgent.send();
    displayResponse( httpAgent );    
    //--------------------------------------------------------------------------------

    url = `${host}scores/user/Nina?`
    outputEl.innerHTML += '<br>Let add user Nina, url:    ' + url;
    httpAgent.open( 'POST', url, false );
    httpAgent.send();
    displayResponse( httpAgent );    
    //--------------------------------------------------------------------------------

    url = `${host}scores/user/Nina?scoreTime=4&scoreEaatttt=54`
    outputEl.innerHTML += '<br>Let update user Nina, url:    ' + url;
    httpAgent.open( 'PUT', url, false );
    httpAgent.send();
    displayResponse( httpAgent );    
    //--------------------------------------------------------------------------------

    url = `${host}scores/user/Nina?scoreTime=4&scoreEat=54`
    outputEl.innerHTML += '<br>Let update user Nina, url:    ' + url;
    httpAgent.open( 'PUT', url, false );
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
cleanButtonEl.onclick = function() {
    let url = `${host}scores`;
    
    outputEl.innerHTML = '<br>';
    httpAgent.open( 'DELETE', url, false );
    httpAgent.send();
    displayResponse( httpAgent );    
}

run();
