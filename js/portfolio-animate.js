jQuery(document).ready(function($) {
  var $container = $('#x-iso-container');
  var $optionSets = $('.option-set');
  var $optionLinks = $optionSets.find('a');

  $container.before('<span id="x-isotope-loading"><span>');

  $(window).load(function() {
    $container.isotope({
      itemSelector: '.x-iso-container > .hentry',
      resizable: true,
      filter: '*',
      containerStyle: {
        overflow: 'hidden',
        position: 'relative'
      }
    });
    $('#x-isotope-loading').stop(true, true).fadeOut(300);
    $('#x-iso-container > .hentry').each(function(i) {
      $(this).delay(i * 150).animate({
        'opacity': 1
      }, 500);
    });
  });

  $(window).smartresize(function() {
    $container.isotope({});
  });

  $optionLinks.click(function() {
    var $this = $(this);
    if ($this.hasClass('selected')) {
      return false;
    }
    var $optionSet = $this.parents('.option-set');
    $optionSet.find('.selected').removeClass('selected');
    $this.addClass('selected');
    var options = {},
      key = $optionSet.attr('data-option-key'),
      value = $this.attr('data-option-value');
    value = value === 'false' ? false : value;
    options[key] = value;
    if (key === 'layoutMode' && typeof changeLayoutMode === 'function') {
      changeLayoutMode($this, options);
    } else {
      $container.isotope(options);
    }
    return false;
  });

  $('.x-portfolio-filters').click(function() {
    $(this).parent().find('ul').slideToggle(600, 'easeOutExpo');
  });
});