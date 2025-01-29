<?php

namespace TwentytwentyfiveChild\Blocks;

class BlockAutoloader {
    public static function register() {
        spl_autoload_register(function ($class) {
            $prefix = 'TwentytwentyfiveChild\\Blocks\\';
            $baseDir = dirname(__DIR__) . '/blocks/';

            if (strncmp($prefix, $class, strlen($prefix)) !== 0) {
                return;
            }

            $relativeClass = substr($class, strlen($prefix));

            $file = $baseDir . str_replace('\\', '/', $relativeClass) . '.php';

            if (file_exists($file)) {
                require_once $file;
            }
        });
    }
}
