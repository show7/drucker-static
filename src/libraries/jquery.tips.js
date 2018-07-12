
import $ from 'jquery';
$.tips = function (content, time, callback) {
  var $tips = $(document.createElement('DIV')).addClass('wkzf-tips').text(content);
  $(document.body).append($tips);
  $tips.fadeIn(200).css({ 'left': parseInt(($(window).width() - $tips.width()) / 2, 10) + 'px', 'top': parseInt(($(window).height() - $tips.height()) / 2, 10) + 'px' });
  if (time) {
    $tips.delay(time * 1000).fadeOut(200);
    window.setTimeout(function () {
      $tips.remove();
      if (callback) callback();
    }, time * 1000);
  }
};
