/**
 * @doc 消息提示类
 * @author Heanes
 * @time 2016-12-12 11:47:21 周一
 */
;$.extend({

    /* ------------------------------ 提示消息类 ------------------------------ */
    // 消息常量
    messageConstants: {
        // 消息类型
        type: {
            success:    'success',  // 成功
            info:       'info',     // 提示
            warn:       'warn',     // 警告
            error:      'error',    // 错误
            loading:    'loading'   // 加载中
        },
        noticeType: {
            default:    'local',    // 局部
            global:     'global'    // 全局
        },
        // 模版
        template: '<div class="message-wrap">\n' +
            '         <div class="message">\n' +
            '             <div class="message-handle-section">\n' +
            '                 <span class="btn-close">x</span>\n' +
            '             </div>\n' +
            '             <div class="message-content-section">\n' +
            '                 <div class="message-icon">\n' +
            '                     <div class="icon-background">\n' +
            '                     </div>\n' +
            '                 </div>\n' +
            '                 <div class="message-content-wrap">\n' +
            '                     <div class="message-title">\n' +
            '                     </div>\n' +
            '                     <div class="message-content">\n' +
            '                     </div>\n' +
            '                 </div>\n' +
            '             </div>\n' +
            '         </div>\n' +
            '     </div>',
        defaultParams: {
            $container:     undefined,      // 消息显示容器
            $content:       '消息内容',      // string || object(jQuery) 消息内容
            $title:         '提示',         // string || object(jQuery) 消息内容
            type:           'info',         // string success||error||warn||info消息类型
            noticeType:     'local',        // local||global 消息通知方式
            showTime:       3000,           // int 展示时间，单位为毫秒
            autoClose:      true,           // boolean 是否自动关闭
            fadeOutDelay:   500,            // int 消失动画延迟时间，单位为毫秒
            canBeClose:     true,           // boolean 是否能被关闭
            onClose:        undefined,      // 当消息关闭时的回调函数
            showIcon:       false,          // boolean 是否显示图标
            classPrefix:    ''              // 样式前缀，方便自定义样式
        }
    },
    /**
     * @doc 消息展示加强版，用对象方式定义参数 todo 增加时间戳；记录消息历史
     * @author Heanes
     * @time 2016-12-13 12:04:53 周二
     */
    message: function messagePlus(paramObject){
        paramObject = $.extend({}, this.messageConstants.defaultParams, paramObject);

        // 如果是全局
        if(paramObject.noticeType === this.messageConstants.noticeType.global){
            var $documentTop = $(window.top.document); // 始终最顶层框架显示
            var $messageGlobal = $documentTop.find('.message-global');
            if(!$messageGlobal || $messageGlobal.length === 0){
                $messageGlobal = $('<div class="message-global">');
                $documentTop.find('body').append($messageGlobal);
            }
            paramObject.$container = $messageGlobal;
        }

        if(paramObject.noticeType === this.messageConstants.noticeType.local){
            if(paramObject.$container === undefined || paramObject.$container.length === 0) console.error('Error: the message container is null');
        }

        var $messageWrap = $(this.messageConstants.template);
        var $message = $messageWrap.find('.message');
        var $messageContentSection = $message.find('.message-content-section');

        // 样式前缀
        if(paramObject.classPrefix){
            var messageClassPrefix = paramObject.classPrefix + '-message';
            $message.addClass(messageClassPrefix);
        }

        // 消息体
        var $messageContentWrap = $messageContentSection.find('.message-content-wrap');
        var $messageTitle = $messageContentWrap.find('.message-title');
        // 消息图标
        var $messageIconWrap = $messageContentSection.find('.message-icon');
        var $messageIcon = $messageIconWrap.find('.icon-background');
        // 消息标题
        $messageTitle.append(paramObject.$title);
        // 消息正文内容
        var $messageContent = $messageContentSection.find('.message-content');
        $messageContent.append(paramObject.$content);
        switch (paramObject.type){
            case this.messageConstants.type.success:
                $message.addClass('message-success');
                $messageIcon.append('<i class="fa fa-check"></i>');
                break;
            case this.messageConstants.type.info:
                $message.addClass('message-info');
                $messageIcon.append('<i class="fa fa-info"></i>');
                break;
            case this.messageConstants.type.warn:
                $message.addClass('message-warning');
                $messageIcon.append('<i class="fa fa-warning"></i>');
                break;
            case this.messageConstants.type.error:
                $message.addClass('message-error');
                $messageIcon.append('<i class="fa fa-close"></i>');
                break;
            default:
                $message.addClass('message-info');
                $messageIcon.append('<i class="fa fa-info"></i>');
                break;
        }
        paramObject.$container.append($messageWrap).show();
        if(paramObject.autoClose){
            // 超时后自动关闭
            if(paramObject.showTime !== 0){
                $messageWrap.delay(paramObject.showTime).fadeOut(paramObject.fadeOutDelay, function(){
                    $messageWrap.remove();
                    $messageWrap.trigger('close');
                });
            }
        }
        // 点击关闭
        $messageWrap.on('click', '.btn-close', function (event) {
            var $delegateTarget = $(event.delegateTarget);
            $delegateTarget.stop().fadeOut(paramObject.fadeOutDelay, function(){$messageWrap.remove()});
            if(typeof paramObject.onClose === 'function'){
                paramObject.onClose($messageWrap);
            }
        });
    }
    /* ------------------------------ 提示消息类 ------------------------------ */
});