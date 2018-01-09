"use strict"
// 面向对象版轮播

// 构造函数
function Swiper(obj = arg) {
    this.el = obj.el;                      // 根元素 id/class
    this.paginationCSS = obj.pagination; // 分页器 id/class
    this.prevButtonCSS = obj.prevButton; // 上一张按钮 id/class
    this.nextButtonCSS = obj.nextButton; // 下一张按钮 id/class
    this.warpperCSS = obj.warpper; // 下一张按钮 id/class
    this.paginationActiveCss = obj.active.slice(1); //分页器 active css
    this.curIndex = obj.initialSlide || 1; // 初始位置
    this.autoplay = obj.autoplay || 2000; // 自动切换时间间隔
    this.speed = obj.speed || 900; // 滑动时间
    this.fps = obj.fps || 50;

    // 内部变量 
    // this.container = null;
    // this.pagination;
    // this.warpper;
    // // this.nextButton;
    // this.prevButton;

    // this.width = null;
    // this.autoTimer;
    // this.animateTimer;
    // this.imgLen;

    this.initElement();
    this.initEvent();
    this.autoTimer = this.autoplayFunc();
    // this.jump(5)
}

// 初始化元素,绑定到对象内部
Swiper.prototype.initElement = function () {
    // 绑定 container、warper、pagination、prevButton、nextButton
    this.container = this.getElement(this.el);
    this.warpper = this.getElement(this.warpperCSS);
    this.pagination = this.getElement(this.paginationCSS).children;
    this.nextButton = this.getElement(this.nextButtonCSS);
    this.prevButton = this.getElement(this.prevButtonCSS);
    // 获取宽度
    this.width = this.container.offsetWidth;
    this.imgLen = this.warpper.children.length;
    // 位置初始化
    this.warpper.style.left = this.width * this.curIndex * -1 + 'px';

    // console.log(this.nextButton)
}
// 初始化事件
Swiper.prototype.initEvent = function () {
    var _this = this;
    // 下一张
    this.nextButton.onclick = function () {
        _this.jump(++_this.curIndex);
    }
    this.nextButton.onmouseover = function () {
        clearInterval(_this.autoTimer);
    }
    this.nextButton.onmouseout = function () {
        _this.autoTimer = _this.autoplayFunc();
    }
    // 上一张
    this.prevButton.onclick = function () {
        _this.jump(--_this.curIndex);
    }
    this.prevButton.onmouseover = function () {
        clearInterval(_this.autoTimer);
    }
    this.prevButton.onmouseout = function () {
        _this.autoTimer = _this.autoplayFunc();
    }
    // pagination (小圆点组)
    for (var i = 0; i < this.pagination.length; i++) {
        void function (_i) {
            var element = _this.pagination[i];
            element.onmouseover = function () {
                clearInterval(_this.autoTimer);
                _this.jump(_i + 1);
            }
            element.onmouseout = function () {
                _this.autoTimer = _this.autoplayFunc();
            }
        }(i)
    }
}

// 图片切换
Swiper.prototype.jump = function (index) {
    // 边界检测
    if (index >= this.imgLen - 1) {
        this.warpper.style.left = '0px';
        index = 1;
    }

    // 图片切换
    // this.warpper.style.left=this.width*index*_1+'px';
    this.animateTimer = this.animation(index, this.fps, this.speed)

    // pagination (小圆点) 切换
    // 这里默认样式 class 为空
    for (var key in this.pagination) {
        if (this.pagination.hasOwnProperty(key)) {
            var element = this.pagination[key];
            if ((index - 1) == key) {
                element.className = this.paginationActiveCss;
            } else {
                element.className = '';
            }
        }
    }

    // 索引更新
    this.curIndex = index;
}

// 切换动画,返回执行动画的定时器
Swiper.prototype.animation = function (index, fps = 50, time = 400) {
    var that = this;
    this.animateTimer && clearInterval(this.animateTimer);
    var count = fps * time / 1000;
    var distance = (parseFloat(this.warpper.style.left) + index * this.width) / count;
    return setInterval(function () {
        (count--) ? (that.warpper.style.left = parseFloat(that.warpper.style.left) - distance + 'px') : clearInterval(that.animateTimer);
        // console.log('当前位置'+parseFloat(that.warpper.style.left))
        // console.log(`移动${distance},还剩${count}次`)
    }, 1000 / fps)
}

// 自动播放,返回自动播放的定时器
Swiper.prototype.autoplayFunc = function () {
    var _this = this;
    this.autoTimer && clearInterval(this.autoTimer);
    return setInterval(function () {
        _this.jump(++_this.curIndex)
    }, _this.autoplay)
}


// 获取 id/class 并返回 HTMLCollection[0]/HTMLElement
Swiper.prototype.getElement = function (el) {
    if (el[0] === '.') {
        return document.getElementsByClassName(el.slice(1))[0]
    } else if (el[0] === '#') {
        return document.getElementById(el.slice(1))
    }
    else {
        return new Error(`argument only id/class,like '#root' or '.container'`)
    }
}

// 传入的参数
var arg = {
    el: '.swiper-container',
    warpper: '.swiper-warpper',
    pagination: '.swiper-pagination',
    nextButton: '#swiper-button-next',
    prevButton: '#swiper-button-prev',
    active: '.swiper-pagination-on'
};
window.onload = function () {
    new Swiper(arg)
}