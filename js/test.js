$().ready(function(){
    var curIndex=1;
    var imgLen=$('.imgList li').length;
    var PIC_WIDTH=500;
    var PLAY_TIME=1000;
    
    // 存入自动播放的定时器 
    var autoPlay=setInterval(function(){
        $('#next').trigger('click')
    },PLAY_TIME)

    // 跳转到第 num 个图片
    function jumpTo(index){
        bannerTo(index);
        pointTo(index);
        infoTo(index);
    };
    // 轮播图跳转
    function bannerTo(index){
        var left=(index-1)*PIC_WIDTH;
        $('.imgList').stop().animate({left:"-"+left+"px"},500);
    }
    // 小圆点跳转
    function pointTo(index){
        $('.indexList>li').removeClass('banner-index-on').eq(index-1).addClass('banner-index-on');
    }
    // info 跳转
    function infoTo(index){
        $('.infoList>li').hide().eq(index-1).show();
    }

    // 自动播放函数
    function autoPlayFunc(){
        autoPlay=setInterval(function(){
            curIndex=curIndex<imgLen?++curIndex:1;
            jumpTo(curIndex)
        },PLAY_TIME)
    }


    // 绑定 next
    $("#next").click(function(){
        curIndex=curIndex<imgLen?++curIndex:1;
        jumpTo(curIndex)
    })
    $("#next").hover(function(){
        clearInterval(autoPlay)
    },function(){
        autoPlayFunc()
    })

    // 绑定 prev
    $("#prev").click(function(){
        curIndex=curIndex<=1?imgLen:--curIndex;
        jumpTo(curIndex)
    })
    $("#prev").hover(function(){
        clearInterval(autoPlay)
    },function(){
        autoPlayFunc()
    })



    // 小圆点 hover 停止自动播放，并自动跳转到对应图片
    $('.indexList>li').each(function(index){
        $(this).hover(function(){
            clearInterval(autoPlay);
            curIndex=index+1;
            jumpTo(curIndex);
        },function(){
            autoPlayFunc();
        })
    })
})
