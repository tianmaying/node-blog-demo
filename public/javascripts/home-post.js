/**
 * Created by harttle on 1/8/15.
 */

$(function(){
    $('.post-content').each(function(i, ele){
        var $ele = $(ele);
        $ele.html(marked($ele.find('#content').html()));
    });
});