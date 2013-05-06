/**
 * -----------------------------------------------------------------------------
 *  /plugins.js
 * -----------------------------------------------------------------------------
 */

// Avoid `console` errors in browsers that lack a console.
if (!(window.console && console.log)) {
    (function() {
        var noop = function() {};
        var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'markTimeline', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
        var length = methods.length;
        var console = window.console = {};
        while (length--) {
            console[methods[length]] = noop;
        }
    }());
}

// Place any jQuery/helper plugins in here.


/**
 * -----------------------------------------------------------------------------
 *  /main.js
 * -----------------------------------------------------------------------------
 */

$(document).ready(function() {
  jQuery.fn.nextOrFirst = function(selector){
      var next = this.next(selector);
      return (next.length) ? next : this.prevAll(selector).last();
  }
  jQuery.fn.prevOrLast = function(selector){
      var prev = this.prev(selector);
      return (prev.length) ? prev : this.nextAll(selector).last();
  }
  // restucture aside for mobile version
  function reflow() {
    if($('.document').length){
      var aside = $('#content section aside').not('.item-meta').not('.right-bar');
    } else {
      var aside = $('#content section > aside').not('.item-meta').not('.right-bar');
    }
    var feedback = $('#feedback');

    if($(window).width() < 768) {
      var rightbar = $('#content section aside.right-bar');
      if($('.document').length){
        $('#content section aside').not('.item-meta').not('.right-bar').remove();
      } else {
        $('#content section > aside').not('.item-meta').not('.right-bar').remove();
      }
      $('#content section aside.right-bar').remove();
      $('#feedback').remove();
      aside.addClass('moved-bottom');
      $('#content > section').append(aside);
      $('#content > section').append(rightbar);
      $('#content > section').append(feedback);
      $('#content.document > section .sidebar-all').remove();
    } else if($(window).width() < 980) {
      var rightbar = $('#content section > aside.right-bar');
      $('#content.document section > aside.right-bar').remove();
      if(!$("#content.document > section div.sidebar-all").length){
        $('#content.document > section article').before('<div class="sidebar-all"></div>');
        $('#content.document > section .sidebar-all').append(aside);
      }
      $('#content.document > section .sidebar-all').append(rightbar);
    }
    else if($(window).width() < 1040) {
      var thisArticle = $('#content section > article');
      var rightbar = $('#content section aside.right-bar');
      aside.removeClass('moved-bottom');
      $('#content section > aside').not('.item-meta').not('.right-bar').remove();
      $('#feedback').remove();
      if(!$("#content.document > section div.sidebar-all").length){
        $('#content.document > section article').before('<div class="sidebar-all"></div>');
        $('#content.document > section .sidebar-all').append(aside);
      }
      if (!$('.document').length){
        $('#content > section article').after(aside);
        $('#content > section article').after(feedback);
      }
      $('#content > section').append(rightbar);
      $('#content > section').append(feedback);
    }
    else {
      var rightbar = $('#content section aside.right-bar');
      if($('#content > section > article').length) {
        $('#content > section > article').before(aside);
        $('#content > section > article').append(feedback);
      }
      else if($('#content > section > aside.item-meta').length) {
        $('#content > section > aside.item-meta').after(aside);
      }
      else {
        $('#content > section > h1').after(aside);
      }
      $('#content.document > section .sidebar-all').remove();
      $('#content > section').append(rightbar);
    }

  }
  reflow();
  $(window).resize(function() {
    reflow();
  });

  // Left menu toggling

  $('#content aside nav > ul > li ul').hide();
  $('#content aside nav > ul > li ul.visible').show();
  $('#content aside nav > ul > li ul').parent().children('a').click(function(e){
    e.preventDefault();
    $(this).parent().find('ul').slideToggle(300);
  });

  // Search Toggling
  $('.show-search').click(function(e) {
    e.preventDefault();
    $(this).next('form').slideToggle(420);
  });

  /** Slidy FAQs **/
  $(".answer").hide();

  $('.question a').click(function(e) {
    e.preventDefault();
    $(this).parent().next('.answer').slideToggle(300);
  });

  // Taxonomy Toggle

  //Announcement closing

  $('.important .close').click(function(e) {
    e.preventDefault();
    $(this).parent().parent().slideUp(300);
  });

  var showMarker = 1;
  if($('.taxonomy.container').length) { var taxonomyOffset = $('.taxonomy.container').offset().top; }
  var marthaOffset = 0;
  var visibleTopics;

  if($('.sidebar').length) { var sidebarTop = $('.sidebar').offset().top; }

  /*
$('.inner-slide').hide();
  $('.inner-slide.active').show();
*/

  $('.inner-slides').each(function() {
    var count = $(this).children('li').length;
    if(count > 1) {
      $(this).addClass('draggable');
      $(this).css({'width': (count * 100) + '%'});
      $(this).children('li').css({'width': (100 / count) + '%'});
      $(this).after('<nav><ul></ul></nav>');
      $(this).children('li').each(function(){
        if($(this).index() == 0) {
          $(this).parent().parent().children('nav').children('ul').append('<li class="active"><a href="#"></a></li>');
        }
        else {
          $(this).parent().parent().children('nav').children('ul').append('<li><a href="#"></a></li>');
        }
      });
    }
  });

  $('.slide nav a').live('click', function(e){
    e.preventDefault();
    $(this).parent().parent().children('li').removeClass('active');
    $(this).parent().addClass('active');
    var index = $(this).parent().index();
    $(this).parent().parent().parent().parent().children('.inner-slides').animate({'margin-left':'-' + (index * 100) + '%'}, 400);
    var activeSlide = $('.martha .slide.active');
    if(!$(activeSlide).children('nav').children('ul').children('.active').prev().length) {
      $('.martha-direction.icon-left-open').hide();
      $('.martha-direction.icon-right-open').show();
    }
    else if(!$(activeSlide).children('nav').children('ul').children('.active').next().length) {
      $('.martha-direction.icon-right-open').hide();
      $('.martha-direction.icon-left-open').show();
    }
  });

  $(window).scroll(function() {
    if($(window).scrollTop() > sidebarTop) {
      $('.sidebar h2').addClass('fixed');
      $('.sidebar nav').addClass('fixed');
    }
    else {
      $('.sidebar h2').removeClass('fixed');
      $('.sidebar nav').removeClass('fixed');
    }
  });

  $('.taxonomy.container').append('<div class="more"><a class="btn-alt show-taxonomy" href="#">Can\'t find it? See other services <span class="icon-down-open"></span></a></div>');

  $('.taxonomy').on('click', '.show-taxonomy', function(e){
    e.preventDefault();
    taxonomyOffset = $('.taxonomy.container').offset().top;
    if($(window).width() > 619) {
      $('.taxonomy section .new-widget:nth-child(n + 6)').slideToggle(500);
    }
    else {
      $('.taxonomy section .new-widget:nth-child(n + 4)').slideToggle(500);
    }
    if($(this).children('.icon-down-open').length) {
      $(this).html('Fewer services <span class="icon-up-open"></span>');

      $('html, body').animate({scrollTop:taxonomyOffset}, 700);
    }
    else {
      $(this).html('Can\'t find it? See other services <span class="icon-down-open"></span>');
    }
    $('.taxonomy.container').toggleClass('expanded');
  });

  /** Martha **/
  function updateActive() {
    var windowWidth = $('.martha-nav > section').outerWidth();
    var activeOffset = $('.martha-nav .active').offset().left - $('.martha-nav > section').offset().left;
    var activeWidth = $('.martha-nav .active').outerWidth();
    var activePosition = activeOffset + (activeWidth / 2);
    var activePercent = (activePosition / windowWidth) * 100;
    if(!$('.martha-nav .marker').length) {
      $('.martha-nav > section').append('<span class="marker"></span>');
    }
    if($('.martha > section > ul').hasClass('expanded')) {
      $('.martha-nav .marker').show().animate({'margin-left':activePercent + '%'}, 620);
    }
    else {
      $('.martha-nav .marker').show().css({'margin-left':activePercent + '%'});
    }
    if($(window).width() < 620) {
      $('.martha-close').delay(300).fadeIn(320).css({'left':(activePercent) + '%'});
    }
  }

  $('.martha-direction').hide();

  function showSlide(slideNumber) {
    marthaOffset = $('.martha-nav').offset().top;
    $('html, body').animate({scrollTop:marthaOffset}, 700);
    var slide = $('.martha .slide').get(slideNumber);
    $('.martha .slide').css({'visibility':'hidden'}).removeClass('active');
    $(slide).addClass('active').css({'visibility':'visible'});
    if($(slide).children('.inner-slides').hasClass('draggable')) {
      $('.martha-direction').show();
      if(!$(slide).children('nav').children('ul').children('.active').prev().length) {
        $('.martha-direction.icon-left-open').hide();
      }
      else if(!$(slide).children('nav').children('ul').children('.active').next().length) {
        $('.martha-direction.icon-right-open').hide();
      }
    }
    else {
      $('.martha-direction').hide();
    }
    var slidePercent = slideNumber * 100;
    if($('.martha > section > ul').hasClass('expanded')) {
      $('.martha > section > ul').animate({'margin-left':'-'+slidePercent+'%'}, 480);
    }
    else {
      $('.martha > section > ul').css({'margin-left':'-'+slidePercent+'%'}).slideDown(400).addClass('expanded');
    }

  }

  $('.martha-direction.icon-left-open').click(function(e){
    var activeSlide = $('.martha .slide.active');
    if($(activeSlide).children('nav').children('ul').children('.active').prev().length) {
      $(activeSlide).children('nav').children('ul').children('.active').prev().children('a').click();
    }
  });

  $('.martha-direction.icon-right-open').click(function(e){
    var activeSlide = $('.martha .slide.active');
    if($(activeSlide).children('nav').children('ul').children('.active').next().length) {
      $(activeSlide).children('nav').children('ul').children('.active').next().children('a').click();
    }
  });

  $('.martha-nav a').click(function(e){
    e.preventDefault();
    if($(this).parent().hasClass('active')) {
      $('.nav-title').show();
      $('.martha-nav .active').removeClass('active');
      $('html, body').animate({scrollTop:0}, 700);
      $('.martha > section > ul').slideUp(400).removeClass('expanded');
      $('.marker').remove();
      $('.martha-close').remove();
      $('.martha-direction').hide();
    }
    else {
      $('.nav-title').show();

      if($(window).width() < 550) {
        $(this).find('.nav-title').delay(100).fadeOut(200);
      }
      $('.martha-nav .active').removeClass('active');
      $(this).parent().addClass('active');
      showSlide($(this).parent().index());

      $('.martha-close').remove();
      if($(window).width() < 620) {
        $('.tab-nav').parent().append('<a href="#" class="martha-close">&times;</a>');
      }
      else {
        $('.martha section').append('<a href="#" class="martha-close">&times;</a>');
      }
      updateActive();
    }
  });

  $('.martha-close').live('click', function(e) {
    e.preventDefault();
    $('.nav-title').show();
    $('.martha-nav .active').removeClass('active');
    $('html, body').animate({scrollTop:0}, 700);
    $('.martha > section > ul').slideUp(400).removeClass('expanded');
    $('.marker').remove();
    $('.martha-close').remove();
    $('.martha-direction').hide();
  });

  /** The variables used for checking touch move **/
  var startx,
    endx,
    starty,
    endy,
    moved,
    touched;

  /** Swiping Martha, saucy **/

  $('.draggable .inner-slide').bind('touchstart', function(e) {
    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
    startx = touch.pageX;
    starty = touch.pageY;
    moving = 0;
  });

  $('.draggable .inner-slide').bind('touchmove', function(e) {

    moving = 0;
    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];

    endx = touch.pageX;
    endy = touch.pageY;

    diffX = startx - endx;
    diffY = starty - endy;
    if(diffX < 0) { diffX *= -1; }
    if(diffY < 0) { diffY *= -1; }

    if(diffX > diffY && diffX > 20) {
      e.preventDefault();
      moving = 1;
      touched = $(this).index();
      var width = $(window).width();
      endx = touch.pageX;
      moved = startx - endx; // the movement in pixels from start to end
      var movedPercent = (moved / width) * 100;
      var moveBy = movedPercent + (touched * 100);
      if(moved < 0 && $(this).is(':first-child')) { moved = 0; moveBy = 0; }
      if(moved > 0 && $(this).is(':last-child')) { moved = 0; moveBy = touched * 100;}
      $(this).parent().css({'margin-left':'-' + (moveBy) + '%'});
    }
    else {
      moving = 0;
    }
  });

  $('.draggable .inner-slide').bind('touchend', function(e) {
    if(moved < -10 && moving == 1) {
      $(this).parent().css({'margin-left':'-'+ ((touched - 1) * 100) +'%'});
      $(this).parent().parent().children('nav').children('ul').children('li').removeClass('active');
      $(this).parent().parent().children('nav').children('ul').children('li').eq(touched - 1).addClass('active');
    }
    else if(moved > 10 && moving == 1) {
      $(this).parent().css({'margin-left':'-'+ ((touched + 1) * 100) +'%'});
      $(this).parent().parent().children('nav').children('ul').children('li').removeClass('active');
      $(this).parent().parent().children('nav').children('ul').children('li').eq(touched + 1).addClass('active');
    }
    else if(moving == 1) {
      // $(this).parent().css({'margin-left':'-'+ (touched * 100) +'%'});
    }
    moving = 0;
    var slide = $(this).parent().parent();
    if(!$(slide).children('nav').children('ul').children('.active').prev().length) {
      $('.martha-direction.icon-left-open').hide();
    }
    else if(!$(slide).children('nav').children('ul').children('.active').next().length) {
      $('.martha-direction.icon-right-open').hide();
    }
    if($(slide).children('nav').children('ul').children('.active').prev().length) {
      $('.martha-direction.icon-left-open').show();
    }
    if($(slide).children('nav').children('ul').children('.active').next().length) {
      $('.martha-direction.icon-right-open').show();
    }
  });

  var options = {};
  if($(".gallery-items").length) {
    $(".gallery-items a").photoSwipe(options);
  }

  /** MCC Feedback **/

  var mccPageFeedbackError = $('.errorMsg')[0];
  $('.showInfo').unbind('click');
  if (mccPageFeedbackError === undefined) {
    $('#divToHide').hide();
  }

  $('.showInfo').click(function(e){
    e.preventDefault();
    $('#divToHide').slideToggle();
  });

  $('.slide-nav nav').hide();
  $('.slide-nav h2').click(function(e){
    e.preventDefault();
    $(this).next('nav').slideToggle(300);
  });

  /** Councillor wards **/
  var i = 1;
  $('.wards li').each(function(){
    if(i > 5 && !$(this).hasClass('show-more-wards') ) {
      $(this).hide().addClass('aux');;
    }
    i++;
  });

  $('.show-more-wards a').click(function(e){
    e.preventDefault();
    $('.wards li.aux').slideToggle();
    if($(this).text() == 'Show more wards') {
      $(this).text('Show fewer wards');
    }
    else {
      $(this).text('Show more wards');
    }
  });
  $('[data-geo=postcode]').click(function(e){
    e.preventDefault();
    var postCode;
    if(postCode) {
      $('#postcode').val(postCode);
    }
    else if(navigator.geolocation) {
      $('#postcode').val('Finding postcode...');
      function setCoords(position) {
        var posLong = position.coords.longitude;
        var posLat = position.coords.latitude;
        $.get(
          '/site/custom_scripts/geolocation.php',
          {
            latitude: posLat,
            longitude: posLong
          }
        ).done(function(data) {
          postCode = data;
          $('#postcode').val(data);
        });
      }
      navigator.geolocation.getCurrentPosition(setCoords);
    }
  });

  $('.featured-item section').first().addClass('active');
  $('.slider a').first().addClass('active');
  $('.slider .icon-right-open').click(function(){
    var nextSlide = $('.slider a.active').nextOrFirst('a');
    var src = nextSlide.children('img').attr('src');

    if(src == "" || !src) {
      src = nextSlide.children('img').attr('data-delayed-src');
      $('.slider a.active').nextOrFirst('a').children('img').attr('src', src);
    }
    $('.slider a.active').removeClass('active').fadeOut(200).nextOrFirst('a').delay(210).fadeIn(300).addClass('active');
    $('.featured-item section.active').removeClass('active').fadeOut(200).nextOrFirst('section').delay(210).fadeIn(300).addClass('active');
  });
  $('.slider .icon-left-open').click(function(){
    var prevSlide = $('.slider a.active').prevOrLast('a');
    var src = prevSlide.children('img').attr('src');

    if(src == "" || !src) {
      src = prevSlide.children('img').attr('data-delayed-src');
      $('.slider a.active').prevOrLast('a').children('img').attr('src', src);
    }
    $('.slider a.active').removeClass('active').fadeOut(200).prevOrLast('a').delay(210).fadeIn(300).addClass('active');
    $('.featured-item section.active').removeClass('active').fadeOut(200).prevOrLast('section').delay(210).fadeIn(300).addClass('active');
  });

});


/**
 * -----------------------------------------------------------------------------
 *  /vendor/klass.min.js
 * -----------------------------------------------------------------------------
 */

/**
* Klass.js - copyright @dedfat
* version 1.0
* https://github.com/ded/klass
* Follow our software http://twitter.com/dedfat :)
* MIT License
*/
!function(a,b){function j(a,b){function c(){}c[e]=this[e];var d=this,g=new c,h=f(a),j=h?a:this,k=h?{}:a,l=function(){this.initialize?this.initialize.apply(this,arguments):(b||h&&d.apply(this,arguments),j.apply(this,arguments))};l.methods=function(a){i(g,a,d),l[e]=g;return this},l.methods.call(l,k).prototype.constructor=l,l.extend=arguments.callee,l[e].implement=l.statics=function(a,b){a=typeof a=="string"?function(){var c={};c[a]=b;return c}():a,i(this,a,d);return this};return l}function i(a,b,d){for(var g in b)b.hasOwnProperty(g)&&(a[g]=f(b[g])&&f(d[e][g])&&c.test(b[g])?h(g,b[g],d):b[g])}function h(a,b,c){return function(){var d=this.supr;this.supr=c[e][a];var f=b.apply(this,arguments);this.supr=d;return f}}function g(a){return j.call(f(a)?a:d,a,1)}var c=/xyz/.test(function(){xyz})?/\bsupr\b/:/.*/,d=function(){},e="prototype",f=function(a){return typeof a===b};if(typeof module!="undefined"&&module.exports)module.exports=g;else{var k=a.klass;g.noConflict=function(){a.klass=k;return this},a.klass=g}}(this,"function");


/**
 * -----------------------------------------------------------------------------
 *  /vendor/code.photoswipe.jquery-3.0.5.min.js
 * -----------------------------------------------------------------------------
 */

// PhotoSwipe - http://www.photoswipe.com/
// Copyright (c) 2012 by Code Computerlove (http://www.codecomputerlove.com)
// Licensed under the MIT license
// version: 3.0.5
(function(e){if(!Function.prototype.bind)Function.prototype.bind=function(d){var a=[].slice,b=a.call(arguments,1),c=this,g=function(){},f=function(){return c.apply(this instanceof g?this:d||{},b.concat(a.call(arguments)))};g.prototype=c.prototype;f.prototype=new g;return f};if(typeof e.Code==="undefined")e.Code={};e.Code.Util={registerNamespace:function(){var d=arguments,a=null,b,c,g,f,i;b=0;for(f=d.length;b<f;b++){g=d[b];g=g.split(".");a=g[0];typeof e[a]==="undefined"&&(e[a]={});a=e[a];c=1;for(i=
g.length;c<i;++c)a[g[c]]=a[g[c]]||{},a=a[g[c]]}},coalesce:function(){var d,a;d=0;for(a=arguments.length;d<a;d++)if(!this.isNothing(arguments[d]))return arguments[d];return null},extend:function(d,a,b){var c;this.isNothing(b)&&(b=!0);if(d&&a&&this.isObject(a))for(c in a)this.objectHasProperty(a,c)&&(b?d[c]=a[c]:typeof d[c]==="undefined"&&(d[c]=a[c]))},clone:function(d){var a={};this.extend(a,d);return a},isObject:function(d){return d instanceof Object},isFunction:function(d){return{}.toString.call(d)===
"[object Function]"},isArray:function(d){return d instanceof Array},isLikeArray:function(d){return typeof d.length==="number"},isNumber:function(d){return typeof d==="number"},isString:function(d){return typeof d==="string"},isNothing:function(d){if(typeof d==="undefined"||d===null)return!0;return!1},swapArrayElements:function(d,a,b){var c=d[a];d[a]=d[b];d[b]=c},trim:function(d){return d.replace(/^\s\s*/,"").replace(/\s\s*$/,"")},toCamelCase:function(d){return d.replace(/(\-[a-z])/g,function(a){return a.toUpperCase().replace("-",
"")})},toDashedCase:function(d){return d.replace(/([A-Z])/g,function(a){return"-"+a.toLowerCase()})},arrayIndexOf:function(d,a,b){var c,g,f,e;f=-1;c=0;for(g=a.length;c<g;c++)if(e=a[c],this.isNothing(b)){if(e===d){f=c;break}}else if(this.objectHasProperty(e,b)&&e[b]===d){f=c;break}return f},objectHasProperty:function(d,a){return d.hasOwnProperty?d.hasOwnProperty(a):"undefined"!==typeof d[a]}}})(window);
(function(e,d){d.Browser={ua:null,version:null,safari:null,webkit:null,opera:null,msie:null,chrome:null,mozilla:null,android:null,blackberry:null,iPad:null,iPhone:null,iPod:null,iOS:null,is3dSupported:null,isCSSTransformSupported:null,isTouchSupported:null,isGestureSupported:null,_detect:function(){this.ua=e.navigator.userAgent;this.version=this.ua.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[];this.safari=/Safari/gi.test(e.navigator.appVersion);this.webkit=/webkit/i.test(this.ua);this.opera=/opera/i.test(this.ua);
this.msie=/msie/i.test(this.ua)&&!this.opera;this.chrome=/Chrome/i.test(this.ua);this.firefox=/Firefox/i.test(this.ua);this.fennec=/Fennec/i.test(this.ua);this.mozilla=/mozilla/i.test(this.ua)&&!/(compatible|webkit)/.test(this.ua);this.android=/android/i.test(this.ua);this.blackberry=/blackberry/i.test(this.ua);this.iOS=/iphone|ipod|ipad/gi.test(e.navigator.platform);this.iPad=/ipad/gi.test(e.navigator.platform);this.iPhone=/iphone/gi.test(e.navigator.platform);this.iPod=/ipod/gi.test(e.navigator.platform);
var a=document.createElement("div");this.is3dSupported=!d.isNothing(a.style.WebkitPerspective);this.isCSSTransformSupported=!d.isNothing(a.style.WebkitTransform)||!d.isNothing(a.style.MozTransform)||!d.isNothing(a.style.transformProperty);this.isTouchSupported=this.isEventSupported("touchstart");this.isGestureSupported=this.isEventSupported("gesturestart")},_eventTagNames:{select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"},isEventSupported:function(a){var b=
document.createElement(this._eventTagNames[a]||"div"),c,a="on"+a;c=d.objectHasProperty(b,a);c||(b.setAttribute(a,"return;"),c=typeof b[a]==="function");return c},isLandscape:function(){return d.DOM.windowWidth()>d.DOM.windowHeight()}};d.Browser._detect()})(window,window.Code.Util);
(function(e,d,a){a.extend(a,{Events:{add:function(a,c,g){d(a).bind(c,g)},remove:function(a,c,g){d(a).unbind(c,g)},fire:function(a,c){var g,f=Array.prototype.slice.call(arguments).splice(2);g=typeof c==="string"?{type:c}:c;d(a).trigger(d.Event(g.type,g),f)},getMousePosition:function(a){return{x:a.pageX,y:a.pageY}},getTouchEvent:function(a){return a.originalEvent},getWheelDelta:function(b){var c=0;a.isNothing(b.wheelDelta)?a.isNothing(b.detail)||(c=-b.detail/3):c=b.wheelDelta/120;return c},domReady:function(a){d(document).ready(a)}}})})(window,
window.jQuery,window.Code.Util);
(function(e,d,a){a.extend(a,{DOM:{setData:function(b,c,g){if(a.isLikeArray(b)){var f,d;f=0;for(d=b.length;f<d;f++)a.DOM._setData(b[f],c,g)}else a.DOM._setData(b,c,g)},_setData:function(b,c,g){a.DOM.setAttribute(b,"data-"+c,g)},getData:function(b,c,g){return a.DOM.getAttribute(b,"data-"+c,g)},removeData:function(b,c){if(a.isLikeArray(b)){var g,f;g=0;for(f=b.length;g<f;g++)a.DOM._removeData(b[g],c)}else a.DOM._removeData(b,c)},_removeData:function(b,c){a.DOM.removeAttribute(b,"data-"+c)},isChildOf:function(a,
c){if(c===a)return!1;for(;a&&a!==c;)a=a.parentNode;return a===c},find:function(b,c){if(a.isNothing(c))c=e.document;var g=d(b,c),f=[],i,j;i=0;for(j=g.length;i<j;i++)f.push(g[i]);return f},createElement:function(a,c,g){a=d("<"+a+"></"+a+">");a.attr(c);a.append(g);return a[0]},appendChild:function(a,c){d(c).append(a)},insertBefore:function(a,c){d(a).insertBefore(c)},appendText:function(a,c){d(c).text(a)},appendToBody:function(a){d("body").append(a)},removeChild:function(a){d(a).empty().remove()},removeChildren:function(a){d(a).empty()},
hasAttribute:function(b,c){return!a.isNothing(d(b).attr(c))},getAttribute:function(b,c,g){b=d(b).attr(c);a.isNothing(b)&&!a.isNothing(g)&&(b=g);return b},setAttribute:function(b,c,g){if(a.isLikeArray(b)){var f,d;f=0;for(d=b.length;f<d;f++)a.DOM._setAttribute(b[f],c,g)}else a.DOM._setAttribute(b,c,g)},_setAttribute:function(a,c,g){d(a).attr(c,g)},removeAttribute:function(b,c){if(a.isLikeArray(b)){var g,f;g=0;for(f=b.length;g<f;g++)a.DOM._removeAttribute(b[g],c)}else a.DOM._removeAttribute(b,c)},_removeAttribute:function(a,
c){d(a).removeAttr(c)},addClass:function(b,c){if(a.isLikeArray(b)){var g,f;g=0;for(f=b.length;g<f;g++)a.DOM._addClass(b[g],c)}else a.DOM._addClass(b,c)},_addClass:function(a,c){d(a).addClass(c)},removeClass:function(b,c){if(a.isLikeArray(b)){var g,f;g=0;for(f=b.length;g<f;g++)a.DOM._removeClass(b[g],c)}else a.DOM._removeClass(b,c)},_removeClass:function(a,c){d(a).removeClass(c)},hasClass:function(a,c){d(a).hasClass(c)},setStyle:function(b,c,g){if(a.isLikeArray(b)){var f,d;f=0;for(d=b.length;f<d;f++)a.DOM._setStyle(b[f],
c,g)}else a.DOM._setStyle(b,c,g)},_setStyle:function(b,c,g){var f;if(a.isObject(c))for(f in c)a.objectHasProperty(c,f)&&(f==="width"?a.DOM.width(b,c[f]):f==="height"?a.DOM.height(b,c[f]):d(b).css(f,c[f]));else d(b).css(c,g)},getStyle:function(a,c){return d(a).css(c)},hide:function(b){if(a.isLikeArray(b)){var c,g;c=0;for(g=b.length;c<g;c++)a.DOM._hide(b[c])}else a.DOM._hide(b)},_hide:function(a){d(a).hide()},show:function(b){if(a.isLikeArray(b)){var c,g;c=0;for(g=b.length;c<g;c++)a.DOM._show(b[c])}else a.DOM._show(b)},
_show:function(a){d(a).show()},width:function(b,c){a.isNothing(c)||d(b).width(c);return d(b).width()},outerWidth:function(a){return d(a).outerWidth()},height:function(b,c){a.isNothing(c)||d(b).height(c);return d(b).height()},outerHeight:function(a){return d(a).outerHeight()},documentWidth:function(){return d(document.documentElement).width()},documentHeight:function(){return d(document.documentElement).height()},documentOuterWidth:function(){return a.DOM.width(document.documentElement)},documentOuterHeight:function(){return a.DOM.outerHeight(document.documentElement)},
bodyWidth:function(){return d(document.body).width()},bodyHeight:function(){return d(document.body).height()},bodyOuterWidth:function(){return a.DOM.outerWidth(document.body)},bodyOuterHeight:function(){return a.DOM.outerHeight(document.body)},windowWidth:function(){if(!e.innerWidth)return d(e).width();return e.innerWidth},windowHeight:function(){if(!e.innerHeight)return d(e).height();return e.innerHeight},windowScrollLeft:function(){if(!e.pageXOffset)return d(e).scrollLeft();return e.pageXOffset},
windowScrollTop:function(){if(!e.pageYOffset)return d(e).scrollTop();return e.pageYOffset}}})})(window,window.jQuery,window.Code.Util);
(function(e,d){d.extend(d,{Animation:{_applyTransitionDelay:50,_transitionEndLabel:e.document.documentElement.style.webkitTransition!==void 0?"webkitTransitionEnd":"transitionend",_transitionEndHandler:null,_transitionPrefix:e.document.documentElement.style.webkitTransition!==void 0?"webkitTransition":e.document.documentElement.style.MozTransition!==void 0?"MozTransition":"transition",_transformLabel:e.document.documentElement.style.webkitTransform!==void 0?"webkitTransform":e.document.documentElement.style.MozTransition!==
void 0?"MozTransform":"transform",_getTransitionEndHandler:function(){if(d.isNothing(this._transitionEndHandler))this._transitionEndHandler=this._onTransitionEnd.bind(this);return this._transitionEndHandler},stop:function(a){if(d.Browser.isCSSTransformSupported){var b={};d.Events.remove(a,this._transitionEndLabel,this._getTransitionEndHandler());d.isNothing(a.callbackLabel)&&delete a.callbackLabel;b[this._transitionPrefix+"Property"]="";b[this._transitionPrefix+"Duration"]="";b[this._transitionPrefix+
"TimingFunction"]="";b[this._transitionPrefix+"Delay"]="";b[this._transformLabel]="";d.DOM.setStyle(a,b)}else d.isNothing(e.jQuery)||e.jQuery(a).stop(!0,!0)},fadeIn:function(a,b,c,g,f){f=d.coalesce(f,1);f<=0&&(f=1);if(b<=0&&(d.DOM.setStyle(a,"opacity",f),!d.isNothing(c))){c(a);return}d.DOM.getStyle(a,"opacity")>=1&&d.DOM.setStyle(a,"opacity",0);d.Browser.isCSSTransformSupported?this._applyTransition(a,"opacity",f,b,c,g):d.isNothing(e.jQuery)||e.jQuery(a).fadeTo(b,f,c)},fadeTo:function(a,b,c,g,f){this.fadeIn(a,
c,g,f,b)},fadeOut:function(a,b,c,g){if(b<=0&&(d.DOM.setStyle(a,"opacity",0),!d.isNothing(c))){c(a);return}d.Browser.isCSSTransformSupported?this._applyTransition(a,"opacity",0,b,c,g):e.jQuery(a).fadeTo(b,0,c)},slideBy:function(a,b,c,g,f,i){var j={},b=d.coalesce(b,0),c=d.coalesce(c,0),i=d.coalesce(i,"ease-out");j[this._transitionPrefix+"Property"]="all";j[this._transitionPrefix+"Delay"]="0";g===0?(j[this._transitionPrefix+"Duration"]="",j[this._transitionPrefix+"TimingFunction"]=""):(j[this._transitionPrefix+
"Duration"]=g+"ms",j[this._transitionPrefix+"TimingFunction"]=d.coalesce(i,"ease-out"),d.Events.add(a,this._transitionEndLabel,this._getTransitionEndHandler()));j[this._transformLabel]=d.Browser.is3dSupported?"translate3d("+b+"px, "+c+"px, 0px)":"translate("+b+"px, "+c+"px)";if(!d.isNothing(f))a.cclallcallback=f;d.DOM.setStyle(a,j);g===0&&e.setTimeout(function(){this._leaveTransforms(a)}.bind(this),this._applyTransitionDelay)},resetTranslate:function(a){var b={};b[this._transformLabel]=b[this._transformLabel]=
d.Browser.is3dSupported?"translate3d(0px, 0px, 0px)":"translate(0px, 0px)";d.DOM.setStyle(a,b)},_applyTransition:function(a,b,c,g,f,i){var j={},i=d.coalesce(i,"ease-in");j[this._transitionPrefix+"Property"]=b;j[this._transitionPrefix+"Duration"]=g+"ms";j[this._transitionPrefix+"TimingFunction"]=i;j[this._transitionPrefix+"Delay"]="0";d.Events.add(a,this._transitionEndLabel,this._getTransitionEndHandler());d.DOM.setStyle(a,j);d.isNothing(f)||(a["ccl"+b+"callback"]=f);e.setTimeout(function(){d.DOM.setStyle(a,
b,c)},this._applyTransitionDelay)},_onTransitionEnd:function(a){d.Events.remove(a.currentTarget,this._transitionEndLabel,this._getTransitionEndHandler());this._leaveTransforms(a.currentTarget)},_leaveTransforms:function(a){var b=a.style[this._transitionPrefix+"Property"],c=b!==""?"ccl"+b+"callback":"cclallcallback",g,b=d.coalesce(a.style.webkitTransform,a.style.MozTransform,a.style.transform),f,i=e.parseInt(d.DOM.getStyle(a,"left"),0),j=e.parseInt(d.DOM.getStyle(a,"top"),0),h,l,k={};b!==""&&(b=d.Browser.is3dSupported?
b.match(/translate3d\((.*?)\)/):b.match(/translate\((.*?)\)/),d.isNothing(b)||(f=b[1].split(", "),h=e.parseInt(f[0],0),l=e.parseInt(f[1],0)));k[this._transitionPrefix+"Property"]="";k[this._transitionPrefix+"Duration"]="";k[this._transitionPrefix+"TimingFunction"]="";k[this._transitionPrefix+"Delay"]="";d.DOM.setStyle(a,k);e.setTimeout(function(){if(!d.isNothing(f))k={},k[this._transformLabel]="",k.left=i+h+"px",k.top=j+l+"px",d.DOM.setStyle(a,k);d.isNothing(a[c])||(g=a[c],delete a[c],g(a))}.bind(this),
this._applyTransitionDelay)}}})})(window,window.Code.Util);
(function(e,d,a){a.registerNamespace("Code.Util.TouchElement");a.TouchElement.EventTypes={onTouch:"CodeUtilTouchElementOnTouch"};a.TouchElement.ActionTypes={touchStart:"touchStart",touchMove:"touchMove",touchEnd:"touchEnd",touchMoveEnd:"touchMoveEnd",tap:"tap",doubleTap:"doubleTap",swipeLeft:"swipeLeft",swipeRight:"swipeRight",swipeUp:"swipeUp",swipeDown:"swipeDown",gestureStart:"gestureStart",gestureChange:"gestureChange",gestureEnd:"gestureEnd"}})(window,window.klass,window.Code.Util);
(function(e,d,a){a.registerNamespace("Code.Util.TouchElement");a.TouchElement.TouchElementClass=d({el:null,captureSettings:null,touchStartPoint:null,touchEndPoint:null,touchStartTime:null,doubleTapTimeout:null,touchStartHandler:null,touchMoveHandler:null,touchEndHandler:null,mouseDownHandler:null,mouseMoveHandler:null,mouseUpHandler:null,mouseOutHandler:null,gestureStartHandler:null,gestureChangeHandler:null,gestureEndHandler:null,swipeThreshold:null,swipeTimeThreshold:null,doubleTapSpeed:null,dispose:function(){var b;
this.removeEventHandlers();for(b in this)a.objectHasProperty(this,b)&&(this[b]=null)},initialize:function(b,c){this.el=b;this.captureSettings={swipe:!1,move:!1,gesture:!1,doubleTap:!1,preventDefaultTouchEvents:!0};a.extend(this.captureSettings,c);this.swipeThreshold=50;this.doubleTapSpeed=this.swipeTimeThreshold=250;this.touchStartPoint={x:0,y:0};this.touchEndPoint={x:0,y:0}},addEventHandlers:function(){if(a.isNothing(this.touchStartHandler))this.touchStartHandler=this.onTouchStart.bind(this),this.touchMoveHandler=
this.onTouchMove.bind(this),this.touchEndHandler=this.onTouchEnd.bind(this),this.mouseDownHandler=this.onMouseDown.bind(this),this.mouseMoveHandler=this.onMouseMove.bind(this),this.mouseUpHandler=this.onMouseUp.bind(this),this.mouseOutHandler=this.onMouseOut.bind(this),this.gestureStartHandler=this.onGestureStart.bind(this),this.gestureChangeHandler=this.onGestureChange.bind(this),this.gestureEndHandler=this.onGestureEnd.bind(this);a.Events.add(this.el,"touchstart",this.touchStartHandler);this.captureSettings.move&&
a.Events.add(this.el,"touchmove",this.touchMoveHandler);a.Events.add(this.el,"touchend",this.touchEndHandler);a.Events.add(this.el,"mousedown",this.mouseDownHandler);a.Browser.isGestureSupported&&this.captureSettings.gesture&&(a.Events.add(this.el,"gesturestart",this.gestureStartHandler),a.Events.add(this.el,"gesturechange",this.gestureChangeHandler),a.Events.add(this.el,"gestureend",this.gestureEndHandler))},removeEventHandlers:function(){a.Events.remove(this.el,"touchstart",this.touchStartHandler);
this.captureSettings.move&&a.Events.remove(this.el,"touchmove",this.touchMoveHandler);a.Events.remove(this.el,"touchend",this.touchEndHandler);a.Events.remove(this.el,"mousedown",this.mouseDownHandler);a.Browser.isGestureSupported&&this.captureSettings.gesture&&(a.Events.remove(this.el,"gesturestart",this.gestureStartHandler),a.Events.remove(this.el,"gesturechange",this.gestureChangeHandler),a.Events.remove(this.el,"gestureend",this.gestureEndHandler))},getTouchPoint:function(a){return{x:a[0].pageX,
y:a[0].pageY}},fireTouchEvent:function(b){var c=0,g=0,f=0,d,c=this.touchEndPoint.x-this.touchStartPoint.x,g=this.touchEndPoint.y-this.touchStartPoint.y,f=Math.sqrt(c*c+g*g);if(this.captureSettings.swipe&&(d=new Date,d-=this.touchStartTime,d<=this.swipeTimeThreshold)){if(e.Math.abs(c)>=this.swipeThreshold){a.Events.fire(this,{type:a.TouchElement.EventTypes.onTouch,target:this,point:this.touchEndPoint,action:c<0?a.TouchElement.ActionTypes.swipeLeft:a.TouchElement.ActionTypes.swipeRight,targetEl:b.target,
currentTargetEl:b.currentTarget});return}if(e.Math.abs(g)>=this.swipeThreshold){a.Events.fire(this,{type:a.TouchElement.EventTypes.onTouch,target:this,point:this.touchEndPoint,action:g<0?a.TouchElement.ActionTypes.swipeUp:a.TouchElement.ActionTypes.swipeDown,targetEl:b.target,currentTargetEl:b.currentTarget});return}}f>1?a.Events.fire(this,{type:a.TouchElement.EventTypes.onTouch,target:this,action:a.TouchElement.ActionTypes.touchMoveEnd,point:this.touchEndPoint,targetEl:b.target,currentTargetEl:b.currentTarget}):
this.captureSettings.doubleTap?a.isNothing(this.doubleTapTimeout)?this.doubleTapTimeout=e.setTimeout(function(){this.doubleTapTimeout=null;a.Events.fire(this,{type:a.TouchElement.EventTypes.onTouch,target:this,point:this.touchEndPoint,action:a.TouchElement.ActionTypes.tap,targetEl:b.target,currentTargetEl:b.currentTarget})}.bind(this),this.doubleTapSpeed):(e.clearTimeout(this.doubleTapTimeout),this.doubleTapTimeout=null,a.Events.fire(this,{type:a.TouchElement.EventTypes.onTouch,target:this,point:this.touchEndPoint,
action:a.TouchElement.ActionTypes.doubleTap,targetEl:b.target,currentTargetEl:b.currentTarget})):a.Events.fire(this,{type:a.TouchElement.EventTypes.onTouch,target:this,point:this.touchEndPoint,action:a.TouchElement.ActionTypes.tap,targetEl:b.target,currentTargetEl:b.currentTarget})},onTouchStart:function(b){this.captureSettings.preventDefaultTouchEvents&&b.preventDefault();a.Events.remove(this.el,"mousedown",this.mouseDownHandler);var c=a.Events.getTouchEvent(b).touches;c.length>1&&this.captureSettings.gesture?
this.isGesture=!0:(this.touchStartTime=new Date,this.isGesture=!1,this.touchStartPoint=this.getTouchPoint(c),a.Events.fire(this,{type:a.TouchElement.EventTypes.onTouch,target:this,action:a.TouchElement.ActionTypes.touchStart,point:this.touchStartPoint,targetEl:b.target,currentTargetEl:b.currentTarget}))},onTouchMove:function(b){this.captureSettings.preventDefaultTouchEvents&&b.preventDefault();if(!this.isGesture||!this.captureSettings.gesture){var c=a.Events.getTouchEvent(b).touches;a.Events.fire(this,
{type:a.TouchElement.EventTypes.onTouch,target:this,action:a.TouchElement.ActionTypes.touchMove,point:this.getTouchPoint(c),targetEl:b.target,currentTargetEl:b.currentTarget})}},onTouchEnd:function(b){if(!this.isGesture||!this.captureSettings.gesture){this.captureSettings.preventDefaultTouchEvents&&b.preventDefault();var c=a.Events.getTouchEvent(b);this.touchEndPoint=this.getTouchPoint(!a.isNothing(c.changedTouches)?c.changedTouches:c.touches);a.Events.fire(this,{type:a.TouchElement.EventTypes.onTouch,
target:this,action:a.TouchElement.ActionTypes.touchEnd,point:this.touchEndPoint,targetEl:b.target,currentTargetEl:b.currentTarget});this.fireTouchEvent(b)}},onMouseDown:function(b){b.preventDefault();a.Events.remove(this.el,"touchstart",this.mouseDownHandler);a.Events.remove(this.el,"touchmove",this.touchMoveHandler);a.Events.remove(this.el,"touchend",this.touchEndHandler);this.captureSettings.move&&a.Events.add(this.el,"mousemove",this.mouseMoveHandler);a.Events.add(this.el,"mouseup",this.mouseUpHandler);
a.Events.add(this.el,"mouseout",this.mouseOutHandler);this.touchStartTime=new Date;this.isGesture=!1;this.touchStartPoint=a.Events.getMousePosition(b);a.Events.fire(this,{type:a.TouchElement.EventTypes.onTouch,target:this,action:a.TouchElement.ActionTypes.touchStart,point:this.touchStartPoint,targetEl:b.target,currentTargetEl:b.currentTarget})},onMouseMove:function(b){b.preventDefault();a.Events.fire(this,{type:a.TouchElement.EventTypes.onTouch,target:this,action:a.TouchElement.ActionTypes.touchMove,
point:a.Events.getMousePosition(b),targetEl:b.target,currentTargetEl:b.currentTarget})},onMouseUp:function(b){b.preventDefault();this.captureSettings.move&&a.Events.remove(this.el,"mousemove",this.mouseMoveHandler);a.Events.remove(this.el,"mouseup",this.mouseUpHandler);a.Events.remove(this.el,"mouseout",this.mouseOutHandler);this.touchEndPoint=a.Events.getMousePosition(b);a.Events.fire(this,{type:a.TouchElement.EventTypes.onTouch,target:this,action:a.TouchElement.ActionTypes.touchEnd,point:this.touchEndPoint,
targetEl:b.target,currentTargetEl:b.currentTarget});this.fireTouchEvent(b)},onMouseOut:function(b){var c=b.relatedTarget;if(!(this.el===c||a.DOM.isChildOf(c,this.el)))b.preventDefault(),this.captureSettings.move&&a.Events.remove(this.el,"mousemove",this.mouseMoveHandler),a.Events.remove(this.el,"mouseup",this.mouseUpHandler),a.Events.remove(this.el,"mouseout",this.mouseOutHandler),this.touchEndPoint=a.Events.getMousePosition(b),a.Events.fire(this,{type:a.TouchElement.EventTypes.onTouch,target:this,
action:a.TouchElement.ActionTypes.touchEnd,point:this.touchEndPoint,targetEl:b.target,currentTargetEl:b.currentTarget}),this.fireTouchEvent(b)},onGestureStart:function(b){b.preventDefault();var c=a.Events.getTouchEvent(b);a.Events.fire(this,{type:a.TouchElement.EventTypes.onTouch,target:this,action:a.TouchElement.ActionTypes.gestureStart,scale:c.scale,rotation:c.rotation,targetEl:b.target,currentTargetEl:b.currentTarget})},onGestureChange:function(b){b.preventDefault();var c=a.Events.getTouchEvent(b);
a.Events.fire(this,{type:a.TouchElement.EventTypes.onTouch,target:this,action:a.TouchElement.ActionTypes.gestureChange,scale:c.scale,rotation:c.rotation,targetEl:b.target,currentTargetEl:b.currentTarget})},onGestureEnd:function(b){b.preventDefault();var c=a.Events.getTouchEvent(b);a.Events.fire(this,{type:a.TouchElement.EventTypes.onTouch,target:this,action:a.TouchElement.ActionTypes.gestureEnd,scale:c.scale,rotation:c.rotation,targetEl:b.target,currentTargetEl:b.currentTarget})}})})(window,window.klass,
window.Code.Util);(function(e,d,a){a.registerNamespace("Code.PhotoSwipe.Image");e.Code.PhotoSwipe.Image.EventTypes={onLoad:"onLoad",onError:"onError"}})(window,window.klass,window.Code.Util);
(function(e,d,a){a.registerNamespace("Code.PhotoSwipe.Image");var b=e.Code.PhotoSwipe;b.Image.ImageClass=d({refObj:null,imageEl:null,src:null,caption:null,metaData:null,imageLoadHandler:null,imageErrorHandler:null,dispose:function(){var c;this.shrinkImage();for(c in this)a.objectHasProperty(this,c)&&(this[c]=null)},initialize:function(a,b,f,d){this.refObj=a;this.src=this.originalSrc=b;this.caption=f;this.metaData=d;this.imageEl=new e.Image;this.imageLoadHandler=this.onImageLoad.bind(this);this.imageErrorHandler=
this.onImageError.bind(this)},load:function(){this.imageEl.originalSrc=a.coalesce(this.imageEl.originalSrc,"");this.imageEl.originalSrc===this.src?this.imageEl.isError?a.Events.fire(this,{type:b.Image.EventTypes.onError,target:this}):a.Events.fire(this,{type:b.Image.EventTypes.onLoad,target:this}):(this.imageEl.isError=!1,this.imageEl.isLoading=!0,this.imageEl.naturalWidth=null,this.imageEl.naturalHeight=null,this.imageEl.isLandscape=!1,this.imageEl.onload=this.imageLoadHandler,this.imageEl.onerror=
this.imageErrorHandler,this.imageEl.onabort=this.imageErrorHandler,this.imageEl.originalSrc=this.src,this.imageEl.src=this.src)},shrinkImage:function(){if(!a.isNothing(this.imageEl)&&this.imageEl.src.indexOf(this.src)>-1)this.imageEl.src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=",a.isNothing(this.imageEl.parentNode)||a.DOM.removeChild(this.imageEl,this.imageEl.parentNode)},onImageLoad:function(){this.imageEl.onload=null;this.imageEl.naturalWidth=a.coalesce(this.imageEl.naturalWidth,
this.imageEl.width);this.imageEl.naturalHeight=a.coalesce(this.imageEl.naturalHeight,this.imageEl.height);this.imageEl.isLandscape=this.imageEl.naturalWidth>this.imageEl.naturalHeight;this.imageEl.isLoading=!1;a.Events.fire(this,{type:b.Image.EventTypes.onLoad,target:this})},onImageError:function(){this.imageEl.onload=null;this.imageEl.onerror=null;this.imageEl.onabort=null;this.imageEl.isLoading=!1;this.imageEl.isError=!0;a.Events.fire(this,{type:b.Image.EventTypes.onError,target:this})}})})(window,
window.klass,window.Code.Util);
(function(e,d,a){a.registerNamespace("Code.PhotoSwipe.Cache");e=e.Code.PhotoSwipe;e.Cache.Mode={normal:"normal",aggressive:"aggressive"};e.Cache.Functions={getImageSource:function(a){return a.href},getImageCaption:function(b){if(b.nodeName==="IMG")return a.DOM.getAttribute(b,"alt");var c,g,f;c=0;for(g=b.childNodes.length;c<g;c++)if(f=b.childNodes[c],b.childNodes[c].nodeName==="IMG")return a.DOM.getAttribute(f,"alt")},getImageMetaData:function(){return{}}}})(window,window.klass,window.Code.Util);
(function(e,d,a){a.registerNamespace("Code.PhotoSwipe.Cache");var b=e.Code.PhotoSwipe;b.Cache.CacheClass=d({images:null,settings:null,dispose:function(){var c,b,f;if(!a.isNothing(this.images)){b=0;for(f=this.images.length;b<f;b++)this.images[b].dispose();this.images.length=0}for(c in this)a.objectHasProperty(this,c)&&(this[c]=null)},initialize:function(a,g){var f,d,e,h,l,k;this.settings=g;this.images=[];f=0;for(d=a.length;f<d;f++)e=a[f],h=this.settings.getImageSource(e),l=this.settings.getImageCaption(e),
k=this.settings.getImageMetaData(e),this.images.push(new b.Image.ImageClass(e,h,l,k))},getImages:function(c){var g,f,d=[],e;g=0;for(f=c.length;g<f;g++){e=this.images[c[g]];if(this.settings.cacheMode===b.Cache.Mode.aggressive)e.cacheDoNotShrink=!0;d.push(e)}if(this.settings.cacheMode===b.Cache.Mode.aggressive){g=0;for(f=this.images.length;g<f;g++)e=this.images[g],a.objectHasProperty(e,"cacheDoNotShrink")?delete e.cacheDoNotShrink:e.shrinkImage()}return d}})})(window,window.klass,window.Code.Util,window.Code.PhotoSwipe.Image);
(function(e,d,a){a.registerNamespace("Code.PhotoSwipe.DocumentOverlay");e.Code.PhotoSwipe.DocumentOverlay.CssClasses={documentOverlay:"ps-document-overlay"}})(window,window.klass,window.Code.Util);
(function(e,d,a){a.registerNamespace("Code.PhotoSwipe.DocumentOverlay");var b=e.Code.PhotoSwipe;b.DocumentOverlay.DocumentOverlayClass=d({el:null,settings:null,initialBodyHeight:null,dispose:function(){var c;a.Animation.stop(this.el);a.DOM.removeChild(this.el,this.el.parentNode);for(c in this)a.objectHasProperty(this,c)&&(this[c]=null)},initialize:function(c){this.settings=c;this.el=a.DOM.createElement("div",{"class":b.DocumentOverlay.CssClasses.documentOverlay},"");a.DOM.setStyle(this.el,{display:"block",
position:"absolute",left:0,top:0,zIndex:this.settings.zIndex});a.DOM.hide(this.el);this.settings.target===e?a.DOM.appendToBody(this.el):a.DOM.appendChild(this.el,this.settings.target);a.Animation.resetTranslate(this.el);this.initialBodyHeight=a.DOM.bodyOuterHeight()},resetPosition:function(){var c,b,f;if(this.settings.target===e){c=a.DOM.windowWidth();b=a.DOM.bodyOuterHeight()*2;f=this.settings.jQueryMobile?a.DOM.windowScrollTop()+"px":"0px";if(b<1)b=this.initialBodyHeight;a.DOM.windowHeight()>b&&
(b=a.DOM.windowHeight())}else c=a.DOM.width(this.settings.target),b=a.DOM.height(this.settings.target),f="0px";a.DOM.setStyle(this.el,{width:c,height:b,top:f})},fadeIn:function(c,b){this.resetPosition();a.DOM.setStyle(this.el,"opacity",0);a.DOM.show(this.el);a.Animation.fadeIn(this.el,c,b)}})})(window,window.klass,window.Code.Util);
(function(e,d,a){a.registerNamespace("Code.PhotoSwipe.Carousel");e=e.Code.PhotoSwipe;e.Carousel.EventTypes={onSlideByEnd:"PhotoSwipeCarouselOnSlideByEnd",onSlideshowStart:"PhotoSwipeCarouselOnSlideshowStart",onSlideshowStop:"PhotoSwipeCarouselOnSlideshowStop"};e.Carousel.CssClasses={carousel:"ps-carousel",content:"ps-carousel-content",item:"ps-carousel-item",itemLoading:"ps-carousel-item-loading",itemError:"ps-carousel-item-error"};e.Carousel.SlideByAction={previous:"previous",current:"current",next:"next"}})(window,
window.klass,window.Code.Util);
(function(e,d,a){a.registerNamespace("Code.PhotoSwipe.Carousel");var b=e.Code.PhotoSwipe;b.Carousel.CarouselClass=d({el:null,contentEl:null,settings:null,cache:null,slideByEndHandler:null,currentCacheIndex:null,isSliding:null,isSlideshowActive:null,lastSlideByAction:null,touchStartPoint:null,touchStartPosition:null,imageLoadHandler:null,imageErrorHandler:null,slideshowTimeout:null,dispose:function(){var c,g,f;g=0;for(f=this.cache.images.length;g<f;g++)a.Events.remove(this.cache.images[g],b.Image.EventTypes.onLoad,
this.imageLoadHandler),a.Events.remove(this.cache.images[g],b.Image.EventTypes.onError,this.imageErrorHandler);this.stopSlideshow();a.Animation.stop(this.el);a.DOM.removeChild(this.el,this.el.parentNode);for(c in this)a.objectHasProperty(this,c)&&(this[c]=null)},initialize:function(c,g){var f,d,j;this.cache=c;this.settings=g;this.slideByEndHandler=this.onSlideByEnd.bind(this);this.imageLoadHandler=this.onImageLoad.bind(this);this.imageErrorHandler=this.onImageError.bind(this);this.currentCacheIndex=
0;this.isSlideshowActive=this.isSliding=!1;if(this.cache.images.length<3)this.settings.loop=!1;this.el=a.DOM.createElement("div",{"class":b.Carousel.CssClasses.carousel},"");a.DOM.setStyle(this.el,{display:"block",position:"absolute",left:0,top:0,overflow:"hidden",zIndex:this.settings.zIndex});a.DOM.hide(this.el);this.contentEl=a.DOM.createElement("div",{"class":b.Carousel.CssClasses.content},"");a.DOM.setStyle(this.contentEl,{display:"block",position:"absolute",left:0,top:0});a.DOM.appendChild(this.contentEl,
this.el);d=c.images.length<3?c.images.length:3;for(f=0;f<d;f++)j=a.DOM.createElement("div",{"class":b.Carousel.CssClasses.item+" "+b.Carousel.CssClasses.item+"-"+f},""),a.DOM.setAttribute(j,"style","float: left;"),a.DOM.setStyle(j,{display:"block",position:"relative",left:0,top:0,overflow:"hidden"}),this.settings.margin>0&&a.DOM.setStyle(j,{marginRight:this.settings.margin+"px"}),a.DOM.appendChild(j,this.contentEl);this.settings.target===e?a.DOM.appendToBody(this.el):a.DOM.appendChild(this.el,this.settings.target)},
resetPosition:function(){var c,g,f,d,j,h;this.settings.target===e?(c=a.DOM.windowWidth(),g=a.DOM.windowHeight(),f=a.DOM.windowScrollTop()+"px"):(c=a.DOM.width(this.settings.target),g=a.DOM.height(this.settings.target),f="0px");d=this.settings.margin>0?c+this.settings.margin:c;j=a.DOM.find("."+b.Carousel.CssClasses.item,this.contentEl);d*=j.length;a.DOM.setStyle(this.el,{top:f,width:c,height:g});a.DOM.setStyle(this.contentEl,{width:d,height:g});f=0;for(d=j.length;f<d;f++)h=j[f],a.DOM.setStyle(h,{width:c,
height:g}),h=a.DOM.find("img",h)[0],a.isNothing(h)||this.resetImagePosition(h);this.setContentLeftPosition()},resetImagePosition:function(c){if(!a.isNothing(c)){a.DOM.getAttribute(c,"src");var b,f,d,e=a.DOM.width(this.el),h=a.DOM.height(this.el);this.settings.imageScaleMethod==="fitNoUpscale"?(f=c.naturalWidth,d=c.naturalHeight,f>e&&(b=e/f,f=Math.round(f*b),d=Math.round(d*b)),d>h&&(b=h/d,d=Math.round(d*b),f=Math.round(f*b))):(b=c.isLandscape?e/c.naturalWidth:h/c.naturalHeight,f=Math.round(c.naturalWidth*
b),d=Math.round(c.naturalHeight*b),this.settings.imageScaleMethod==="zoom"?(b=1,d<h?b=h/d:f<e&&(b=e/f),b!==1&&(f=Math.round(f*b),d=Math.round(d*b))):this.settings.imageScaleMethod==="fit"&&(b=1,f>e?b=e/f:d>h&&(b=h/d),b!==1&&(f=Math.round(f*b),d=Math.round(d*b))));a.DOM.setStyle(c,{position:"absolute",width:f,height:d,top:Math.round((h-d)/2)+"px",left:Math.round((e-f)/2)+"px",display:"block"})}},setContentLeftPosition:function(){var c,b,d;c=this.settings.target===e?a.DOM.windowWidth():a.DOM.width(this.settings.target);
b=this.getItemEls();d=0;this.settings.loop?d=(c+this.settings.margin)*-1:this.currentCacheIndex===this.cache.images.length-1?d=(b.length-1)*(c+this.settings.margin)*-1:this.currentCacheIndex>0&&(d=(c+this.settings.margin)*-1);a.DOM.setStyle(this.contentEl,{left:d+"px"})},show:function(c){this.currentCacheIndex=c;this.resetPosition();this.setImages(!1);a.DOM.show(this.el);a.Animation.resetTranslate(this.contentEl);var c=this.getItemEls(),d,f;d=0;for(f=c.length;d<f;d++)a.Animation.resetTranslate(c[d]);
a.Events.fire(this,{type:b.Carousel.EventTypes.onSlideByEnd,target:this,action:b.Carousel.SlideByAction.current,cacheIndex:this.currentCacheIndex})},setImages:function(a){var b,d=this.getItemEls();b=this.currentCacheIndex+1;var e=this.currentCacheIndex-1;this.settings.loop?(b>this.cache.images.length-1&&(b=0),e<0&&(e=this.cache.images.length-1),b=this.cache.getImages([e,this.currentCacheIndex,b]),a||this.addCacheImageToItemEl(b[1],d[1]),this.addCacheImageToItemEl(b[2],d[2]),this.addCacheImageToItemEl(b[0],
d[0])):d.length===1?a||(b=this.cache.getImages([this.currentCacheIndex]),this.addCacheImageToItemEl(b[0],d[0])):d.length===2?this.currentCacheIndex===0?(b=this.cache.getImages([this.currentCacheIndex,this.currentCacheIndex+1]),a||this.addCacheImageToItemEl(b[0],d[0]),this.addCacheImageToItemEl(b[1],d[1])):(b=this.cache.getImages([this.currentCacheIndex-1,this.currentCacheIndex]),a||this.addCacheImageToItemEl(b[1],d[1]),this.addCacheImageToItemEl(b[0],d[0])):this.currentCacheIndex===0?(b=this.cache.getImages([this.currentCacheIndex,
this.currentCacheIndex+1,this.currentCacheIndex+2]),a||this.addCacheImageToItemEl(b[0],d[0]),this.addCacheImageToItemEl(b[1],d[1]),this.addCacheImageToItemEl(b[2],d[2])):(this.currentCacheIndex===this.cache.images.length-1?(b=this.cache.getImages([this.currentCacheIndex-2,this.currentCacheIndex-1,this.currentCacheIndex]),a||this.addCacheImageToItemEl(b[2],d[2]),this.addCacheImageToItemEl(b[1],d[1])):(b=this.cache.getImages([this.currentCacheIndex-1,this.currentCacheIndex,this.currentCacheIndex+1]),
a||this.addCacheImageToItemEl(b[1],d[1]),this.addCacheImageToItemEl(b[2],d[2])),this.addCacheImageToItemEl(b[0],d[0]))},addCacheImageToItemEl:function(c,d){a.DOM.removeClass(d,b.Carousel.CssClasses.itemError);a.DOM.addClass(d,b.Carousel.CssClasses.itemLoading);a.DOM.removeChildren(d);a.DOM.setStyle(c.imageEl,{display:"none"});a.DOM.appendChild(c.imageEl,d);a.Animation.resetTranslate(c.imageEl);a.Events.add(c,b.Image.EventTypes.onLoad,this.imageLoadHandler);a.Events.add(c,b.Image.EventTypes.onError,
this.imageErrorHandler);c.load()},slideCarousel:function(c,d,f){if(!this.isSliding){var i,j;i=this.settings.target===e?a.DOM.windowWidth()+this.settings.margin:a.DOM.width(this.settings.target)+this.settings.margin;f=a.coalesce(f,this.settings.slideSpeed);if(!(e.Math.abs(j)<1)){switch(d){case a.TouchElement.ActionTypes.swipeLeft:c=i*-1;break;case a.TouchElement.ActionTypes.swipeRight:c=i;break;default:j=c.x-this.touchStartPoint.x,c=e.Math.abs(j)>i/2?j>0?i:i*-1:0}this.lastSlideByAction=c<0?b.Carousel.SlideByAction.next:
c>0?b.Carousel.SlideByAction.previous:b.Carousel.SlideByAction.current;if(!this.settings.loop&&(this.lastSlideByAction===b.Carousel.SlideByAction.previous&&this.currentCacheIndex===0||this.lastSlideByAction===b.Carousel.SlideByAction.next&&this.currentCacheIndex===this.cache.images.length-1))c=0,this.lastSlideByAction=b.Carousel.SlideByAction.current;this.isSliding=!0;this.doSlideCarousel(c,f)}}},moveCarousel:function(a){this.isSliding||this.settings.enableDrag&&this.doMoveCarousel(a.x-this.touchStartPoint.x)},
getItemEls:function(){return a.DOM.find("."+b.Carousel.CssClasses.item,this.contentEl)},previous:function(){this.stopSlideshow();this.slideCarousel({x:0,y:0},a.TouchElement.ActionTypes.swipeRight,this.settings.nextPreviousSlideSpeed)},next:function(){this.stopSlideshow();this.slideCarousel({x:0,y:0},a.TouchElement.ActionTypes.swipeLeft,this.settings.nextPreviousSlideSpeed)},slideshowNext:function(){this.slideCarousel({x:0,y:0},a.TouchElement.ActionTypes.swipeLeft)},startSlideshow:function(){this.stopSlideshow();
this.isSlideshowActive=!0;this.slideshowTimeout=e.setTimeout(this.slideshowNext.bind(this),this.settings.slideshowDelay);a.Events.fire(this,{type:b.Carousel.EventTypes.onSlideshowStart,target:this})},stopSlideshow:function(){if(!a.isNothing(this.slideshowTimeout))e.clearTimeout(this.slideshowTimeout),this.slideshowTimeout=null,this.isSlideshowActive=!1,a.Events.fire(this,{type:b.Carousel.EventTypes.onSlideshowStop,target:this})},onSlideByEnd:function(){if(!a.isNothing(this.isSliding)){var c=this.getItemEls();
this.isSliding=!1;this.lastSlideByAction===b.Carousel.SlideByAction.next?this.currentCacheIndex+=1:this.lastSlideByAction===b.Carousel.SlideByAction.previous&&(this.currentCacheIndex-=1);if(this.settings.loop)if(this.lastSlideByAction===b.Carousel.SlideByAction.next?a.DOM.appendChild(c[0],this.contentEl):this.lastSlideByAction===b.Carousel.SlideByAction.previous&&a.DOM.insertBefore(c[c.length-1],c[0],this.contentEl),this.currentCacheIndex<0)this.currentCacheIndex=this.cache.images.length-1;else{if(this.currentCacheIndex===
this.cache.images.length)this.currentCacheIndex=0}else this.cache.images.length>3&&(this.currentCacheIndex>1&&this.currentCacheIndex<this.cache.images.length-2?this.lastSlideByAction===b.Carousel.SlideByAction.next?a.DOM.appendChild(c[0],this.contentEl):this.lastSlideByAction===b.Carousel.SlideByAction.previous&&a.DOM.insertBefore(c[c.length-1],c[0],this.contentEl):this.currentCacheIndex===1?this.lastSlideByAction===b.Carousel.SlideByAction.previous&&a.DOM.insertBefore(c[c.length-1],c[0],this.contentEl):
this.currentCacheIndex===this.cache.images.length-2&&this.lastSlideByAction===b.Carousel.SlideByAction.next&&a.DOM.appendChild(c[0],this.contentEl));this.lastSlideByAction!==b.Carousel.SlideByAction.current&&(this.setContentLeftPosition(),this.setImages(!0));a.Events.fire(this,{type:b.Carousel.EventTypes.onSlideByEnd,target:this,action:this.lastSlideByAction,cacheIndex:this.currentCacheIndex});this.isSlideshowActive&&(this.lastSlideByAction!==b.Carousel.SlideByAction.current?this.startSlideshow():
this.stopSlideshow())}},onTouch:function(b,d){this.stopSlideshow();switch(b){case a.TouchElement.ActionTypes.touchStart:this.touchStartPoint=d;this.touchStartPosition={x:e.parseInt(a.DOM.getStyle(this.contentEl,"left"),0),y:e.parseInt(a.DOM.getStyle(this.contentEl,"top"),0)};break;case a.TouchElement.ActionTypes.touchMove:this.moveCarousel(d);break;case a.TouchElement.ActionTypes.touchMoveEnd:case a.TouchElement.ActionTypes.swipeLeft:case a.TouchElement.ActionTypes.swipeRight:this.slideCarousel(d,
b)}},onImageLoad:function(c){c=c.target;a.isNothing(c.imageEl.parentNode)||(a.DOM.removeClass(c.imageEl.parentNode,b.Carousel.CssClasses.itemLoading),this.resetImagePosition(c.imageEl));a.Events.remove(c,b.Image.EventTypes.onLoad,this.imageLoadHandler);a.Events.remove(c,b.Image.EventTypes.onError,this.imageErrorHandler)},onImageError:function(c){c=c.target;a.isNothing(c.imageEl.parentNode)||(a.DOM.removeClass(c.imageEl.parentNode,b.Carousel.CssClasses.itemLoading),a.DOM.addClass(c.imageEl.parentNode,
b.Carousel.CssClasses.itemError));a.Events.remove(c,b.Image.EventTypes.onLoad,this.imageLoadHandler);a.Events.remove(c,b.Image.EventTypes.onError,this.imageErrorHandler)}})})(window,window.klass,window.Code.Util);
(function(e,d,a){a.registerNamespace("Code.PhotoSwipe.Carousel");d=e.Code.PhotoSwipe;d.Carousel.CarouselClass=d.Carousel.CarouselClass.extend({getStartingPos:function(){var b=this.touchStartPosition;a.isNothing(b)&&(b={x:e.parseInt(a.DOM.getStyle(this.contentEl,"left"),0),y:e.parseInt(a.DOM.getStyle(this.contentEl,"top"),0)});return b},doMoveCarousel:function(b){var c;a.Browser.isCSSTransformSupported?(c={},c[a.Animation._transitionPrefix+"Property"]="all",c[a.Animation._transitionPrefix+"Duration"]=
"",c[a.Animation._transitionPrefix+"TimingFunction"]="",c[a.Animation._transitionPrefix+"Delay"]="0",c[a.Animation._transformLabel]=a.Browser.is3dSupported?"translate3d("+b+"px, 0px, 0px)":"translate("+b+"px, 0px)",a.DOM.setStyle(this.contentEl,c)):a.isNothing(e.jQuery)||e.jQuery(this.contentEl).stop().css("left",this.getStartingPos().x+b+"px")},doSlideCarousel:function(b,c){var d;if(c<=0)this.slideByEndHandler();else if(a.Browser.isCSSTransformSupported)d=a.coalesce(this.contentEl.style.webkitTransform,
this.contentEl.style.MozTransform,this.contentEl.style.transform,""),d.indexOf("translate3d("+b)===0?this.slideByEndHandler():d.indexOf("translate("+b)===0?this.slideByEndHandler():a.Animation.slideBy(this.contentEl,b,0,c,this.slideByEndHandler,this.settings.slideTimingFunction);else if(!a.isNothing(e.jQuery)){d={left:this.getStartingPos().x+b+"px"};if(this.settings.animationTimingFunction==="ease-out")this.settings.animationTimingFunction="easeOutQuad";if(a.isNothing(e.jQuery.easing[this.settings.animationTimingFunction]))this.settings.animationTimingFunction=
"linear";e.jQuery(this.contentEl).animate(d,this.settings.slideSpeed,this.settings.animationTimingFunction,this.slideByEndHandler)}}})})(window,window.klass,window.Code.Util,window.Code.PhotoSwipe.TouchElement);
(function(e,d,a){a.registerNamespace("Code.PhotoSwipe.Toolbar");var b=e.Code.PhotoSwipe;b.Toolbar.CssClasses={toolbar:"ps-toolbar",toolbarContent:"ps-toolbar-content",toolbarTop:"ps-toolbar-top",caption:"ps-caption",captionBottom:"ps-caption-bottom",captionContent:"ps-caption-content",close:"ps-toolbar-close",play:"ps-toolbar-play",previous:"ps-toolbar-previous",previousDisabled:"ps-toolbar-previous-disabled",next:"ps-toolbar-next",nextDisabled:"ps-toolbar-next-disabled"};b.Toolbar.ToolbarAction=
{close:"close",play:"play",next:"next",previous:"previous",none:"none"};b.Toolbar.EventTypes={onTap:"PhotoSwipeToolbarOnClick",onBeforeShow:"PhotoSwipeToolbarOnBeforeShow",onShow:"PhotoSwipeToolbarOnShow",onBeforeHide:"PhotoSwipeToolbarOnBeforeHide",onHide:"PhotoSwipeToolbarOnHide"};b.Toolbar.getToolbar=function(){return'<div class="'+b.Toolbar.CssClasses.close+'"><div class="'+b.Toolbar.CssClasses.toolbarContent+'"></div></div><div class="'+b.Toolbar.CssClasses.play+'"><div class="'+b.Toolbar.CssClasses.toolbarContent+
'"></div></div><div class="'+b.Toolbar.CssClasses.previous+'"><div class="'+b.Toolbar.CssClasses.toolbarContent+'"></div></div><div class="'+b.Toolbar.CssClasses.next+'"><div class="'+b.Toolbar.CssClasses.toolbarContent+'"></div></div>'}})(window,window.klass,window.Code.Util);
(function(e,d,a){a.registerNamespace("Code.PhotoSwipe.Toolbar");var b=e.Code.PhotoSwipe;b.Toolbar.ToolbarClass=d({toolbarEl:null,closeEl:null,playEl:null,previousEl:null,nextEl:null,captionEl:null,captionContentEl:null,currentCaption:null,settings:null,cache:null,timeout:null,isVisible:null,fadeOutHandler:null,touchStartHandler:null,touchMoveHandler:null,clickHandler:null,dispose:function(){var b;this.clearTimeout();this.removeEventHandlers();a.Animation.stop(this.toolbarEl);a.Animation.stop(this.captionEl);
a.DOM.removeChild(this.toolbarEl,this.toolbarEl.parentNode);a.DOM.removeChild(this.captionEl,this.captionEl.parentNode);for(b in this)a.objectHasProperty(this,b)&&(this[b]=null)},initialize:function(c,d){var f;this.settings=d;this.cache=c;this.isVisible=!1;this.fadeOutHandler=this.onFadeOut.bind(this);this.touchStartHandler=this.onTouchStart.bind(this);this.touchMoveHandler=this.onTouchMove.bind(this);this.clickHandler=this.onClick.bind(this);f=b.Toolbar.CssClasses.toolbar;this.settings.captionAndToolbarFlipPosition&&
(f=f+" "+b.Toolbar.CssClasses.toolbarTop);this.toolbarEl=a.DOM.createElement("div",{"class":f},this.settings.getToolbar());a.DOM.setStyle(this.toolbarEl,{left:0,position:"absolute",overflow:"hidden",zIndex:this.settings.zIndex});this.settings.target===e?a.DOM.appendToBody(this.toolbarEl):a.DOM.appendChild(this.toolbarEl,this.settings.target);a.DOM.hide(this.toolbarEl);this.closeEl=a.DOM.find("."+b.Toolbar.CssClasses.close,this.toolbarEl)[0];this.settings.preventHide&&!a.isNothing(this.closeEl)&&a.DOM.hide(this.closeEl);
this.playEl=a.DOM.find("."+b.Toolbar.CssClasses.play,this.toolbarEl)[0];this.settings.preventSlideshow&&!a.isNothing(this.playEl)&&a.DOM.hide(this.playEl);this.nextEl=a.DOM.find("."+b.Toolbar.CssClasses.next,this.toolbarEl)[0];this.previousEl=a.DOM.find("."+b.Toolbar.CssClasses.previous,this.toolbarEl)[0];f=b.Toolbar.CssClasses.caption;this.settings.captionAndToolbarFlipPosition&&(f=f+" "+b.Toolbar.CssClasses.captionBottom);this.captionEl=a.DOM.createElement("div",{"class":f},"");a.DOM.setStyle(this.captionEl,
{left:0,position:"absolute",overflow:"hidden",zIndex:this.settings.zIndex});this.settings.target===e?a.DOM.appendToBody(this.captionEl):a.DOM.appendChild(this.captionEl,this.settings.target);a.DOM.hide(this.captionEl);this.captionContentEl=a.DOM.createElement("div",{"class":b.Toolbar.CssClasses.captionContent},"");a.DOM.appendChild(this.captionContentEl,this.captionEl);this.addEventHandlers()},resetPosition:function(){var b,d,f;this.settings.target===e?(this.settings.captionAndToolbarFlipPosition?
(d=a.DOM.windowScrollTop(),f=a.DOM.windowScrollTop()+a.DOM.windowHeight()-a.DOM.height(this.captionEl)):(d=a.DOM.windowScrollTop()+a.DOM.windowHeight()-a.DOM.height(this.toolbarEl),f=a.DOM.windowScrollTop()),b=a.DOM.windowWidth()):(this.settings.captionAndToolbarFlipPosition?(d="0",f=a.DOM.height(this.settings.target)-a.DOM.height(this.captionEl)):(d=a.DOM.height(this.settings.target)-a.DOM.height(this.toolbarEl),f=0),b=a.DOM.width(this.settings.target));a.DOM.setStyle(this.toolbarEl,{top:d+"px",
width:b});a.DOM.setStyle(this.captionEl,{top:f+"px",width:b})},toggleVisibility:function(a){this.isVisible?this.fadeOut():this.show(a)},show:function(c){a.Animation.stop(this.toolbarEl);a.Animation.stop(this.captionEl);this.resetPosition();this.setToolbarStatus(c);a.Events.fire(this,{type:b.Toolbar.EventTypes.onBeforeShow,target:this});this.showToolbar();this.setCaption(c);this.showCaption();this.isVisible=!0;this.setTimeout();a.Events.fire(this,{type:b.Toolbar.EventTypes.onShow,target:this})},setTimeout:function(){if(this.settings.captionAndToolbarAutoHideDelay>
0)this.clearTimeout(),this.timeout=e.setTimeout(this.fadeOut.bind(this),this.settings.captionAndToolbarAutoHideDelay)},clearTimeout:function(){if(!a.isNothing(this.timeout))e.clearTimeout(this.timeout),this.timeout=null},fadeOut:function(){this.clearTimeout();a.Events.fire(this,{type:b.Toolbar.EventTypes.onBeforeHide,target:this});a.Animation.fadeOut(this.toolbarEl,this.settings.fadeOutSpeed);a.Animation.fadeOut(this.captionEl,this.settings.fadeOutSpeed,this.fadeOutHandler);this.isVisible=!1},addEventHandlers:function(){a.Browser.isTouchSupported&&
(a.Browser.blackberry||a.Events.add(this.toolbarEl,"touchstart",this.touchStartHandler),a.Events.add(this.toolbarEl,"touchmove",this.touchMoveHandler),a.Events.add(this.captionEl,"touchmove",this.touchMoveHandler));a.Events.add(this.toolbarEl,"click",this.clickHandler)},removeEventHandlers:function(){a.Browser.isTouchSupported&&(a.Browser.blackberry||a.Events.remove(this.toolbarEl,"touchstart",this.touchStartHandler),a.Events.remove(this.toolbarEl,"touchmove",this.touchMoveHandler),a.Events.remove(this.captionEl,
"touchmove",this.touchMoveHandler));a.Events.remove(this.toolbarEl,"click",this.clickHandler)},handleTap:function(c){this.clearTimeout();var d;if(c.target===this.nextEl||a.DOM.isChildOf(c.target,this.nextEl))d=b.Toolbar.ToolbarAction.next;else if(c.target===this.previousEl||a.DOM.isChildOf(c.target,this.previousEl))d=b.Toolbar.ToolbarAction.previous;else if(c.target===this.closeEl||a.DOM.isChildOf(c.target,this.closeEl))d=b.Toolbar.ToolbarAction.close;else if(c.target===this.playEl||a.DOM.isChildOf(c.target,
this.playEl))d=b.Toolbar.ToolbarAction.play;this.setTimeout();if(a.isNothing(d))d=b.Toolbar.ToolbarAction.none;a.Events.fire(this,{type:b.Toolbar.EventTypes.onTap,target:this,action:d,tapTarget:c.target})},setCaption:function(b){a.DOM.removeChildren(this.captionContentEl);this.currentCaption=a.coalesce(this.cache.images[b].caption,"\u00a0");if(a.isObject(this.currentCaption))a.DOM.appendChild(this.currentCaption,this.captionContentEl);else{if(this.currentCaption==="")this.currentCaption="\u00a0";
a.DOM.appendText(this.currentCaption,this.captionContentEl)}this.currentCaption=this.currentCaption==="\u00a0"?"":this.currentCaption;this.resetPosition()},showToolbar:function(){a.DOM.setStyle(this.toolbarEl,{opacity:this.settings.captionAndToolbarOpacity});a.DOM.show(this.toolbarEl)},showCaption:function(){(this.currentCaption===""||this.captionContentEl.childNodes.length<1)&&!this.settings.captionAndToolbarShowEmptyCaptions?a.DOM.hide(this.captionEl):(a.DOM.setStyle(this.captionEl,{opacity:this.settings.captionAndToolbarOpacity}),
a.DOM.show(this.captionEl))},setToolbarStatus:function(c){this.settings.loop||(a.DOM.removeClass(this.previousEl,b.Toolbar.CssClasses.previousDisabled),a.DOM.removeClass(this.nextEl,b.Toolbar.CssClasses.nextDisabled),c>0&&c<this.cache.images.length-1||(c===0&&(a.isNothing(this.previousEl)||a.DOM.addClass(this.previousEl,b.Toolbar.CssClasses.previousDisabled)),c===this.cache.images.length-1&&(a.isNothing(this.nextEl)||a.DOM.addClass(this.nextEl,b.Toolbar.CssClasses.nextDisabled))))},onFadeOut:function(){a.DOM.hide(this.toolbarEl);
a.DOM.hide(this.captionEl);a.Events.fire(this,{type:b.Toolbar.EventTypes.onHide,target:this})},onTouchStart:function(b){b.preventDefault();a.Events.remove(this.toolbarEl,"click",this.clickHandler);this.handleTap(b)},onTouchMove:function(a){a.preventDefault()},onClick:function(a){a.preventDefault();this.handleTap(a)}})})(window,window.klass,window.Code.Util);
(function(e,d,a){a.registerNamespace("Code.PhotoSwipe.UILayer");e.Code.PhotoSwipe.UILayer.CssClasses={uiLayer:"ps-uilayer"}})(window,window.klass,window.Code.Util);
(function(e,d,a){a.registerNamespace("Code.PhotoSwipe.UILayer");var b=e.Code.PhotoSwipe;b.UILayer.UILayerClass=a.TouchElement.TouchElementClass.extend({el:null,settings:null,dispose:function(){var b;this.removeEventHandlers();a.DOM.removeChild(this.el,this.el.parentNode);for(b in this)a.objectHasProperty(this,b)&&(this[b]=null)},initialize:function(c){this.settings=c;this.el=a.DOM.createElement("div",{"class":b.UILayer.CssClasses.uiLayer},"");a.DOM.setStyle(this.el,{display:"block",position:"absolute",
left:0,top:0,overflow:"hidden",zIndex:this.settings.zIndex,opacity:0});a.DOM.hide(this.el);this.settings.target===e?a.DOM.appendToBody(this.el):a.DOM.appendChild(this.el,this.settings.target);this.supr(this.el,{swipe:!0,move:!0,gesture:a.Browser.iOS,doubleTap:!0,preventDefaultTouchEvents:this.settings.preventDefaultTouchEvents})},resetPosition:function(){this.settings.target===e?a.DOM.setStyle(this.el,{top:a.DOM.windowScrollTop()+"px",width:a.DOM.windowWidth(),height:a.DOM.windowHeight()}):a.DOM.setStyle(this.el,
{top:"0px",width:a.DOM.width(this.settings.target),height:a.DOM.height(this.settings.target)})},show:function(){this.resetPosition();a.DOM.show(this.el);this.addEventHandlers()},addEventHandlers:function(){this.supr()},removeEventHandlers:function(){this.supr()}})})(window,window.klass,window.Code.Util);
(function(e,d,a){a.registerNamespace("Code.PhotoSwipe.ZoomPanRotate");e=e.Code.PhotoSwipe;e.ZoomPanRotate.CssClasses={zoomPanRotate:"ps-zoom-pan-rotate"};e.ZoomPanRotate.EventTypes={onTransform:"PhotoSwipeZoomPanRotateOnTransform"}})(window,window.klass,window.Code.Util);
(function(e,d,a){a.registerNamespace("Code.PhotoSwipe.ZoomPanRotate");var b=e.Code.PhotoSwipe;b.ZoomPanRotate.ZoomPanRotateClass=d({el:null,settings:null,containerEl:null,imageEl:null,transformSettings:null,panStartingPoint:null,transformEl:null,dispose:function(){var b;a.DOM.removeChild(this.el,this.el.parentNode);for(b in this)a.objectHasProperty(this,b)&&(this[b]=null)},initialize:function(c,d,f){var i,j,h;this.settings=c;this.settings.target===e?(c=document.body,i=a.DOM.windowWidth(),j=a.DOM.windowHeight(),
h=a.DOM.windowScrollTop()+"px"):(c=this.settings.target,i=a.DOM.width(c),j=a.DOM.height(c),h="0px");this.imageEl=d.imageEl.cloneNode(!1);a.DOM.setStyle(this.imageEl,{zIndex:1});this.transformSettings={startingScale:1,scale:1,startingRotation:0,rotation:0,startingTranslateX:0,startingTranslateY:0,translateX:0,translateY:0};this.el=a.DOM.createElement("div",{"class":b.ZoomPanRotate.CssClasses.zoomPanRotate},"");a.DOM.setStyle(this.el,{left:0,top:h,position:"absolute",width:i,height:j,zIndex:this.settings.zIndex,
display:"block"});a.DOM.insertBefore(this.el,f.el,c);a.Browser.iOS?(this.containerEl=a.DOM.createElement("div","",""),a.DOM.setStyle(this.containerEl,{left:0,top:0,width:i,height:j,position:"absolute",zIndex:1}),a.DOM.appendChild(this.imageEl,this.containerEl),a.DOM.appendChild(this.containerEl,this.el),a.Animation.resetTranslate(this.containerEl),a.Animation.resetTranslate(this.imageEl),this.transformEl=this.containerEl):(a.DOM.appendChild(this.imageEl,this.el),this.transformEl=this.imageEl)},setStartingTranslateFromCurrentTransform:function(){var b=
a.coalesce(this.transformEl.style.webkitTransform,this.transformEl.style.MozTransform,this.transformEl.style.transform);if(!a.isNothing(b)&&(b=b.match(/translate\((.*?)\)/),!a.isNothing(b)))b=b[1].split(", "),this.transformSettings.startingTranslateX=e.parseInt(b[0],10),this.transformSettings.startingTranslateY=e.parseInt(b[1],10)},getScale:function(a){a*=this.transformSettings.startingScale;if(this.settings.minUserZoom!==0&&a<this.settings.minUserZoom)a=this.settings.minUserZoom;else if(this.settings.maxUserZoom!==
0&&a>this.settings.maxUserZoom)a=this.settings.maxUserZoom;return a},setStartingScaleAndRotation:function(a,b){this.transformSettings.startingScale=this.getScale(a);this.transformSettings.startingRotation=(this.transformSettings.startingRotation+b)%360},zoomRotate:function(a,b){this.transformSettings.scale=this.getScale(a);this.transformSettings.rotation=this.transformSettings.startingRotation+b;this.applyTransform()},panStart:function(a){this.setStartingTranslateFromCurrentTransform();this.panStartingPoint=
{x:a.x,y:a.y}},pan:function(a){var b=(a.y-this.panStartingPoint.y)/this.transformSettings.scale;this.transformSettings.translateX=this.transformSettings.startingTranslateX+(a.x-this.panStartingPoint.x)/this.transformSettings.scale;this.transformSettings.translateY=this.transformSettings.startingTranslateY+b;this.applyTransform()},zoomAndPanToPoint:function(b,d){if(this.settings.target===e){this.panStart({x:a.DOM.windowWidth()/2,y:a.DOM.windowHeight()/2});var f=(d.y-this.panStartingPoint.y)/this.transformSettings.scale;
this.transformSettings.translateX=(this.transformSettings.startingTranslateX+(d.x-this.panStartingPoint.x)/this.transformSettings.scale)*-1;this.transformSettings.translateY=(this.transformSettings.startingTranslateY+f)*-1}this.setStartingScaleAndRotation(b,0);this.transformSettings.scale=this.transformSettings.startingScale;this.transformSettings.rotation=0;this.applyTransform()},applyTransform:function(){var c=this.transformSettings.rotation%360,d=e.parseInt(this.transformSettings.translateX,10),
f=e.parseInt(this.transformSettings.translateY,10),i="scale("+this.transformSettings.scale+") rotate("+c+"deg) translate("+d+"px, "+f+"px)";a.DOM.setStyle(this.transformEl,{webkitTransform:i,MozTransform:i,msTransform:i,transform:i});a.Events.fire(this,{target:this,type:b.ZoomPanRotate.EventTypes.onTransform,scale:this.transformSettings.scale,rotation:this.transformSettings.rotation,rotationDegs:c,translateX:d,translateY:f})}})})(window,window.klass,window.Code.Util);
(function(e,d){d.registerNamespace("Code.PhotoSwipe");var a=e.Code.PhotoSwipe;a.CssClasses={buildingBody:"ps-building",activeBody:"ps-active"};a.EventTypes={onBeforeShow:"PhotoSwipeOnBeforeShow",onShow:"PhotoSwipeOnShow",onBeforeHide:"PhotoSwipeOnBeforeHide",onHide:"PhotoSwipeOnHide",onDisplayImage:"PhotoSwipeOnDisplayImage",onResetPosition:"PhotoSwipeOnResetPosition",onSlideshowStart:"PhotoSwipeOnSlideshowStart",onSlideshowStop:"PhotoSwipeOnSlideshowStop",onTouch:"PhotoSwipeOnTouch",onBeforeCaptionAndToolbarShow:"PhotoSwipeOnBeforeCaptionAndToolbarShow",
onCaptionAndToolbarShow:"PhotoSwipeOnCaptionAndToolbarShow",onBeforeCaptionAndToolbarHide:"PhotoSwipeOnBeforeCaptionAndToolbarHide",onCaptionAndToolbarHide:"PhotoSwipeOnCaptionAndToolbarHide",onToolbarTap:"PhotoSwipeOnToolbarTap",onBeforeZoomPanRotateShow:"PhotoSwipeOnBeforeZoomPanRotateShow",onZoomPanRotateShow:"PhotoSwipeOnZoomPanRotateShow",onBeforeZoomPanRotateHide:"PhotoSwipeOnBeforeZoomPanRotateHide",onZoomPanRotateHide:"PhotoSwipeOnZoomPanRotateHide",onZoomPanRotateTransform:"PhotoSwipeOnZoomPanRotateTransform"};
a.instances=[];a.activeInstances=[];a.setActivateInstance=function(b){if(d.arrayIndexOf(b.settings.target,a.activeInstances,"target")>-1)throw"Code.PhotoSwipe.activateInstance: Unable to active instance as another instance is already active for this target";a.activeInstances.push({target:b.settings.target,instance:b})};a.unsetActivateInstance=function(b){b=d.arrayIndexOf(b,a.activeInstances,"instance");a.activeInstances.splice(b,1)};a.attach=function(b,c,e){var f,i;f=a.createInstance(b,c,e);c=0;for(e=
b.length;c<e;c++)if(i=b[c],!d.isNothing(i.nodeType)&&i.nodeType===1)i.__photoSwipeClickHandler=a.onTriggerElementClick.bind(f),d.Events.remove(i,"click",i.__photoSwipeClickHandler),d.Events.add(i,"click",i.__photoSwipeClickHandler);return f};if(e.jQuery)e.jQuery.fn.photoSwipe=function(b,c){return a.attach(this,b,c)};a.detatch=function(b){var c,e,f;c=0;for(e=b.originalImages.length;c<e;c++)f=b.originalImages[c],!d.isNothing(f.nodeType)&&f.nodeType===1&&(d.Events.remove(f,"click",f.__photoSwipeClickHandler),
delete f.__photoSwipeClickHandler);a.disposeInstance(b)};a.createInstance=function(b,c,e){var f;if(d.isNothing(b))throw"Code.PhotoSwipe.attach: No images passed.";if(!d.isLikeArray(b))throw"Code.PhotoSwipe.createInstance: Images must be an array of elements or image urls.";if(b.length<1)throw"Code.PhotoSwipe.createInstance: No images to passed.";c=d.coalesce(c,{});f=a.getInstance(e);if(d.isNothing(f))f=new a.PhotoSwipeClass(b,c,e),a.instances.push(f);else throw'Code.PhotoSwipe.createInstance: Instance with id "'+
e+' already exists."';return f};a.disposeInstance=function(b){var c=a.getInstanceIndex(b);if(c<0)throw"Code.PhotoSwipe.disposeInstance: Unable to find instance to dispose.";b.dispose();a.instances.splice(c,1)};a.onTriggerElementClick=function(a){a.preventDefault();this.show(a.currentTarget)};a.getInstance=function(b){var c,d,e;c=0;for(d=a.instances.length;c<d;c++)if(e=a.instances[c],e.id===b)return e;return null};a.getInstanceIndex=function(b){var c,d,e=-1;c=0;for(d=a.instances.length;c<d;c++)if(a.instances[c]===
b){e=c;break}return e}})(window,window.Code.Util);
(function(e,d,a,b,c,g,f,i,j){a.registerNamespace("Code.PhotoSwipe");var h=e.Code.PhotoSwipe;h.PhotoSwipeClass=d({id:null,settings:null,isBackEventSupported:null,backButtonClicked:null,currentIndex:null,originalImages:null,mouseWheelStartTime:null,windowDimensions:null,cache:null,documentOverlay:null,carousel:null,uiLayer:null,toolbar:null,zoomPanRotate:null,windowOrientationChangeHandler:null,windowScrollHandler:null,windowHashChangeHandler:null,keyDownHandler:null,windowOrientationEventName:null,
uiLayerTouchHandler:null,carouselSlideByEndHandler:null,carouselSlideshowStartHandler:null,carouselSlideshowStopHandler:null,toolbarTapHandler:null,toolbarBeforeShowHandler:null,toolbarShowHandler:null,toolbarBeforeHideHandler:null,toolbarHideHandler:null,mouseWheelHandler:null,zoomPanRotateTransformHandler:null,_isResettingPosition:null,_uiWebViewResetPositionTimeout:null,dispose:function(){var b;a.Events.remove(this,h.EventTypes.onBeforeShow);a.Events.remove(this,h.EventTypes.onShow);a.Events.remove(this,
h.EventTypes.onBeforeHide);a.Events.remove(this,h.EventTypes.onHide);a.Events.remove(this,h.EventTypes.onDisplayImage);a.Events.remove(this,h.EventTypes.onResetPosition);a.Events.remove(this,h.EventTypes.onSlideshowStart);a.Events.remove(this,h.EventTypes.onSlideshowStop);a.Events.remove(this,h.EventTypes.onTouch);a.Events.remove(this,h.EventTypes.onBeforeCaptionAndToolbarShow);a.Events.remove(this,h.EventTypes.onCaptionAndToolbarShow);a.Events.remove(this,h.EventTypes.onBeforeCaptionAndToolbarHide);
a.Events.remove(this,h.EventTypes.onCaptionAndToolbarHide);a.Events.remove(this,h.EventTypes.onZoomPanRotateTransform);this.removeEventHandlers();a.isNothing(this.documentOverlay)||this.documentOverlay.dispose();a.isNothing(this.carousel)||this.carousel.dispose();a.isNothing(this.uiLayer)||this.uiLayer.dispose();a.isNothing(this.toolbar)||this.toolbar.dispose();this.destroyZoomPanRotate();a.isNothing(this.cache)||this.cache.dispose();for(b in this)a.objectHasProperty(this,b)&&(this[b]=null)},initialize:function(c,
d,f){this.id=a.isNothing(f)?"PhotoSwipe"+(new Date).getTime().toString():f;this.originalImages=c;if(a.Browser.android&&!a.Browser.firefox&&e.navigator.userAgent.match(/Android (\d+.\d+)/).toString().replace(/^.*\,/,"")>=2.1)this.isBackEventSupported=!0;if(!this.isBackEventSupported)this.isBackEventSupported=a.objectHasProperty(e,"onhashchange");this.settings={fadeInSpeed:250,fadeOutSpeed:250,preventHide:!1,preventSlideshow:!1,zIndex:1E3,backButtonHideEnabled:!0,enableKeyboard:!0,enableMouseWheel:!0,
mouseWheelSpeed:350,autoStartSlideshow:!1,jQueryMobile:!a.isNothing(e.jQuery)&&!a.isNothing(e.jQuery.mobile),jQueryMobileDialogHash:"&ui-state=dialog",enableUIWebViewRepositionTimeout:!1,uiWebViewResetPositionDelay:500,target:e,preventDefaultTouchEvents:!0,loop:!0,slideSpeed:250,nextPreviousSlideSpeed:0,enableDrag:!0,swipeThreshold:50,swipeTimeThreshold:250,slideTimingFunction:"ease-out",slideshowDelay:3E3,doubleTapSpeed:250,margin:20,imageScaleMethod:"fit",captionAndToolbarHide:!1,captionAndToolbarFlipPosition:!1,
captionAndToolbarAutoHideDelay:5E3,captionAndToolbarOpacity:0.8,captionAndToolbarShowEmptyCaptions:!0,getToolbar:h.Toolbar.getToolbar,allowUserZoom:!0,allowRotationOnUserZoom:!1,maxUserZoom:5,minUserZoom:0.5,doubleTapZoomLevel:2.5,getImageSource:h.Cache.Functions.getImageSource,getImageCaption:h.Cache.Functions.getImageCaption,getImageMetaData:h.Cache.Functions.getImageMetaData,cacheMode:h.Cache.Mode.normal};a.extend(this.settings,d);this.settings.target!==e&&(d=a.DOM.getStyle(this.settings.target,
"position"),(d!=="relative"||d!=="absolute")&&a.DOM.setStyle(this.settings.target,"position","relative"));if(this.settings.target!==e)this.isBackEventSupported=!1,this.settings.backButtonHideEnabled=!1;else if(this.settings.preventHide)this.settings.backButtonHideEnabled=!1;this.cache=new b.CacheClass(c,this.settings)},show:function(b){var c,d;this.backButtonClicked=this._isResettingPosition=!1;if(a.isNumber(b))this.currentIndex=b;else{this.currentIndex=-1;c=0;for(d=this.originalImages.length;c<d;c++)if(this.originalImages[c]===
b){this.currentIndex=c;break}}if(this.currentIndex<0||this.currentIndex>this.originalImages.length-1)throw"Code.PhotoSwipe.PhotoSwipeClass.show: Starting index out of range";this.isAlreadyGettingPage=this.getWindowDimensions();h.setActivateInstance(this);this.windowDimensions=this.getWindowDimensions();this.settings.target===e?a.DOM.addClass(e.document.body,h.CssClasses.buildingBody):a.DOM.addClass(this.settings.target,h.CssClasses.buildingBody);this.createComponents();a.Events.fire(this,{type:h.EventTypes.onBeforeShow,
target:this});this.documentOverlay.fadeIn(this.settings.fadeInSpeed,this.onDocumentOverlayFadeIn.bind(this))},getWindowDimensions:function(){return{width:a.DOM.windowWidth(),height:a.DOM.windowHeight()}},createComponents:function(){this.documentOverlay=new c.DocumentOverlayClass(this.settings);this.carousel=new g.CarouselClass(this.cache,this.settings);this.uiLayer=new i.UILayerClass(this.settings);if(!this.settings.captionAndToolbarHide)this.toolbar=new f.ToolbarClass(this.cache,this.settings)},
resetPosition:function(){if(!this._isResettingPosition){var b=this.getWindowDimensions();if(a.isNothing(this.windowDimensions)||!(b.width===this.windowDimensions.width&&b.height===this.windowDimensions.height))this._isResettingPosition=!0,this.windowDimensions=b,this.destroyZoomPanRotate(),this.documentOverlay.resetPosition(),this.carousel.resetPosition(),a.isNothing(this.toolbar)||this.toolbar.resetPosition(),this.uiLayer.resetPosition(),this._isResettingPosition=!1,a.Events.fire(this,{type:h.EventTypes.onResetPosition,
target:this})}},addEventHandler:function(b,c){a.Events.add(this,b,c)},addEventHandlers:function(){if(a.isNothing(this.windowOrientationChangeHandler))this.windowOrientationChangeHandler=this.onWindowOrientationChange.bind(this),this.windowScrollHandler=this.onWindowScroll.bind(this),this.keyDownHandler=this.onKeyDown.bind(this),this.windowHashChangeHandler=this.onWindowHashChange.bind(this),this.uiLayerTouchHandler=this.onUILayerTouch.bind(this),this.carouselSlideByEndHandler=this.onCarouselSlideByEnd.bind(this),
this.carouselSlideshowStartHandler=this.onCarouselSlideshowStart.bind(this),this.carouselSlideshowStopHandler=this.onCarouselSlideshowStop.bind(this),this.toolbarTapHandler=this.onToolbarTap.bind(this),this.toolbarBeforeShowHandler=this.onToolbarBeforeShow.bind(this),this.toolbarShowHandler=this.onToolbarShow.bind(this),this.toolbarBeforeHideHandler=this.onToolbarBeforeHide.bind(this),this.toolbarHideHandler=this.onToolbarHide.bind(this),this.mouseWheelHandler=this.onMouseWheel.bind(this),this.zoomPanRotateTransformHandler=
this.onZoomPanRotateTransform.bind(this);a.Browser.android?this.orientationEventName="resize":a.Browser.iOS&&!a.Browser.safari?a.Events.add(e.document.body,"orientationchange",this.windowOrientationChangeHandler):this.orientationEventName=!a.isNothing(e.onorientationchange)?"orientationchange":"resize";a.isNothing(this.orientationEventName)||a.Events.add(e,this.orientationEventName,this.windowOrientationChangeHandler);this.settings.target===e&&a.Events.add(e,"scroll",this.windowScrollHandler);this.settings.enableKeyboard&&
a.Events.add(e.document,"keydown",this.keyDownHandler);if(this.isBackEventSupported&&this.settings.backButtonHideEnabled)this.windowHashChangeHandler=this.onWindowHashChange.bind(this),this.settings.jQueryMobile?e.location.hash=this.settings.jQueryMobileDialogHash:(this.currentHistoryHashValue="PhotoSwipe"+(new Date).getTime().toString(),e.location.hash=this.currentHistoryHashValue),a.Events.add(e,"hashchange",this.windowHashChangeHandler);this.settings.enableMouseWheel&&a.Events.add(e,"mousewheel",
this.mouseWheelHandler);a.Events.add(this.uiLayer,a.TouchElement.EventTypes.onTouch,this.uiLayerTouchHandler);a.Events.add(this.carousel,g.EventTypes.onSlideByEnd,this.carouselSlideByEndHandler);a.Events.add(this.carousel,g.EventTypes.onSlideshowStart,this.carouselSlideshowStartHandler);a.Events.add(this.carousel,g.EventTypes.onSlideshowStop,this.carouselSlideshowStopHandler);a.isNothing(this.toolbar)||(a.Events.add(this.toolbar,f.EventTypes.onTap,this.toolbarTapHandler),a.Events.add(this.toolbar,
f.EventTypes.onBeforeShow,this.toolbarBeforeShowHandler),a.Events.add(this.toolbar,f.EventTypes.onShow,this.toolbarShowHandler),a.Events.add(this.toolbar,f.EventTypes.onBeforeHide,this.toolbarBeforeHideHandler),a.Events.add(this.toolbar,f.EventTypes.onHide,this.toolbarHideHandler))},removeEventHandlers:function(){a.Browser.iOS&&!a.Browser.safari&&a.Events.remove(e.document.body,"orientationchange",this.windowOrientationChangeHandler);a.isNothing(this.orientationEventName)||a.Events.remove(e,this.orientationEventName,
this.windowOrientationChangeHandler);a.Events.remove(e,"scroll",this.windowScrollHandler);this.settings.enableKeyboard&&a.Events.remove(e.document,"keydown",this.keyDownHandler);this.isBackEventSupported&&this.settings.backButtonHideEnabled&&a.Events.remove(e,"hashchange",this.windowHashChangeHandler);this.settings.enableMouseWheel&&a.Events.remove(e,"mousewheel",this.mouseWheelHandler);a.isNothing(this.uiLayer)||a.Events.remove(this.uiLayer,a.TouchElement.EventTypes.onTouch,this.uiLayerTouchHandler);
a.isNothing(this.toolbar)||(a.Events.remove(this.carousel,g.EventTypes.onSlideByEnd,this.carouselSlideByEndHandler),a.Events.remove(this.carousel,g.EventTypes.onSlideshowStart,this.carouselSlideshowStartHandler),a.Events.remove(this.carousel,g.EventTypes.onSlideshowStop,this.carouselSlideshowStopHandler));a.isNothing(this.toolbar)||(a.Events.remove(this.toolbar,f.EventTypes.onTap,this.toolbarTapHandler),a.Events.remove(this.toolbar,f.EventTypes.onBeforeShow,this.toolbarBeforeShowHandler),a.Events.remove(this.toolbar,
f.EventTypes.onShow,this.toolbarShowHandler),a.Events.remove(this.toolbar,f.EventTypes.onBeforeHide,this.toolbarBeforeHideHandler),a.Events.remove(this.toolbar,f.EventTypes.onHide,this.toolbarHideHandler))},hide:function(){if(!this.settings.preventHide){if(a.isNothing(this.documentOverlay))throw"Code.PhotoSwipe.PhotoSwipeClass.hide: PhotoSwipe instance is already hidden";if(a.isNothing(this.hiding)){this.clearUIWebViewResetPositionTimeout();this.destroyZoomPanRotate();this.removeEventHandlers();a.Events.fire(this,
{type:h.EventTypes.onBeforeHide,target:this});this.uiLayer.dispose();this.uiLayer=null;if(!a.isNothing(this.toolbar))this.toolbar.dispose(),this.toolbar=null;this.carousel.dispose();this.carousel=null;a.DOM.removeClass(e.document.body,h.CssClasses.activeBody);this.documentOverlay.dispose();this.documentOverlay=null;this._isResettingPosition=!1;h.unsetActivateInstance(this);a.Events.fire(this,{type:h.EventTypes.onHide,target:this});this.goBackInHistory()}}},goBackInHistory:function(){this.isBackEventSupported&&
this.settings.backButtonHideEnabled&&(this.backButtonClicked||e.history.back())},play:function(){!this.isZoomActive()&&!this.settings.preventSlideshow&&!a.isNothing(this.carousel)&&(!a.isNothing(this.toolbar)&&this.toolbar.isVisible&&this.toolbar.fadeOut(),this.carousel.startSlideshow())},stop:function(){this.isZoomActive()||a.isNothing(this.carousel)||this.carousel.stopSlideshow()},previous:function(){this.isZoomActive()||a.isNothing(this.carousel)||this.carousel.previous()},next:function(){this.isZoomActive()||
a.isNothing(this.carousel)||this.carousel.next()},toggleToolbar:function(){this.isZoomActive()||a.isNothing(this.toolbar)||this.toolbar.toggleVisibility(this.currentIndex)},fadeOutToolbarIfVisible:function(){!a.isNothing(this.toolbar)&&this.toolbar.isVisible&&this.settings.captionAndToolbarAutoHideDelay>0&&this.toolbar.fadeOut()},createZoomPanRotate:function(){this.stop();if(this.canUserZoom()&&!this.isZoomActive())a.Events.fire(this,h.EventTypes.onBeforeZoomPanRotateShow),this.zoomPanRotate=new j.ZoomPanRotateClass(this.settings,
this.cache.images[this.currentIndex],this.uiLayer),this.uiLayer.captureSettings.preventDefaultTouchEvents=!0,a.Events.add(this.zoomPanRotate,h.ZoomPanRotate.EventTypes.onTransform,this.zoomPanRotateTransformHandler),a.Events.fire(this,h.EventTypes.onZoomPanRotateShow),!a.isNothing(this.toolbar)&&this.toolbar.isVisible&&this.toolbar.fadeOut()},destroyZoomPanRotate:function(){if(!a.isNothing(this.zoomPanRotate))a.Events.fire(this,h.EventTypes.onBeforeZoomPanRotateHide),a.Events.remove(this.zoomPanRotate,
h.ZoomPanRotate.EventTypes.onTransform,this.zoomPanRotateTransformHandler),this.zoomPanRotate.dispose(),this.zoomPanRotate=null,this.uiLayer.captureSettings.preventDefaultTouchEvents=this.settings.preventDefaultTouchEvents,a.Events.fire(this,h.EventTypes.onZoomPanRotateHide)},canUserZoom:function(){var b;if(a.Browser.msie){if(b=document.createElement("div"),a.isNothing(b.style.msTransform))return!1}else if(!a.Browser.isCSSTransformSupported)return!1;if(!this.settings.allowUserZoom)return!1;if(this.carousel.isSliding)return!1;
b=this.cache.images[this.currentIndex];if(a.isNothing(b))return!1;if(b.isLoading)return!1;return!0},isZoomActive:function(){return!a.isNothing(this.zoomPanRotate)},getCurrentImage:function(){return this.cache.images[this.currentIndex]},onDocumentOverlayFadeIn:function(){e.setTimeout(function(){var b=this.settings.target===e?e.document.body:this.settings.target;a.DOM.removeClass(b,h.CssClasses.buildingBody);a.DOM.addClass(b,h.CssClasses.activeBody);this.addEventHandlers();this.carousel.show(this.currentIndex);
this.uiLayer.show();this.settings.autoStartSlideshow?this.play():a.isNothing(this.toolbar)||this.toolbar.show(this.currentIndex);a.Events.fire(this,{type:h.EventTypes.onShow,target:this});this.setUIWebViewResetPositionTimeout()}.bind(this),250)},setUIWebViewResetPositionTimeout:function(){if(this.settings.enableUIWebViewRepositionTimeout&&a.Browser.iOS&&!a.Browser.safari)a.isNothing(this._uiWebViewResetPositionTimeout)||e.clearTimeout(this._uiWebViewResetPositionTimeout),this._uiWebViewResetPositionTimeout=
e.setTimeout(function(){this.resetPosition();this.setUIWebViewResetPositionTimeout()}.bind(this),this.settings.uiWebViewResetPositionDelay)},clearUIWebViewResetPositionTimeout:function(){a.isNothing(this._uiWebViewResetPositionTimeout)||e.clearTimeout(this._uiWebViewResetPositionTimeout)},onWindowScroll:function(){this.resetPosition()},onWindowOrientationChange:function(){this.resetPosition()},onWindowHashChange:function(){if(e.location.hash!=="#"+(this.settings.jQueryMobile?this.settings.jQueryMobileDialogHash:
this.currentHistoryHashValue))this.backButtonClicked=!0,this.hide()},onKeyDown:function(a){a.keyCode===37?(a.preventDefault(),this.previous()):a.keyCode===39?(a.preventDefault(),this.next()):a.keyCode===38||a.keyCode===40?a.preventDefault():a.keyCode===27?(a.preventDefault(),this.hide()):a.keyCode===32?(this.settings.hideToolbar?this.hide():this.toggleToolbar(),a.preventDefault()):a.keyCode===13&&(a.preventDefault(),this.play())},onUILayerTouch:function(b){if(this.isZoomActive())switch(b.action){case a.TouchElement.ActionTypes.gestureChange:this.zoomPanRotate.zoomRotate(b.scale,
this.settings.allowRotationOnUserZoom?b.rotation:0);break;case a.TouchElement.ActionTypes.gestureEnd:this.zoomPanRotate.setStartingScaleAndRotation(b.scale,this.settings.allowRotationOnUserZoom?b.rotation:0);break;case a.TouchElement.ActionTypes.touchStart:this.zoomPanRotate.panStart(b.point);break;case a.TouchElement.ActionTypes.touchMove:this.zoomPanRotate.pan(b.point);break;case a.TouchElement.ActionTypes.doubleTap:this.destroyZoomPanRotate();this.toggleToolbar();break;case a.TouchElement.ActionTypes.swipeLeft:this.destroyZoomPanRotate();
this.next();this.toggleToolbar();break;case a.TouchElement.ActionTypes.swipeRight:this.destroyZoomPanRotate(),this.previous(),this.toggleToolbar()}else switch(b.action){case a.TouchElement.ActionTypes.touchMove:case a.TouchElement.ActionTypes.swipeLeft:case a.TouchElement.ActionTypes.swipeRight:this.fadeOutToolbarIfVisible();this.carousel.onTouch(b.action,b.point);break;case a.TouchElement.ActionTypes.touchStart:case a.TouchElement.ActionTypes.touchMoveEnd:this.carousel.onTouch(b.action,b.point);
break;case a.TouchElement.ActionTypes.tap:this.toggleToolbar();break;case a.TouchElement.ActionTypes.doubleTap:this.settings.target===e&&(b.point.x-=a.DOM.windowScrollLeft(),b.point.y-=a.DOM.windowScrollTop());var c=this.cache.images[this.currentIndex].imageEl,d=e.parseInt(a.DOM.getStyle(c,"top"),10),f=e.parseInt(a.DOM.getStyle(c,"left"),10),g=f+a.DOM.width(c),c=d+a.DOM.height(c);if(b.point.x<f)b.point.x=f;else if(b.point.x>g)b.point.x=g;if(b.point.y<d)b.point.y=d;else if(b.point.y>c)b.point.y=c;
this.createZoomPanRotate();this.isZoomActive()&&this.zoomPanRotate.zoomAndPanToPoint(this.settings.doubleTapZoomLevel,b.point);break;case a.TouchElement.ActionTypes.gestureStart:this.createZoomPanRotate()}a.Events.fire(this,{type:h.EventTypes.onTouch,target:this,point:b.point,action:b.action})},onCarouselSlideByEnd:function(b){this.currentIndex=b.cacheIndex;a.isNothing(this.toolbar)||(this.toolbar.setCaption(this.currentIndex),this.toolbar.setToolbarStatus(this.currentIndex));a.Events.fire(this,{type:h.EventTypes.onDisplayImage,
target:this,action:b.action,index:b.cacheIndex})},onToolbarTap:function(b){switch(b.action){case f.ToolbarAction.next:this.next();break;case f.ToolbarAction.previous:this.previous();break;case f.ToolbarAction.close:this.hide();break;case f.ToolbarAction.play:this.play()}a.Events.fire(this,{type:h.EventTypes.onToolbarTap,target:this,toolbarAction:b.action,tapTarget:b.tapTarget})},onMouseWheel:function(b){var c=a.Events.getWheelDelta(b);if(!(b.timeStamp-(this.mouseWheelStartTime||0)<this.settings.mouseWheelSpeed))this.mouseWheelStartTime=
b.timeStamp,this.settings.invertMouseWheel&&(c*=-1),c<0?this.next():c>0&&this.previous()},onCarouselSlideshowStart:function(){a.Events.fire(this,{type:h.EventTypes.onSlideshowStart,target:this})},onCarouselSlideshowStop:function(){a.Events.fire(this,{type:h.EventTypes.onSlideshowStop,target:this})},onToolbarBeforeShow:function(){a.Events.fire(this,{type:h.EventTypes.onBeforeCaptionAndToolbarShow,target:this})},onToolbarShow:function(){a.Events.fire(this,{type:h.EventTypes.onCaptionAndToolbarShow,
target:this})},onToolbarBeforeHide:function(){a.Events.fire(this,{type:h.EventTypes.onBeforeCaptionAndToolbarHide,target:this})},onToolbarHide:function(){a.Events.fire(this,{type:h.EventTypes.onCaptionAndToolbarHide,target:this})},onZoomPanRotateTransform:function(b){a.Events.fire(this,{target:this,type:h.EventTypes.onZoomPanRotateTransform,scale:b.scale,rotation:b.rotation,rotationDegs:b.rotationDegs,translateX:b.translateX,translateY:b.translateY})}})})(window,window.klass,window.Code.Util,window.Code.PhotoSwipe.Cache,
window.Code.PhotoSwipe.DocumentOverlay,window.Code.PhotoSwipe.Carousel,window.Code.PhotoSwipe.Toolbar,window.Code.PhotoSwipe.UILayer,window.Code.PhotoSwipe.ZoomPanRotate);


/**
 * -----------------------------------------------------------------------------
 *  ./javascript/search.js
 * -----------------------------------------------------------------------------
 */

//Basic but does the job. Needs more work.
var nextLiveSearchSequence = 0;

$('#SearchSite').keyup(function(event) {

    var searchValues = $("#SearchSite").val();

    if (searchValues.length > 2) {
        keyUpSearch.request(searchValues);
    }
    else {
        $("#search_results").html('');
    }
});

var keyUpSearch = keyUpSearch || {};

keyUpSearch.request = function (searchValues)
{
    var nonce = Math.floor(Math.random() * 100);
    nextLiveSearchSequence = nextLiveSearchSequence + 1;

    $.ajax({
        type: "POST",
        url: "/site/includes/az_search_results.php",
        data: { searchText: searchValues, nonce: nonce, seq : nextLiveSearchSequence}}).done(function( msg ) {
        $("#search_results").html(msg);
    });
}

keyUpSearch.clearSearch = function clearSearch () {

    var searchBox = document.getElementById('SearchSite');
    if(searchBox.value == 'Search (e.g. Council Tax)') {
            searchBox.val = '';
    }
}


/**
 * -----------------------------------------------------------------------------
 *  ./javascript/swfobject.js
 * -----------------------------------------------------------------------------
 */

/*  SWFObject v2.2 <http://code.google.com/p/swfobject/>
  is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
*/
var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();

/**
 * -----------------------------------------------------------------------------
 *  ./javascript/cookieConsent.js
 * -----------------------------------------------------------------------------
 */
function cookieConsent () {
  if (!checkForPrivacyCookie('CookiesAccepted')) {
    var cookieDialog = document.getElementById('cookieAlertMessage');
    cookieDialog.style.display = 'block';
  }
}

function setBannerCookie (domain) {
  var thisValue = true,
    name = 'CookiesAccepted',
    exdate = new Date(),
    value,
    cookieDialog = document.getElementById('cookieAlertMessage');

  exdate.setDate(exdate.getDate() + 180);
  value = escape(thisValue) + "; expires=" + exdate.toUTCString() + ";domain=" + domain + ";path=/;";

  document.cookie = name + "=" + value;

  cookieDialog.style.display = 'none';
}

function checkForPrivacyCookie (name) {
  var nameEQ = name + "=",
    ca = document.cookie.split(';');

  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }

  return null;
}
