// 原生js
window.onload = function () {
    var SWIPER_CONTAINER = 'swiper-container'
    var PAGINATION_CLASS = 'swiper-pagination'
    var SWIPER_CLASS = 'swiper-warpper'
    var BUTTON_NEXT_ID = 'swiper-button-next'
    var BUTTON_PREV_ID = 'swiper-button-prev'
    var width, imgLen, timer, curIdx = 1, moveTimer;
    var next, prev, wrapper, pagination, pointArr;

    void function init() {
        var swiper = document.getElementsByClassName(SWIPER_CONTAINER)[0];
        width = swiper.offsetWidth;
        imgLen = swiper.getElementsByTagName("li").length;
        wrapper = document.getElementsByClassName(SWIPER_CLASS)[0];
        pagination = document.getElementsByClassName(PAGINATION_CLASS)[0];
        next = document.getElementById(BUTTON_NEXT_ID);
        prev = document.getElementById(BUTTON_PREV_ID);
        pointArr = pagination.children;

        event_init();   // 事件初始化

        wrapper.style.left = -curIdx * width + "px";// 图片切换到初始位置
        paginationJump(curIdx); // 分页器切换到初始位置

        autoPlay(); // 开始自动播放
    }()

    /* 切换 */
    function jump(index) {
        curIdx = fixIndex(index);
        swiperJump(curIdx)
        paginationJump(curIdx);
    }
    // curIdx 超出不可见索引时修正
    function fixIndex(index) {
        if (index >= imgLen - 1) {
            wrapper.style.left = "0";
            index = 1;
        } else if (index < 1) {
            wrapper.style.left = -1 * width * (imgLen - 1) + "px";
            index = imgLen - 2;
        }
        return index;
    }
    // 轮播图左滑
    function swiperJump(index) {
        moveTimer = move(curIdx);
    }
    // 图片移动动画,从当前位置移动到 index
    function move(index, fps = 50, time = 400) {
        moveTimer && clearInterval(moveTimer);
        var count = fps * time / 1000;
        var distance = (parseFloat(wrapper.style.left,10) + index * width) / count;
        return setInterval(function () {
            (count--) ? (wrapper.style.left = parseFloat(wrapper.style.left,10) - distance + 'px') : clearInterval(moveTimer);
            console.log('当前位置'+parseFloat(wrapper.style.left,10))
            console.log(`移动${distance},还剩${count}次`)
        }, 1000 / fps)
    }
    function autoPlay() {
        timer = setInterval(function () {
            jump(++curIdx)
        }, 2000)
    }
    // 分页器(小圆点)切换
    function paginationJump(index) {
        var list = pagination.children;
        for (var key in list) {
            if (list.hasOwnProperty(key)) {
                var element = list[key];
                if ((index - 1) == key) {
                    element.className = 'swiper-pagination-on'
                } else {
                    element.className = '';
                }
            }
        }
        return index;
    }

    /* 事件绑定 */
    function event_init() {
        // 下一张按钮
        next.onclick = function () {
            jump(++curIdx);
        }
        next.onmouseover = function () {
            clearInterval(timer);
        }
        next.onmouseout = function () {
            autoPlay();
        }
        // 上一张按钮
        prev.onclick = function () {
            jump(--curIdx)
        }
        prev.onmouseover = function () {
            clearInterval(timer);
        }
        prev.onmouseout = function () {
            autoPlay();
        }
        // 分页器(小圆点),移入移出事件
        for (var i = 0; i < pointArr.length; i++) {
            (function (_i) {
                pointArr[_i].onmouseover = function () {
                    clearInterval(timer);
                    curIdx = _i + 1;
                    jump(curIdx)
                }
                pointArr[_i].onmouseout = function () {
                    autoPlay();
                }
            })(i)
        }
    }
}