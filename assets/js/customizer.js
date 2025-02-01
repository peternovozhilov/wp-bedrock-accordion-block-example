(function(wp) {

  wp.customize( 'twentytwentyfive_child_background_color', function( value ) {
    value.bind( function( newval ) {
      document.querySelectorAll('.custom-settings').forEach(function(element) {
        element.style.backgroundColor = newval;
      });
    } );
  } );

  wp.customize( 'twentytwentyfive_child_border_radius', function( value ) {
    value.bind( function( newval ) {
      document.querySelectorAll('.custom-settings').forEach(function(element) {
        element.style.borderRadius = newval;
      });
    } );
  } );

})(window.wp);
