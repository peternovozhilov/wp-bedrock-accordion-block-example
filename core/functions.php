<?php

// Enqueue the parent and child theme styles
function twentytwentyfive_child_enqueue_styles() {
    // Parent theme's style
    wp_enqueue_style('twentytwentyfive-style', get_template_directory_uri() . '/style.css');

    // Child theme's style
    wp_enqueue_style('twentytwentyfive-child-style', get_stylesheet_directory_uri() . '/style.css', ['twentytwentyfive-style'], wp_get_theme()->get('Version'));
}
