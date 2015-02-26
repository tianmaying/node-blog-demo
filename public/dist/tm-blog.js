;/**
 * Created by harttle on 1/6/15.
 */

var msgMap = {
    "Unauthorized": '用户名或密码不正确',
    "Unactived": '该用户尚未激活'
};

function login(){
    if(!simpleValidate()) return;
    $.post('', $('form').serialize())
        .done(function(){
            window.location = getQueryStringValue('next') || '/home';
        })
        .fail(function(e){
            warn(msgMap[e.responseText] || '未知错误');
        });

    function getQueryStringValue (key) {
        return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    }
}

function resetPassword(){
    var p = $('#password').val();
    var p1 = $('#password1').val();
    if(p===''){
        warn('密码不能为空');
        return false;
    }
    if(p !== p1){
        warn('两次输入的密码不一致');
        return false;
    }
    return true;
}

function signup(){
    if(!simpleValidate()) return;

    var password = $('[name=password]').val();
    var password1 = $('#password1').val();
    if(password != password1){
        warn('两次输入的密码不一致');
        return;
    }
    $.post('', $('form').serialize())
        .done(info)
        .fail(function(res){
            warn(res.responseText);
        });
}

function simpleValidate(){
    var username = $('[name=username]').val().trim();
    var password = $('[name=password]').val();

    if(username.length === 0){
        warn('邮件不能为空');
        return false;
    }
    if(!validateEmail(username)){
        warn('邮件不合法');
        return false;
    }
    if(password.length === 0){
        warn('密码不能为空');
        return false;
    }
    return true;
}

function warn(msg){
    $('.alert').hide();
    $('.alert-danger').html(msg).show();
}

function info(msg){
    $('.alert').hide();
    $('.alert-success').html(msg).show();
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};/**
 * Created by harttle on 1/7/15.
 */

function save(){// validation
    if($('#title').val().trim()==='')
        return $('.alert-danger').html('标题不能为空').show();
    $('form').submit();
}

$(function(){
    if($('body#edit').length === 0) return;

    $('#content').bind('input propertychange', function(){
        $('#preview').html(marked($('#content').val()));
    });
    $('#content').trigger('input');
});;/**
 * Created by harttle on 1/8/15.
 */


marked.setOptions({
    highlight: function (code) {
        return hljs.highlightAuto(code).value;
    }
});;/**
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
};/**
 * Created by harttle on 1/7/15.
 */

function delPost(id) {
    $.ajax({
        url: '/admin/post/' + id,
        type: 'DELETE',
        success: function (result) {
            location.reload();
        }
    });
}