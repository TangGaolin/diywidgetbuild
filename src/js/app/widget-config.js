/**
 * Created by tanggaolin on 16-3-21.
 */
define([], function () {

    var TextType = {
        'TIME_AMPM':'am'
    };

    var getTextType = function(type){
        return TextType[type];
    };

    return {
        undefined:'undefined',
        type:'undefined',
        TextType:TextType,
        getTextType:getTextType
    };
});