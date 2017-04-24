import $ from 'jquery';
const Modernizr = window.Modernizr;

var Transitions = (function () {

  var animEndEventNames = {
    'WebkitAnimation': 'webkitAnimationEnd',
    'OAnimation': 'oAnimationEnd',
    'msAnimation': 'MSAnimationEnd',
    'animation': 'animationend'
  };

  var animEndEventName = animEndEventNames[Modernizr.prefixed('animation')];
  var animSupport = Modernizr.cssanimations;

  function init(opts) {
    // set default options
    var defaults = {
      el: {
        wrapper: 'body',
        page: '.page'
      },
      data: {
        animation: 'animation',
        page: 'goto'
      }
    };

    // set opts
    this.opts = $.extend({}, defaults, opts || {});

    // cache elements
    this.opts.pageEl = $(this.opts.el.page);
    this.opts.wrapperEl = $(this.opts.el.wrapper);

    // set page index
    this.opts.pageEl.each(function () {
      var $page = $(this);
      $page.data('index', $page.index());
    });
  }

  // select active page
  function select(page) {
    this.opts.wrapperEl.each(function () {
      var $wrapperDiv = $(this);
      $wrapperDiv.data('current', page.data('index'));
      $wrapperDiv.data('isAnimating', false);
    });

    $('.page').removeClass('page-current');
    page.addClass('page-current');
  }

  function log(message) {
    /**
     * @TODO
     * check for environment
     */
    // console.log('%c transition.js ', 'background: #222; color: #bada55', message);
    message;
  }

  function animate(trigger) {
    // check attributes
    if (!(trigger.attr('data-' + this.opts.data.animation)))
      return log('data-' + this.opts.data.animation + ' attribute not found');

    else if (!(trigger.attr('data-' + this.opts.data.page)))
      return log('data-' + this.opts.data.page + ' attribute not found');

    var animation = parseInt(trigger.data(this.opts.data.animation).toString()) || 0;
    var page = trigger.data(this.opts.data.page);

    // navigate to page
    this.navigate(animation, page);
  }

  function navigate(animation, page) {
    if (animation < 1 || animation > 67)
      return log('wrong animation number!');

    var inClass, outClass;
    switch (animation) {
    case 1:
      inClass = 'pt-page-moveFromRight';
      outClass = 'pt-page-moveToLeft';
      break;
    case 2:
      inClass = 'pt-page-moveFromLeft';
      outClass = 'pt-page-moveToRight';
      break;
    case 3:
      inClass = 'pt-page-moveFromBottom';
      outClass = 'pt-page-moveToTop';
      break;
    case 4:
      inClass = 'pt-page-moveFromTop';
      outClass = 'pt-page-moveToBottom';
      break;
    case 5:
      inClass = 'pt-page-moveFromRight pt-page-ontop';
      outClass = 'pt-page-fade';
      break;
    case 6:
      inClass = 'pt-page-moveFromLeft pt-page-ontop';
      outClass = 'pt-page-fade';
      break;
    case 7:
      inClass = 'pt-page-moveFromBottom pt-page-ontop';
      outClass = 'pt-page-fade';
      break;
    case 8:
      inClass = 'pt-page-moveFromTop pt-page-ontop';
      outClass = 'pt-page-fade';
      break;
    case 9:
      inClass = 'pt-page-moveFromRightFade';
      outClass = 'pt-page-moveToLeftFade';
      break;
    case 10:
      inClass = 'pt-page-moveFromLeftFade';
      outClass = 'pt-page-moveToRightFade';
      break;
    case 11:
      inClass = 'pt-page-moveFromBottomFade';
      outClass = 'pt-page-moveToTopFade';
      break;
    case 12:
      inClass = 'pt-page-moveFromTopFade';
      outClass = 'pt-page-moveToBottomFade';
      break;
    case 13:
      inClass = 'pt-page-moveFromRight';
      outClass = 'pt-page-moveToLeftEasing pt-page-ontop';
      break;
    case 14:
      inClass = 'pt-page-moveFromLeft';
      outClass = 'pt-page-moveToRightEasing pt-page-ontop';
      break;
    case 15:
      inClass = 'pt-page-moveFromBottom';
      outClass = 'pt-page-moveToTopEasing pt-page-ontop';
      break;
    case 16:
      inClass = 'pt-page-moveFromTop';
      outClass = 'pt-page-moveToBottomEasing pt-page-ontop';
      break;
    case 17:
      inClass = 'pt-page-moveFromRight pt-page-ontop';
      outClass = 'pt-page-scaleDown';
      break;
    case 18:
      inClass = 'pt-page-moveFromLeft pt-page-ontop';
      outClass = 'pt-page-scaleDown';
      break;
    case 19:
      inClass = 'pt-page-moveFromBottom pt-page-ontop';
      outClass = 'pt-page-scaleDown';
      break;
    case 20:
      inClass = 'pt-page-moveFromTop pt-page-ontop';
      outClass = 'pt-page-scaleDown';
      break;
    case 21:
      inClass = 'pt-page-scaleUpDown pt-page-delay300';
      outClass = 'pt-page-scaleDown';
      break;
    case 22:
      inClass = 'pt-page-scaleUp pt-page-delay300';
      outClass = 'pt-page-scaleDownUp';
      break;
    case 23:
      inClass = 'pt-page-scaleUp';
      outClass = 'pt-page-moveToLeft pt-page-ontop';
      break;
    case 24:
      inClass = 'pt-page-scaleUp';
      outClass = 'pt-page-moveToRight pt-page-ontop';
      break;
    case 25:
      inClass = 'pt-page-scaleUp';
      outClass = 'pt-page-moveToTop pt-page-ontop';
      break;
    case 26:
      inClass = 'pt-page-scaleUp';
      outClass = 'pt-page-moveToBottom pt-page-ontop';
      break;
    case 27:
      inClass = 'pt-page-scaleUpCenter pt-page-delay400';
      outClass = 'pt-page-scaleDownCenter';
      break;
    case 28:
      inClass = 'pt-page-moveFromRight pt-page-delay200 pt-page-ontop';
      outClass = 'pt-page-rotateRightSideFirst';
      break;
    case 29:
      inClass = 'pt-page-moveFromLeft pt-page-delay200 pt-page-ontop';
      outClass = 'pt-page-rotateLeftSideFirst';
      break;
    case 30:
      inClass = 'pt-page-moveFromTop pt-page-delay200 pt-page-ontop';
      outClass = 'pt-page-rotateTopSideFirst';
      break;
    case 31:
      inClass = 'pt-page-moveFromBottom pt-page-delay200 pt-page-ontop';
      outClass = 'pt-page-rotateBottomSideFirst';
      break;
    case 32:
      inClass = 'pt-page-flipInLeft pt-page-delay500';
      outClass = 'pt-page-flipOutRight';
      break;
    case 33:
      inClass = 'pt-page-flipInRight pt-page-delay500';
      outClass = 'pt-page-flipOutLeft';
      break;
    case 34:
      inClass = 'pt-page-flipInBottom pt-page-delay500';
      outClass = 'pt-page-flipOutTop';
      break;
    case 35:
      inClass = 'pt-page-flipInTop pt-page-delay500';
      outClass = 'pt-page-flipOutBottom';
      break;
    case 36:
      inClass = 'pt-page-scaleUp';
      outClass = 'pt-page-rotateFall pt-page-ontop';
      break;
    case 37:
      inClass = 'pt-page-rotateInNewspaper pt-page-delay500';
      outClass = 'pt-page-rotateOutNewspaper';
      break;
    case 38:
      inClass = 'pt-page-moveFromRight';
      outClass = 'pt-page-rotatePushLeft';
      break;
    case 39:
      inClass = 'pt-page-moveFromLeft';
      outClass = 'pt-page-rotatePushRight';
      break;
    case 40:
      inClass = 'pt-page-moveFromBottom';
      outClass = 'pt-page-rotatePushTop';
      break;
    case 41:
      inClass = 'pt-page-moveFromTop';
      outClass = 'pt-page-rotatePushBottom';
      break;
    case 42:
      inClass = 'pt-page-rotatePullRight pt-page-delay180';
      outClass = 'pt-page-rotatePushLeft';
      break;
    case 43:
      inClass = 'pt-page-rotatePullLeft pt-page-delay180';
      outClass = 'pt-page-rotatePushRight';
      break;
    case 44:
      inClass = 'pt-page-rotatePullBottom pt-page-delay180';
      outClass = 'pt-page-rotatePushTop';
      break;
    case 45:
      inClass = 'pt-page-rotatePullTop pt-page-delay180';
      outClass = 'pt-page-rotatePushBottom';
      break;
    case 46:
      inClass = 'pt-page-moveFromRightFade';
      outClass = 'pt-page-rotateFoldLeft';
      break;
    case 47:
      inClass = 'pt-page-moveFromLeftFade';
      outClass = 'pt-page-rotateFoldRight';
      break;
    case 48:
      inClass = 'pt-page-moveFromBottomFade';
      outClass = 'pt-page-rotateFoldTop';
      break;
    case 49:
      inClass = 'pt-page-moveFromTopFade';
      outClass = 'pt-page-rotateFoldBottom';
      break;
    case 50:
      inClass = 'pt-page-rotateUnfoldLeft';
      outClass = 'pt-page-moveToRightFade';
      break;
    case 51:
      inClass = 'pt-page-rotateUnfoldRight';
      outClass = 'pt-page-moveToLeftFade';
      break;
    case 52:
      inClass = 'pt-page-rotateUnfoldTop';
      outClass = 'pt-page-moveToBottomFade';
      break;
    case 53:
      inClass = 'pt-page-rotateUnfoldBottom';
      outClass = 'pt-page-moveToTopFade';
      break;
    case 54:
      inClass = 'pt-page-rotateRoomLeftIn';
      outClass = 'pt-page-rotateRoomLeftOut pt-page-ontop';
      break;
    case 55:
      inClass = 'pt-page-rotateRoomRightIn';
      outClass = 'pt-page-rotateRoomRightOut pt-page-ontop';
      break;
    case 56:
      inClass = 'pt-page-rotateRoomTopIn';
      outClass = 'pt-page-rotateRoomTopOut pt-page-ontop';
      break;
    case 57:
      inClass = 'pt-page-rotateRoomBottomIn';
      outClass = 'pt-page-rotateRoomBottomOut pt-page-ontop';
      break;
    case 58:
      inClass = 'pt-page-rotateCubeLeftIn';
      outClass = 'pt-page-rotateCubeLeftOut pt-page-ontop';
      break;
    case 59:
      inClass = 'pt-page-rotateCubeRightIn';
      outClass = 'pt-page-rotateCubeRightOut pt-page-ontop';
      break;
    case 60:
      inClass = 'pt-page-rotateCubeTopIn';
      outClass = 'pt-page-rotateCubeTopOut pt-page-ontop';
      break;
    case 61:
      inClass = 'pt-page-rotateCubeBottomIn';
      outClass = 'pt-page-rotateCubeBottomOut pt-page-ontop';
      break;
    case 62:
      inClass = 'pt-page-rotateCarouselLeftIn';
      outClass = 'pt-page-rotateCarouselLeftOut pt-page-ontop';
      break;
    case 63:
      inClass = 'pt-page-rotateCarouselRightIn';
      outClass = 'pt-page-rotateCarouselRightOut pt-page-ontop';
      break;
    case 64:
      inClass = 'pt-page-rotateCarouselTopIn';
      outClass = 'pt-page-rotateCarouselTopOut pt-page-ontop';
      break;
    case 65:
      inClass = 'pt-page-rotateCarouselBottomIn';
      outClass = 'pt-page-rotateCarouselBottomOut pt-page-ontop';
      break;
    case 66:
      inClass = 'pt-page-rotateSidesIn pt-page-delay200';
      outClass = 'pt-page-rotateSidesOut';
      break;
    case 67:
      inClass = 'pt-page-rotateSlideIn';
      outClass = 'pt-page-rotateSlideOut';
      break;
    }

    var wrapperEl = this.opts.wrapperEl;
    var pages = wrapperEl.find('.page');
    var currPageIndex = wrapperEl.data('current');
    var pageIndex = (parseInt($(page).data('index')) || 0);
    var endCurrentPage = false;
    var endNextPage = false;
    var tempPageIndex = currPageIndex;

    if (wrapperEl.data('isAnimating') || window.isAnimating == true)
      return;

    // set isAnimating
    wrapperEl.data('isAnimating', true);
    window.isAnimating = true;

    // set current page
    var currPage = pages.eq(currPageIndex);
    currPageIndex = pageIndex;

    // check if the current page is same as the next page then do not do the animation
    // else reset the 'isAnimating' flag
    if (tempPageIndex != currPageIndex) {
      wrapperEl.data('current', currPageIndex);

      // set next page
      var nextPage = pages.eq(currPageIndex).addClass('page-current');

      currPage.addClass(outClass).on(animEndEventName, function () {
        currPage.off(animEndEventName);
        endCurrentPage = true;
        if (endNextPage)
          onEndAnimation(wrapperEl, nextPage, currPage);
      });

      nextPage.addClass(inClass).on(animEndEventName, function () {
        nextPage.off(animEndEventName);
        endNextPage = true;
        if (endCurrentPage)
          onEndAnimation(wrapperEl, nextPage, currPage);
      });
    }
    else {
      wrapperEl.data('isAnimating', false);
      window.isAnimating = false;
    }

    if (!animSupport)
      onEndAnimation(currPage, nextPage);
  }

  function onEndAnimation(wrapperEl, nextPage, currPage) {
    resetPage(nextPage, currPage);
    wrapperEl.data('isAnimating', false);
    window.isAnimating = false;
  }

  function resetPage(nextPage, currPage) {
    currPage.attr('class', 'page');
    nextPage.attr('class', 'page page-current');
    nextPage.trigger('page:transition:reset');
  }

  return {
    init: init,
    select: select,
    animate: animate,
    navigate: navigate
  };

})();

export default Transitions;
