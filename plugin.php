<?php
/**
 * Plugin Name: Open Graph Tags
 * Description: Adds Open Graph meta tags to your posts with custom values and fallbacks
 * Version: 0.1.0
 * Author: JuanMa Garrido
 * Text Domain: open-graph-tags
 * Domain Path: /languages
 * License: GPL v2 or later
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package OpenGraphTags
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

// Plugin constants
define('OGT_VERSION', '0.1.0');
define('OGT_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('OGT_PLUGIN_URL', plugin_dir_url(__FILE__));

/**
 * Initialize the plugin
 */
function ogt_init(): void {
    // Load text domain for translations
    load_plugin_textdomain('open-graph-tags', false, dirname(plugin_basename(__FILE__)) . '/languages');
    
    // Register meta fields
    add_action('init', 'ogt_register_meta');
    
    // Add meta tags to head
    add_action('wp_head', 'ogt_output_meta_tags');
    
    // Enqueue editor assets
    add_action('enqueue_block_editor_assets', 'ogt_enqueue_editor_assets');
}
add_action('init', 'ogt_init');

/**
 * Register meta fields for Open Graph tags
 */
function ogt_register_meta(): void {
    register_post_meta('post', '_ogt_title', [
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
        'auth_callback' => function() {
            return current_user_can('edit_posts');
        }
    ]);

    register_post_meta('post', '_ogt_description', [
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
        'auth_callback' => function() {
            return current_user_can('edit_posts');
        }
    ]);

    register_post_meta('post', '_ogt_image_id', [
        'show_in_rest' => true,
        'single' => true,
        'type' => 'integer',
        'auth_callback' => function() {
            return current_user_can('edit_posts');
        }
    ]);

    register_post_meta('post', '_ogt_url', [
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
        'auth_callback' => function() {
            return current_user_can('edit_posts');
        }
    ]);

    register_post_meta('post', '_ogt_type', [
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
        'auth_callback' => function() {
            return current_user_can('edit_posts');
        }
    ]);
}

/**
 * Enqueue editor assets
 */
function ogt_enqueue_editor_assets(): void {
    $asset_file = include(OGT_PLUGIN_DIR . 'build/index.asset.php');
    
    wp_enqueue_script(
        'open-graph-tags-editor',
        OGT_PLUGIN_URL . 'build/index.js',
        $asset_file['dependencies'],
        $asset_file['version'],
        true
    );

    wp_set_script_translations('open-graph-tags-editor', 'open-graph-tags');
}

/**
 * Output Open Graph meta tags in head
 */
function ogt_output_meta_tags(): void {
    if (!is_singular('post')) {
        return;
    }

    $post_id = get_the_ID();
    
    // Get custom values or fallbacks
    $title = get_post_meta($post_id, '_ogt_title', true) ?: get_the_title($post_id);
    $description = get_post_meta($post_id, '_ogt_description', true) ?: get_the_excerpt($post_id);
    $url = get_post_meta($post_id, '_ogt_url', true) ?: get_permalink($post_id);
    $type = get_post_meta($post_id, '_ogt_type', true) ?: 'article';
    
    $image_id = get_post_meta($post_id, '_ogt_image_id', true);
    $image_url = '';
    
    if ($image_id) {
        $image_url = wp_get_attachment_image_url($image_id, 'full');
    } elseif (has_post_thumbnail($post_id)) {
        $image_url = get_the_post_thumbnail_url($post_id, 'full');
    }

    // Output meta tags
    if ($title) {
        printf('<meta property="og:title" content="%s" />' . PHP_EOL, esc_attr($title));
    }
    if ($description) {
        printf('<meta property="og:description" content="%s" />' . PHP_EOL, esc_attr($description));
    }
    if ($url) {
        printf('<meta property="og:url" content="%s" />' . PHP_EOL, esc_url($url));
    }
    if ($type) {
        printf('<meta property="og:type" content="%s" />' . PHP_EOL, esc_attr($type));
    }
    if ($image_url) {
        printf('<meta property="og:image" content="%s" />' . PHP_EOL, esc_url($image_url));
    }
}

/**
 * Plugin deactivation hook
 */
function ogt_deactivate(): void {
    global $wpdb;
    
    // Remove all plugin meta data
    $wpdb->query(
        $wpdb->prepare(
            "DELETE FROM {$wpdb->postmeta} WHERE meta_key LIKE %s",
            '_ogt_%'
        )
    );
}
register_deactivation_hook(__FILE__, 'ogt_deactivate'); 