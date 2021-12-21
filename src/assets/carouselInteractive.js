;let handler=function(){
    let isActive=false,isSlide=false;
    let initial=0,startPoint=0,lastPoint=0;
    let inputRatio=0.04;
    let isClamp=true,clampMin=0,clampMax=5;
    function evalOffset(offset){
        return isClamp ? Math.min(clampMax,Math.max(initial - (offset)*inputRatio, clampMin)) + 1 : initial - (offset)*inputRatio + 1;
    }
    function evalEndTransform(endPoint){
        return Math.round(evalOffset(endPoint - startPoint));
    };
    return {
        pointermove:function(moveoffset){
            if(isActive){
                lastPoint=moveoffset;
                isSlide=true;
            }
            return isActive ? evalOffset(moveoffset -startPoint) : false;
        },
        touchmove:function(moveoffset){
            if(isActive){
                lastPoint=moveoffset;
                isSlide=true;
            }
            return isActive ? evalOffset(moveoffset -startPoint) : false;
        },
        pointerdown:function(moveStart,currentInitial){
            isActive = true;
            startPoint = moveStart;
            initial = currentInitial;
            return false;
        },
        pointerup:function(moveEnd){
            isActive=false;
            isSlide=false;
            return evalEndTransform(moveEnd);
        },
        pointerout:function(moveEnd){
            if(isActive) return evalEndTransform(moveEnd);
            return false;
        },
        touchend:function(moveEnd){
            isActive=false;
            isSlide=false;
            return evalEndTransform(moveEnd || lastPoint);
        },
        setClampOption:function(clampSwitch=isClamp, min=clampMin, max=clampMax){
            isClamp = clampSwitch;
            clampMin = min;
            clampMax = max;
        },
        getClampOption:function(){
            console.log('isClamp:'+isClamp);
            console.log('min:'+clampMin);
            console.log('max:'+clampMax);
        },
        checkIsSliding:function(){
            return isSlide;
        }
    }
}
export default handler;