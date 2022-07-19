;import jsSHA from "jssha";
//*params fetcher is an Object
//*return an Object with basic fetch processor & setter
function fetcherGenerator( fetcher = {} ){
    if( typeof fetcher !== 'object' )fetcher = {};
    fetcher.url = '';
    fetcher.option = '';
    fetcher._shift = Array.prototype.shift;
    fetcher._dataFn = function( originData ){
        return originData;
    };

    fetcher.getAPIData = function(){
        return function(){
            let afterAction = fetcher._shift.call( arguments );
            let args = arguments;
            let fn = fetcher._dataFn;
            const url = fetcher.url;
            const option = fetcher.option;

            if(localStorage.getItem(url) !== null){
                let localData = JSON.parse(localStorage.getItem(url));
                afterAction( ...args, localData);
                console.log('get same request data')
                return;
            }
            
            console.log('ready to connect: ' + url);
            fetch( url, option )
            .then( res => res.json() )
            .then( data => {
                let formatData = fn( data );
                console.log(formatData + url)
                localStorage.setItem( url, JSON.stringify(formatData) );
                afterAction( ...args, formatData );
            })
            .catch( errMsg => console.warn(errMsg) );
        };
    }();
    fetcher.setting = function(
        AppID = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF', 
        AppKey = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF'){
        let GMTString = new Date().toGMTString();
        let ShaObj = new jsSHA( 'SHA-256', 'TEXT' );
        ShaObj.setHMACKey( AppKey, 'TEXT' );
        ShaObj.update( 'x-date: ' + GMTString );
        let HMAC = ShaObj.getHMAC( 'B64' );
        let Authorization = 'hmac username="' + AppID + '", algorithm="hmac-sha1", settings="x-date", signature="' + HMAC + '"';
        fetcher.option = { 
            'Authorization' : Authorization, 
            'X-Date' : GMTString, 
            headers:{
                'content-type':'application/json'
            } 
        }; 
    };
    fetcher.setUrl = function( url ){
        fetcher.url = url;
    };
    fetcher.setDataMiddleHandler = function( fn ){
        fetcher._dataFn = fn;
    };

    return fetcher;
}
export default fetcherGenerator;