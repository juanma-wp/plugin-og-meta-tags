In this folder, I would like you to scaffold a new WordPress plugin that allows me to set the following Open Graph tags for any post:

- image
- title
- description
- url
- type

The name of the plugin should be **Open Graph Tags**.

The plugin should have the following structure:

```
- src/
  - index.js
- plugin.php
- readme.txt
```

I have already created the root plugin folder, and we are currently in it, so don't worry about that.

The block extension should:

- Add a new panel on the sidebar under the "post" tab that says **"Open Graph Tags"**.
- On that panel there should be a form to set the Open Graph Tags
- There should be a button to save the desired Open graph tags for that post
- A success message should be displayed when saved succesfully.
- Display a clear preview of the current OG tags set for the post

Here are a few more details:

- My name is **JuanMa Garrido** (use this where appropriate).
- The version of this plugin should be **0.1.0**.
- The functionality is required in the Editor, but it should the affect the final `meta` properties on the html for the post
- Write the plugin using PHP and vanilla JS if possible

---

Some more instructions for the plugin:

1. Meta Tags Storage:
   - Should the Open Graph meta tags be stored as post meta data using WordPress's meta API? Yes
   - Should there be default fallback values if specific tags aren't set for a post? Yes
2. Image Handling:
   For the OG image, should we allow: - Uploading a new image? Yes - Selecting from media library? Yes - Using the post featured image as fallback? Yes
3. Title/Description Defaults:
   - Should the OG title default to the post title if not set? Yes
   - Should the OG description default to the post excerpt or first few lines if not set? Yes
4. URL Handling:
   - Should the OG URL always be the post permalink or should it be customizable? Yes
5. Block Editor Integration:
   -The sidebar panel will be registered using registerPlugin from @wordpress/plugins
   - Should we use WordPress components from @wordpress/components for the UI elements? Yes
   - Do you want to use any specific styling framework or stick with WordPress default styles? Stick with WordPress default styles
6. Browser Support:
   - Any specific browser compatibility requirements? No
   - Should we use any polyfills for older browsers? No
7. Validation:
   - Should there be any validation on the fields (max length, required fields, etc.)? Yes, suggest me good validation rules
   - Would you like me to propose specific validation rules for each field (title length, description length, image dimensions)? Yes
   - Should we validate image dimensions for optimal Open Graph sharing? No
8. For the meta tags output in the HTML:
   - Should we add them in the <head> section using wp_head hook? Yes
9. For the success message:
   - Should it be a WordPress notice or a more modern Gutenberg-style notice? a Gutenberg-style notice
10. Fallback Behavior: When using fallbacks, should we:
    - Visually indicate in the editor when a fallback value is being used? Yes
    - Allow users to "reset" to fallback values after setting custom ones? Yes
11. Open Graph Type:
    - For the og:type field, should we provide a predefined list of common types (e.g., article, website, product), or allow free text input? provide a predefined list of common types
    - Should the type have a default value (e.g., "article" for posts)? Yes
12. Internationalization:
    - Should the plugin support translations (i18n)? Yes
    - Should error/success messages be translatable? Yes
13. Security:
    - Should we implement any specific capability checks beyond the default post editing capabilities? No
    - Should we add any rate limiting for meta updates? No
14. Plugin Activation/Deactivation:
    - Should we include any cleanup routines when the plugin is deactivated (e.g., remove stored meta)? Yes, remove the stored meta
    - Should we include any initialization routines when activated? No
15. Others

    - Should the plugin support custom post types in addition to regular posts? No
    - For the cleanup routine on deactivation - should we provide an option to keep the meta data, or should we always remove it? No
    - For the image selection, when allowing both upload and media library selection, should we store the image as an ID or URL? Whatever method you consider is less error prone
    - For the image selection, should we provide a preview of the selected image in the sidebar panel? Yes
    - When using fallback values (like post title for OG title), should we display the fallback value in the input field as a placeholder, or leave it empty with just an indicator that a fallback will be used? Display it the placeholder with the formula: Default: <%VALUE%>
    - For the cleanup on deactivation, should we also remove any enqueued assets or just focus on the meta data? Just focus on the meta data
    - For the success message after saving - should it automatically dismiss after a few seconds or require manual dismissal? Require manual dismissal
    - When storing image data - would you prefer storing as attachment ID (more robust but requires extra queries) or URL (simpler but potentially more fragile if media is moved)? As attachment ID
    - For the JavaScript portion:
      - Should we use ES5 or can we use modern ES6+ features? Use ES6+ features
      - Should we include any build process (like webpack) for the JS files? Yes, use the `wp-scripts` package to get the `build`
    - For the meta tag output:
      - Should we escape/sanitize the meta values before output? Yes
      - Should we filter out empty meta tags from being output? Yes

16. For validation rules, use:

- Title: Max 60-70 characters (default value: title of the post)
- Description: Max 155-160 characters (default value: excerpt of the post)
- URL: Must be a valid URL format (default value: URL of the post)
- Type: Must be one of the predefined values (default value: article)
- Image: No dimensions validation (default value: featured image)

1. For the predefined OG types, include:

- article (default for posts)
- website
- profile
- book
- product

Let me know if you need any modifications! 🚀
