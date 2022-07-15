;
import fetcherGenerator from '@/assets/APIFetcher.js';
import eventChannel from '@/assets/eventChannel.js';
let factoryStrategies = {
    TDXapi:function( originObj, [BASEURL] ){
        //mount object
        let mountObj = originObj,
        category = '';

        let base= BASEURL || 'https://tdx.transportdata.tw/api/basic/';
        //initial setting
        mountObj.setting( /*AppID, AppKey*/ );
        mountObj.setDataMiddleHandler( convertToFEdata );

        function convertToFEdata( originData ){
            let havePictureData = originData.filter( data=>{
                return data.Picture?.PictureUrl1 !== undefined || data?.Picture == undefined;
            });
            let mapObj = havePictureData.map(item=>{
                category = item?.ActivityID ? 'Activity'
                : item?.RestaurantID ? 'Restaurant' 
                : item?.ScenicSpotID ? 'ScenicSpot' : 'none';
                return {
                    ID: item?.ActivityID || item?.RestaurantID || item?.ScenicSpotID,
                    Name: item?.ActivityName || item?.RestaurantName || item?.ScenicSpotName || 'nameless',
                    Address: item?.Address || item?.City || 'no address data',
                    Location: item?.Location || '',
                    DescriptionDetail: item?.DescriptionDetail || 'no detail',
                    Description: item?.Description || 'no desccription',
                    Organizer: item?.Organizer || 'no organizer',
                    Phone: String( item.Phone ).split( '、' )[0] || 'no phone number',
                    OpenTime: item?.OpenTime || String( item.StartTime ).split('T')[0] + '~' + String( item.EndTime ).split('T')[0],
                    ClassTags: truthyPushArray( [item?.Class1, item?.Class2, item?.Class3] ),
                    WebsiteUrl: item?.WebsiteUrl || '',
                    MapUrl: item?.MapUrl || '',
                    PictureUrl: truthyPushArray( [item.Picture?.PictureUrl1, item.Picture?.PictureUrl2, item.Picture?.PictureUrl3] ) || '',
                    PictureDescri: truthyPushArray( [item.Picture?.PictureDescription1, item.Picture?.PictureDescription2, item.Picture?.PictureDescription3] ) || '',
                    Category: category
                }
            });
            function truthyPushArray( dataArr ){
                let truthyArr = [];
                dataArr.forEach(el=>{
                    if(el!==undefined)truthyArr.push(el);
                });
                return truthyArr;
            }
            return mapObj;
        }

        //mount to API
        mountObj.getCategory = function(){
            return category;
        }

        //decorate methods
        let originFn = mountObj.getAPIData;
        mountObj.getData = function( requestUrl, urlSlot, listenFn ){
            function inputVaildation(){
                try {
                    let isNotMirror = false;
                    let stringParams = String(requestUrl)
                    .split('{')
                    .filter(el=>el.includes('}'))
                    .map(el=>el.slice(0,el.indexOf('}')));
    
                    stringParams.forEach(check=>{
                        isNotMirror = urlSlot[check] == undefined ? true : false;
                    })
    
                    if(isNotMirror) throw new Error('參數有未匹配的值');
                    return true;
                } catch (error) {
                    console.warn('url error, ' + error);
                    return false
                }
            }
            if(!inputVaildation())return;

            let paramList = Object.keys(urlSlot);
            let modifiedUrl = String(requestUrl);
            paramList.forEach(factor=>{
                let replaceText = '{' + factor + '}'
                modifiedUrl = modifiedUrl.replace(replaceText, urlSlot[factor]);
            });
            mountObj.setUrl(base + modifiedUrl);
            
            const listenName = modifiedUrl + String(Math.random() * 50000);
            eventChannel.channel( 'travel-taiwan' ).listen( listenName, listenFn );
            let boundFn = eventChannel.channel( 'travel-taiwan' ).trigger.bind( eventChannel );
            originFn( boundFn, listenName );
        }

        return mountObj;
    }
}
//*params apiName is a string to assign product
//*return an Object with custom processor & setter
let APIFactory = function(){
    let apiName = Array.prototype.shift.call(arguments),
        args = arguments,
        basicFetcher = new fetcherGenerator();
    let customFetcher = factoryStrategies[apiName]( basicFetcher, args );
    return Object.create( customFetcher );
}
export default APIFactory;