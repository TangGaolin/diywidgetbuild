/**
 * Created by tanggaolin on 16-3-29.
 */
define(['jquery','bootstrap','masonry','imagesloaded','util2'],function($,bootstrap,masonry,imagesloaded,util2) {

    var icon = $('.all-icons');
    var selected_icon = $('.selected-icons');
    var addIconsBtn = $('#add-icons-btn');
    var setBgBtn = $('#set-bg-btn');
    var delIconBtn = $('#del-icon-btn');

    var select_icons = [];
    var selected_widget_icons = [];




    var addFontsBtn = $('#add-fonts-btn');
    var delFontsBtn = $('#del-font-btn');
    var all_fonts = $('.all-fonts');
    var selected_fonts = $('.selected-fonts');

    var select_fonts = [];
    var selected_widget_fonts = [];


    icon.click(function(){
        var icon_name = $(this).attr('data-name');
        var index = $.inArray(icon_name, select_icons);
        if(index == -1){
            select_icons.push(icon_name);
            $(this).addClass('checked');
        }else{
            select_icons.splice(index,1);
            $(this).removeClass('checked');
        }
    });



    selected_icon.click(function(){
        var icon_name = $(this).attr('data-name');
        var index = $.inArray(icon_name, selected_widget_icons);
        if(index == -1){
            selected_widget_icons.push(icon_name);
            $(this).addClass('checked');
        }else{
            selected_widget_icons.splice(index,1);
            $(this).removeClass('checked');
        }
    });


    all_fonts.click(function(){
        var font_name = $(this).attr('data-name');
        var index = $.inArray(font_name, select_fonts);
        if(index == -1){
            select_fonts.push(font_name);
            $(this).addClass('checked');
        }else{
            select_fonts.splice(index,1);
            $(this).removeClass('checked');
        }

        //console.log(select_fonts);
    });

    selected_fonts.click(function(){
        var font_name = $(this).attr('data-name');
        var index = $.inArray(font_name, selected_widget_fonts);
        if(index == -1){
            selected_widget_fonts.push(font_name);
            $(this).addClass('checked');
        }else{
            selected_widget_fonts.splice(index,1);
            $(this).removeClass('checked');
        }
        //console.log(selected_widget_fonts);
    });


    addIconsBtn.click(function(){
        if(select_icons.length > 0){
            var widget = $('#widget-name').val();
            var theme = $('#theme-name').val();
            $.post('phpService/addWidgetIcon.php',
                {widget:widget, theme:theme,select_icons:select_icons},
                function(data,status){
                    if(data == 1 && status=='success'){
                        util2.showMessage('添加成功...',util2.msg_style_info);
                        setTimeout("location.reload();",1000);
                    }else{
                        util2.showMessage('添加失败',util2.msg_style_danger);
                    }
                });
        }else{
            util2.showMessage('请选择要添加的图片',util2.msg_style_danger);
        }

    });

    setBgBtn.click(function(){
        if(selected_widget_icons.length == 1){
            var widget = $('#widget-name').val();
            var theme = $('#theme-name').val();
            $.post('phpService/modfiyIcon.php',
                {widget:widget, theme:theme,selected_widget_icons:selected_widget_icons,type:'set_bg'},
                function(data,status){
                    if(data == 1 && status=='success'){
                        util2.showMessage('设置成功...',util2.msg_style_info);
                        setTimeout("location.reload();",1000);
                    }else{
                        util2.showMessage('设置失败',util2.msg_style_danger);
                    }
                });
        }else{
            util2.showMessage('选择图片数目不对',util2.msg_style_danger);
        }
    });

    delIconBtn.click(function(){
        if(selected_widget_icons.length > 0){
            var widget = $('#widget-name').val();
            var theme = $('#theme-name').val();
            $.post('phpService/modfiyIcon.php',
                {widget:widget, theme:theme,selected_widget_icons:selected_widget_icons,type:'delete_icons'},
                function(data,status){
                    if(data == 1 && status=='success'){
                        util2.showMessage('删除成功...',util2.msg_style_info);
                        setTimeout("location.reload();",1000);
                    }else{
                        util2.showMessage('删除失败',util2.msg_style_danger);
                    }
                });
        }else{
            util2.showMessage('选择图片数目不对',util2.msg_style_danger);
        }

    });


    addFontsBtn.click(function(){
        if(select_fonts.length > 0){
            var widget = $('#widget-name').val();
            var theme = $('#theme-name').val();
            $.post('phpService/addWidgetFonts.php',
                {widget:widget, theme:theme,select_fonts:select_fonts},
                function(data,status){
                    if(data == 1 && status=='success'){
                        util2.showMessage('添加成功...',util2.msg_style_info);
                        setTimeout("location.reload();",1000);
                    }else{
                        util2.showMessage('添加失败',util2.msg_style_danger);
                    }
                });
        }else{
            util2.showMessage('请选择要添加的字体',util2.msg_style_danger);
        }

    });

    delFontsBtn.click(function(){
        if(selected_widget_fonts.length > 0){
            var widget = $('#widget-name').val();
            var theme = $('#theme-name').val();
            $.post('phpService/delWidgetFonts.php',
                {widget:widget, theme:theme,selected_widget_fonts:selected_widget_fonts},
                function(data,status){
                    if(data == 1 && status=='success'){
                        util2.showMessage('删除成功...',util2.msg_style_info);
                        setTimeout("location.reload();",1000);
                    }else{
                        util2.showMessage('添加失败',util2.msg_style_danger);
                    }
                });
        }else{
            util2.showMessage('请选择要删除的字体',util2.msg_style_danger);
        }

    });



    var setClockMinBtn = $('#set-clock-min-btn');
    setClockMinBtn.click(function(){
            if(selected_widget_icons.length == 1){
                var widget = $('#widget-name').val();
                var theme = $('#theme-name').val();
                $.post('phpService/modfiyIcon.php',
                    {widget:widget, theme:theme,selected_widget_icons:selected_widget_icons,type:'set_clock_min'},
                    function(data,status){
                        if(data == 1 && status=='success'){
                            util2.showMessage('设置成功...',util2.msg_style_info);
                            setTimeout("location.reload();",1000);
                        }else{
                            util2.showMessage('设置失败',util2.msg_style_danger);
                        }
                    });
            }else{
                util2.showMessage('选择图片数目不对',util2.msg_style_danger);
            }
        }
    );


    var setClockHourBtn = $('#set-clock-hour-btn');
    setClockHourBtn.click(function(){
            if(selected_widget_icons.length == 1){
                var widget = $('#widget-name').val();
                var theme = $('#theme-name').val();
                $.post('phpService/modfiyIcon.php',
                    {widget:widget, theme:theme,selected_widget_icons:selected_widget_icons,type:'set_clock_hour'},
                    function(data,status){
                        if(data == 1 && status=='success'){
                            util2.showMessage('设置成功...',util2.msg_style_info);
                            setTimeout("location.reload();",1000);
                        }else{
                            util2.showMessage('设置失败',util2.msg_style_danger);
                        }
                    });
            }else{
                util2.showMessage('选择图片数目不对',util2.msg_style_danger);
            }
        }
    );


    var imgUplaodBtn = $('#img-upload');
    imgUplaodBtn.change(function(){
            if(util2.isImage(imgUplaodBtn.val())){
                $("#img-form").submit();
            }else{
                util2.showMessage('请上传图片!!',util2.msg_style_danger);
            }
        }
    );

    var errorBtn = $("#error-btn");
    errorBtn.click(function(){
        var widget =  $('#widget-name').val();
        $.post('phpService/errorWidget.php',
            {widget:widget},
            function(data,status){
                if(data == 1 && status=='success'){
                    util2.showMessage('添加成功...',util2.msg_style_info);
                    errorBtn.addClass('btn-danger');
                    //errorBtn.removeClass('error-btn');
                    errorBtn.html('有误插件');
                }else{
                    util2.showMessage('系统异常',util2.msg_style_danger);
                }
            });
    });


});