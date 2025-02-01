<?php

function twentytwentyfive_child_enqueue_styles() {

    wp_enqueue_style('twentytwentyfive-style', get_template_directory_uri() . '/style.css');
    wp_enqueue_style('twentytwentyfive-child-style', get_stylesheet_directory_uri() . '/style.css', ['twentytwentyfive-style'], wp_get_theme()->get('Version'));

}

function twentytwentyfive_child_customize_register( $wp_customize ) {

    $wp_customize->add_section( 'twentytwentyfive_child_custom_settings', array(
        'title'    => __( 'Blocks settings', 'twentytwentyfive_child' ),
        'priority' => 300,
    ) );

    $wp_customize->add_setting( 'twentytwentyfive_child_background_color', array(
        'default'           => '#dddddd',
        'sanitize_callback' => 'sanitize_hex_color',
        'transport' => 'postMessage'
    ) );

    $wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'twentytwentyfive_child_background_color', array(
        'label'    => __( 'Background Block Color', 'twentytwentyfive_child' ),
        'section'  => 'twentytwentyfive_child_custom_settings',
    ) ) );

    $wp_customize->add_setting( 'twentytwentyfive_child_border_radius', array(
        'default'           => '6px',
        'sanitize_callback' => 'sanitize_text_field',
        'transport' => 'postMessage'
    ) );

    $wp_customize->add_control( 'twentytwentyfive_child_border_radius', array(
        'label'    => __( 'Border radius dropdown', 'twentytwentyfive_child' ),
        'section'  => 'twentytwentyfive_child_custom_settings',
        'type'     => 'select',
        'choices'  => array(
            '0' => __( '0', 'twentytwentyfive_child' ),
            '6px' => __( '6px', 'twentytwentyfive_child' ),
            '12px' => __( '12px', 'twentytwentyfive_child' ),
            '24px' => __( '24px', 'twentytwentyfive_child' ),
            '32px' => __( '32px', 'twentytwentyfive_child' ),
        ),
    ) );

}
function twentytwentyfive_child_customize_live_preview() {
    wp_enqueue_script( 'twentytwentyfive-child-custom-color', get_theme_file_uri( '/dist/js/customizer.js' ), array( 'customize-preview' ), null, );
}
function twentytwentyfive_child_custom_dynamic_styles() {

    $backgroundColor = get_theme_mod( 'twentytwentyfive_child_background_color', '#dddddd' );
    $borderRadius = get_theme_mod( 'twentytwentyfive_child_custom_settings', '12px' );

    echo '<style>

        html .custom-settings {
            background-color: ' . esc_attr( $backgroundColor ) . ';
            border-radius: ' . esc_attr( $borderRadius ) . ';
        }

    </style>';
}
