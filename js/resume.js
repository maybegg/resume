/**
 * Created by sym on 2016/11/29.
 */
document.addEventListener('touchmove',function(e){
    e.preventDefault();
});
$('img').on('touchmove',function(e){
    e.preventDefault();
});
var p1 = document.getElementsByClassName('p1')[0];
var p2 = document.getElementsByClassName('p2')[0];
var mySwiper = new Swiper('.swiper-container',{
    direction:'vertical',
    pagination:'.swiper-pagination',
    loop:true,
    effect:'coverflow',
    onTransitionEnd:function(swiper){
        var curIndex = swiper.activeIndex;
        var slides = swiper.slides;
        [].forEach.call(slides,function(item,index){
            item.id='';
            if(index === curIndex){
                switch (index){
                    case 0:
                        item.id = 'page' + (slides.length - 2);
                        break;
                    case slides.length-1:
                        item.id = 'page1';
                        break;
                    case 2:
                        item.id = 'page3';
                        break;
                    case 3:
                        item.id = 'page2';
                        break;
                    default :
                        item.id = 'page' + curIndex;
                }
                if(index === 4){
                    p1.innerHTML = p2.innerHTML = '';
                    var str1 = 'jQuery、es6、bootstrap、vue、Zepto、swiper、touch模型、iscroll、React';
                    var str2 = '上面说的一个不会';
                    var n=0;
                    window.setTimeout(function(){
                        var timer = window.setInterval(function(){
                            p1.innerHTML += str1.charAt(n);
                            p2.innerHTML += str2.charAt(n);
                            if(n==str1.length){
                                window.clearInterval(timer);
                                return;
                            }
                            n++;
                        },50);
                    },1200);
                }
                if(index === 2){
                    cubeRender.init();
                }
            }

        });

    }
});
var music = document.querySelector('.music');
var beyond = document.querySelector('#m');
window.setTimeout(function(){
    beyond.play();
    beyond.addEventListener('canplay',function(){
        music.style.opacity = '1';
        music.className = 'music musicCur'
    },false);
},1500);
music.addEventListener('click',function(){
    if(beyond.paused){
        beyond.play(); //播放
        music.className = 'music musicCur';
    }else{
        beyond.pause(); //停止
        music.className = 'music';
    }
},false);

var cubeRender = (function(){
    var $m = $('.mofang');
    function start (e){
        var point = e.touches[0];
        var strX = point.pageX,
            strY = point.pageY;
        $(this).attr({
            strX:strX,
            strY:strY,
            changeX:0,
            changeY:0,
            isMove:false
        });
    }
    function moving (e){
        var point = e.touches[0];
        var changeX = point.pageX - parseFloat($(this).attr('strX')),
            changeY = point.pageY - parseFloat($(this).attr('strY'));

            $(this).attr({
            changeX:changeX,
            changeY:changeY
        });
        if(Math.abs(changeX) > 10 || Math.abs(changeY) > 10){
            $(this).attr('isMove',true);
        }


    }
    function end (e){
        var changeX = parseFloat($(this).attr('changeX')),
            changeY = parseFloat($(this).attr('changeY')),
            isMove = $(this).attr('isMove');
        if(isMove === 'false') return;
        var rotateX = parseFloat($(this).attr('rotateX')),
            rotateY = parseFloat($(this).attr('rotateY'));
        rotateX = rotateX - changeY;
        rotateY = rotateY + changeX;
        $(this).css('transition','.5s').css('transform','scale(0.6) rotateX('+rotateX+'deg) rotateY('+rotateY+'deg)').attr({
            rotateX:rotateX,
            rotateY:rotateY
        });
    }
    return {
        init:function(){
            $m.attr({
                rotateX:-30,
                rotateY:45
            });
            $m.on('touchstart',start).on('touchmove',moving).on('touchend',end);
        }
    }
})();

