<?php

defined('ABSPATH') || die();

use TwentytwentyfiveChild\Blocks\BlockAutoloader;

add_action('wp_enqueue_scripts', 'twentytwentyfive_child_enqueue_styles');

BlockAutoloader::register();

foreach ([
             'TwentytwentyfiveChild\Blocks\Basic',
             'TwentytwentyfiveChild\Blocks\Accordion',
             'TwentytwentyfiveChild\Blocks\Versus']
         as $blockClass) {
    new $blockClass();
}
