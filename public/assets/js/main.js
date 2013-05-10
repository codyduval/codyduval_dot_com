$(document).ready(function() {
  jQuery.fn.nextOrFirst = function(selector){
      var next = this.next(selector);
      return (next.length) ? next : this.prevAll(selector).last();
  }
  jQuery.fn.prevOrLast = function(selector){
      var prev = this.prev(selector);
      return (prev.length) ? prev : this.nextAll(selector).last();
  }

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

$("#contact_expose").click(function() {
  if($(".thanks").is(":visible")) {
    $(".thanks").fadeOut("fast", function(){
      $(".contact_info").fadeToggle("fast");
    });
  } else {
    $(".contact_info").fadeToggle("fast");
  }
});
$("#thanks_expose").click(function() {
  if($(".contact_info").is(":visible")) {
    $(".contact_info").fadeOut("fast", function(){
      $(".thanks").fadeToggle("fast");
    });
  } else {
    $(".thanks").fadeToggle("fast");
  }
});

  $('.important .close').click(function(e) {
    e.preventDefault();
    $(this).parent().parent().slideUp(300);
  });

  var showMarker = 1;
  if($('.taxonomy.container').length) { var taxonomyOffset = $('.taxonomy.container').offset().top; }
  var marthaOffset = 0;
  var visibleTopics;

  if($('.sidebar').length) { var sidebarTop = $('.sidebar').offset().top; }

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
      $('i.icon-chevron-left').hide();
      $('i.icon-chevron-right').show();
    }
    else if(!$(activeSlide).children('nav').children('ul').children('.active').next().length) {
      $('i.icon-chevron-right').hide();
      $('i.icon-chevron-left').show();
    }
    else  {
      $('i.icon-chevron-left').show();
      $('i.icon-chevron-right').show();
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
        $('i.icon-chevron-left').hide();
      }
      else if(!$(slide).children('nav').children('ul').children('.active').next().length) {
        $('i.icon-chevron-right').hide();
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

  $('i.icon-chevron-left, .prev-slide').click(function(e){
    var activeSlide = $('.martha .slide.active');
    if($(activeSlide).children('nav').children('ul').children('.active').prev().length) {
      $(activeSlide).children('nav').children('ul').children('.active').prev().children('a').click();
    }
  });

  $('i.icon-chevron-right, .next-slide').click(function(e){
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
      $('i.icon-chevron-left').hide();
    }
    else if(!$(slide).children('nav').children('ul').children('.active').next().length) {
      $('i.icon-chevron-right').hide();
    }
    if($(slide).children('nav').children('ul').children('.active').prev().length) {
      $('i.icon-chevron-left').show();
    }
    if($(slide).children('nav').children('ul').children('.active').next().length) {
      $('i.icon-chevron-right').show();
    }
  });
});
