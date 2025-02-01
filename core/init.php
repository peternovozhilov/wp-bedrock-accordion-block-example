<?php

defined('ABSPATH') || die();

use TwentytwentyfiveChild\Blocks\BlockAutoloader;

add_action('wp_enqueue_scripts', 'twentytwentyfive_child_enqueue_styles');
add_action('customize_register', 'twentytwentyfive_child_customize_register');
add_action('customize_preview_init', 'twentytwentyfive_child_customize_live_preview');
add_action('wp_head', 'twentytwentyfive_child_custom_dynamic_styles');

BlockAutoloader::register();

foreach ([
             'TwentytwentyfiveChild\Blocks\Basic',
             'TwentytwentyfiveChild\Blocks\Accordion',
             'TwentytwentyfiveChild\Blocks\Versus']
         as $blockClass) {
    new $blockClass();
}
