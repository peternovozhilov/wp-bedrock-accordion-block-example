<?php

namespace TwentytwentyfiveChild\Blocks;

class Versus extends Basic {

    protected string $dir = 'versus';
    const FA_VERSION = '5.15.4';
    public function __construct() {
        add_action("init", [$this, "registerBlock"]);
    }

    public function registerFontAwesomeCdn() {
        wp_enqueue_style('font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/'.static::FA_VERSION.'/css/all.min.css', array(), static::FA_VERSION);
    }
    public function registerBlock($callback = null): void {

        parent::registerBlock([$this,'registerFontAwesomeCdn']);

        register_block_type("custom/versus", [
            "editor_script"   => "custom-versus-editor-script",
            "editor_style"    => "custom-versus-editor-style",
            "style"           => "custom-versus-style",
            "render_callback" => [$this, "renderVersus"],
            'attributes' => [
                'items' => [
                    'type'    => 'array',
                    'default' => [
                        [
                            'label'  => 'Property',
                            'leftIcon'  => 'fas fa-check',
                            'leftText'  => 'Feature A',
                            'rightIcon' => 'fas fa-times',
                            'rightText' => 'Feature B',
                        ]
                    ],
                ],
            ],
        ]);
    }

    public function renderVersus(array $attributes): string {

        if (empty($attributes['items']) || !is_array($attributes['items'])) {
            return '';
        }

        $header = array_shift($attributes['items']);

        $output = '<div class="custom-versus"><table class="versus-table"><thead>';

        $output .= $this->renderSubItem($header);

        $output .= '</thead><tbody>';

        foreach ($attributes["items"] as $item) {
            $output .= $this->renderSubItem($item);
        }

        $output .= "</tbody></table></div>";

        return $output;

    }

    private function renderSubItem(array $comparison): string {
        return sprintf(
            '<tr>
                <td><strong>%s</strong></td>
                <td><strong><i class="%s"></i> %s</strong></td>
                <td><strong>VS</strong></td>
                <td><strong><i class="%s"></i> %s</strong></td>
            </tr>',
            esc_html($comparison['label'] ?? ''),
            esc_attr($comparison['leftIcon']), esc_html($comparison['leftText']),
            esc_attr($comparison['rightIcon']), esc_html($comparison['rightText'])
        );
    }

}
