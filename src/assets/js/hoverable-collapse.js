(function($) {
  'use strict';
  //Open submenu on hover in compact sidebar mode and horizontal menu mode
  $(document).on('mouseenter mouseleave', '.sidebar', function(ev) {
    var body = $('body');
    var sidebarIconOnly = body.hasClass("sidebar-icon-only");
    var sidebarFixed = body.hasClass("sidebar-fixed");
    var sidebarToggleClass = body.hasClass("toggleCustom");

    const bodyClassList = body.attr('class')?.split(' ');
    const mainPanel = document.getElementById('main-panel-control');

    if(bodyClassList?.length === 1 && bodyClassList[0] === 'toggleCustom'){
      mainPanel.classList.add('sidebar-full-main-panel-margin');
      mainPanel.classList.remove('sidebar-icon-only-main-panel-margin');
    } else if(bodyClassList?.length > 1) {
      mainPanel.classList.add('sidebar-icon-only-main-panel-margin');
      mainPanel.classList.remove('sidebar-full-main-panel-margin');
    }

    if (!('ontouchstart' in document.documentElement)) {
      if (sidebarToggleClass) {
        if (sidebarFixed) {
          if (ev.type === 'mouseenter') {
            body.removeClass('sidebar-icon-only');
          }
        } else {
          var $menuItem = $(this);
          if (ev.type === 'mouseenter') {
            // $menuItem.addClass('hover-open')
            body.removeClass('sidebar-icon-only')
            // if ((body.hasClass('sidebar-toggle-display')) || (body.hasClass('sidebar-absolute'))) {
            //   body.toggleClass('sidebar-hidden');
            // } else {
            //   body.toggleClass('sidebar-icon-only');
            // }
          } else {
            //$menuItem.removeClass('hover-open')
            body.addClass('sidebar-icon-only')
            // if ((body.hasClass('sidebar-toggle-display')) || (body.hasClass('sidebar-absolute'))) {
            //   body.toggleClass('sidebar-hidden');
            // } else {
            //   body.toggleClass('sidebar-icon-only');
            // }
          }
        }
      }
    }
  });
})(jQuery);
