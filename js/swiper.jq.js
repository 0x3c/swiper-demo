$().ready(function(){
    var curIdx,imgLen,imgWid,timer;
    
    function init(){
        curIdx=1;
        imgLen=$('.swiper-warpper').find('li').length-2;
        imgWid=$('.swiper-warpper>li').width();
        // console.log(typeof imgWid)
        curIdx=jump(1)
        timer=setInterval(function(){
            curIdx=jump(++curIdx);
        },1000)
    }
    function jump(index){
        return paginaJump(swiperJump(index));
    }
    // 图片左滑
    // 返回新的curIdx
    function swiperJump(index){
        if(index>imgLen){
            $('.swiper-warpper').css("left",0);
            index=1;
        }else if(index<1){
            $('.swiper-warpper').css("left",-imgWid*(imgLen+1)+"px");
            index=imgLen;
        }
        var left=index*imgWid;  
        $('.swiper-warpper').stop().animate({left:"-"+left+"px"},500)
        return index;
    }

    // 分页器跳转
     function paginaJump(index){
        $('.swiper-pagination span').removeClass('swiper-pagination-on')
        .eq(index-1).addClass('swiper-pagination-on')
        return index;
    }

    // 自动播放
    function autoPlay(){
        timer=setInterval(function(){
            curIdx=jump(++curIdx);
        },1000)
    }
   

    /* 按钮事件 */
    // 后退按钮
    $("#swiper-button-prev").click(function(){
        curIdx=jump(--curIdx)
    }).hover(function(){
        clearInterval(timer)
    },function(){
        autoPlay();
    })
    // 前进按钮
    $("#swiper-button-next").click(function(){
        curIdx=jump(++curIdx)
    }).hover(function(){
        clearInterval(timer)
    },function(){
        autoPlay();
    })
    // 分页器事件
    $('.swiper-pagination span').each(function(index){
        $(this).hover(function(){
            clearInterval(timer)
            curIdx=jump(index+1)
        },function(){
            autoPlay();
        })
    })
    init();

})