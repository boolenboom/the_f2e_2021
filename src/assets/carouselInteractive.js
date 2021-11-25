;let handler=function(){
    let isActive=false;
    let startPoint=0,initial=0;
    let inputRatio=0.005;
    let isClamp=true,clampMin=0,clampMax=5;
    function evalOffset(offset){
        return isClamp ? Math.min(clampMax,Math.max(initial - (offset)*inputRatio, clampMin)) + 1 : initial - (offset)*inputRatio + 1;
    }
    function endBehavior(endPoint){
        isActive=false;
        // console.log('test');
        return Math.round(evalOffset(endPoint - startPoint));
    };
    return {
        pointermove:function(moveoffset){
            if(isActive) return evalOffset(moveoffset -startPoint);
            return false;
        },
        pointerdown:function(moveStart,currentInitial){
            isActive = true;
            startPoint = moveStart;
            initial = currentInitial;
            return false;
        },
        pointerup:function(moveEnd){
            return endBehavior(moveEnd);
        },
        pointerout:function(moveEnd){
            if(isActive) return endBehavior(moveEnd);
            return false;
        },
        setClampOption:function(clampSwitch=isClamp,min=clampMin,max=clampMax){
            isClamp = clampSwitch;
            clampMin = min;
            clampMax = max;
        },
        getClampOption:function(){
            
            console.log('isClamp:'+isClamp);
            console.log('min:'+clampMin);
            console.log('max:'+clampMax);
        }
    }
}
export default handler;