import { registerPlugin } from "@wordpress/plugins";
import { PluginSidebar } from "@wordpress/edit-post";
import {
  PanelBody,
  TextControl,
  SelectControl,
  Button,
  Notice,
} from "@wordpress/components";
import { useSelect, useDispatch } from "@wordpress/data";
import { useState, useEffect } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import OGPreview from "./components/OGPreview";
import OGImageControl from "./components/OGImageControl";

const OGTSidebar = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [imageUrl, setImageUrl] = useState("");

  const postId = useSelect((select) =>
    select("core/editor").getCurrentPostId()
  );
  const postTitle = useSelect((select) =>
    select("core/editor").getEditedPostAttribute("title")
  );
  const postExcerpt = useSelect((select) =>
    select("core/editor").getEditedPostAttribute("excerpt")
  );
  const postPermalink = useSelect((select) =>
    select("core/editor").getPermalink()
  );
  const hasPostThumbnail = useSelect((select) =>
    select("core/editor").getEditedPostAttribute("featured_media")
  );
  const postThumbnailUrl = useSelect((select) => {
    const featuredImageId =
      select("core/editor").getEditedPostAttribute("featured_media");
    if (!featuredImageId) return null;
    const media = select("core").getMedia(featuredImageId);
    return media?.source_url;
  });

  const { editPost } = useDispatch("core/editor");
  const meta = useSelect((select) =>
    select("core/editor").getEditedPostAttribute("meta")
  );

  const {
    _ogt_title = "",
    _ogt_description = "",
    _ogt_image_id = "",
    _ogt_url = "",
    _ogt_type = "article",
  } = meta;

  useEffect(() => {
    if (_ogt_image_id) {
      fetch(`/wp-json/wp/v2/media/${_ogt_image_id}`)
        .then((response) => response.json())
        .then((data) => setImageUrl(data.source_url));
    }
  }, [_ogt_image_id]);

  const validateFields = () => {
    const newErrors = {};

    if (_ogt_title && _ogt_title.length > 70) {
      newErrors.title = __(
        "Title should not exceed 70 characters",
        "open-graph-tags"
      );
    }

    if (_ogt_description && _ogt_description.length > 160) {
      newErrors.description = __(
        "Description should not exceed 160 characters",
        "open-graph-tags"
      );
    }

    if (_ogt_url && !isValidUrl(_ogt_url)) {
      newErrors.url = __("Please enter a valid URL", "open-graph-tags");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const updateMeta = (key, value) => {
    editPost({ meta: { ...meta, [key]: value } });
  };

  const ogTypes = [
    { label: __("Article", "open-graph-tags"), value: "article" },
    { label: __("Website", "open-graph-tags"), value: "website" },
    { label: __("Profile", "open-graph-tags"), value: "profile" },
    { label: __("Book", "open-graph-tags"), value: "book" },
    { label: __("Product", "open-graph-tags"), value: "product" },
  ];

  return (
    <PluginSidebar
      name="ogt-sidebar"
      title={__("Open Graph Tags", "open-graph-tags")}
    >
      <PanelBody>
        {showSuccess && (
          <Notice
            status="success"
            isDismissible={true}
            onDismiss={() => setShowSuccess(false)}
          >
            {__("Open Graph tags updated successfully!", "open-graph-tags")}
          </Notice>
        )}

        <OGPreview
          currentTitle={_ogt_title || postTitle}
          currentDescription={_ogt_description || postExcerpt}
          currentUrl={_ogt_url || postPermalink}
          currentType={_ogt_type}
          imageUrl={imageUrl}
          hasPostThumbnail={hasPostThumbnail}
          postThumbnailUrl={postThumbnailUrl}
        />

        <TextControl
          label={__("OG Title", "open-graph-tags")}
          value={_ogt_title}
          onChange={(value) => updateMeta("_ogt_title", value)}
          placeholder={`Default: ${postTitle}`}
          help={errors.title}
          className={errors.title ? "has-error" : ""}
        />

        <TextControl
          label={__("OG Description", "open-graph-tags")}
          value={_ogt_description}
          onChange={(value) => updateMeta("_ogt_description", value)}
          placeholder={`Default: ${postExcerpt}`}
          help={errors.description}
          className={errors.description ? "has-error" : ""}
        />

        <OGImageControl
          imageUrl={imageUrl}
          postThumbnailUrl={postThumbnailUrl}
          hasPostThumbnail={hasPostThumbnail}
          _ogt_image_id={_ogt_image_id}
          updateMeta={updateMeta}
          setImageUrl={setImageUrl}
        />

        <TextControl
          label={__("OG URL", "open-graph-tags")}
          value={_ogt_url}
          onChange={(value) => updateMeta("_ogt_url", value)}
          placeholder={`Default: ${postPermalink}`}
          help={errors.url}
          className={errors.url ? "has-error" : ""}
        />

        <SelectControl
          label={__("OG Type", "open-graph-tags")}
          value={_ogt_type}
          options={ogTypes}
          onChange={(value) => updateMeta("_ogt_type", value)}
        />

        <Button
          variant="primary"
          onClick={() => {
            if (validateFields()) {
              setShowSuccess(true);
            }
          }}
        >
          {__("Save Open Graph Tags", "open-graph-tags")}
        </Button>
      </PanelBody>
    </PluginSidebar>
  );
};

registerPlugin("ogt-sidebar", {
  render: OGTSidebar,
  icon: "share",
});
