<?php

namespace TwentytwentyfiveChild\Blocks;

class Accordion extends Basic {

    protected string $dir = 'accordion';

    public function __construct() {
        add_action("init", [$this, "registerBlock"]);
    }

    public function registerBlock($callback = null): void {

        parent::registerBlock();

        register_block_type("custom/accordion", [
            "editor_script"   => "custom-accordion-editor-script",
            "editor_style"    => "custom-accordion-editor-style",
            "style"           => "custom-accordion-style",
            "render_callback" => [$this, "renderAccordion"],
            "attributes"      => [
                "items" => [
                    "type"    => "array",
                    "default" => [
                        ["title" => "Accordion Item 1", "content" => "Content for item 1"],
                    ],
                ],
            ],
        ]);
    }

    public function renderAccordion(array $attributes): string {
        if (!isset($attributes["items"]) || !is_array($attributes["items"])) {
            return "";
        }

        $output = '<div class="custom-accordion custom-settings">';
        foreach ($attributes["items"] as $item) {
            $output .= $this->renderSubItem($item);
        }
        $output .= "</div>";

        return $output;
    }

    private function renderSubItem(array $item): string {
        $title     = esc_html($item["title"]);
        $content   = esc_html($item["content"]);
        $uniqueId  = "accordion-toggle-" . uniqid();

        return sprintf(
            '<div class="accordion-item">
                <input type="checkbox" id="%s" class="accordion-toggle">
                <label for="%s" class="accordion-title">%s</label>
                <div class="accordion-content">%s</div>
            </div>',
            esc_attr($uniqueId),
            esc_attr($uniqueId),
            $title,
            nl2br($content)
        );
    }
}
