/**
 * Created by harttle on 1/8/15.
 */

$(function(){
    if($('body#post').length === 0) return;

    $('.post-content').each(function(i, ele){
        var $ele = $(ele);
        $ele.html(marked($ele.find('#content').html()));
    });
});

function comment(){
    var content = $('#new-comment').val();
    if(content.trim() === ''){
        return $('.alert').html('评论不能为空').show();
    }
    $('#new-comment').val('');

    $.post('', {content: content})
        .done(function(data){
            var comment = $('<div class="comment"></div>')
                .append($('<h5></h5>').html(data.author))
                .append($('<p></p>').html(data.content));
            $('#comments').append(comment);
            $('.alert').hide();
        })
        .fail(function(data){
            return $('.alert').html('评论失败：'+data).show();
        });
}