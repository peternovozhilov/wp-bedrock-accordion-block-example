<?php

namespace TwentytwentyfiveChild\Blocks;

class Basic {

    protected string $dir = 'basic';

    public function registerBlock($callback = null): void {
        $this->registerAssets();

        if (is_callable($callback)) {
            $callback();
        }

    }

    private function registerAssets(): void {

        wp_register_script(
            "custom-".$this->dir."-editor-script",
            get_stylesheet_directory_uri() . "/dist/js/".$this->dir."-editor.js",
            ["wp-blocks", "wp-element", "wp-editor", "wp-components", "wp-i18n"],
            filemtime(get_stylesheet_directory() . "/dist/js/".$this->dir."-editor.js")
        );

        wp_register_style(
            "custom-".$this->dir."-editor-style",
            get_stylesheet_directory_uri() . "/dist/css/".$this->dir."-editor.css",
            [],
            filemtime(get_stylesheet_directory() . "/dist/css/".$this->dir."-editor.css")
        );

        wp_register_style(
            "custom-".$this->dir."-style",
            get_stylesheet_directory_uri() . "/dist/css/".$this->dir."-style.css",
            [],
            filemtime(get_stylesheet_directory() . "/dist/css/".$this->dir."-style.css")
        );
    }

}
