<?php

defined('ABSPATH') || die();

use TwentytwentyfiveChild\Blocks\BlockAutoloader;

add_action('wp_enqueue_scripts', 'twentytwentyfive_child_enqueue_styles');

BlockAutoloader::register();

foreach (['TwentytwentyfiveChild\Blocks\Accordion'] as $blockClass) {
    new $blockClass();
}
