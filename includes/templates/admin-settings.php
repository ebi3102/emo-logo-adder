<h1><?php echo __( 'Logo Editor Settings', 'emo_la' ) ?></h1>
<form action="options.php" method="post" class="sunset-general-form">
    <?php settings_fields('emo_la_product_settings'); ?>
    <?php do_settings_sections('emo_la_slug'); ?>
    <?php submit_button( __('Save settings', 'emo_la'), 'primary', 'btnSubmit'); ?>
</form>