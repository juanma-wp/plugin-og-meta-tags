import { __ } from "@wordpress/i18n";
import { Button } from "@wordpress/components";
import { MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";

const OGImageControl = ({
  imageUrl,
  postThumbnailUrl,
  hasPostThumbnail,
  _ogt_image_id,
  updateMeta,
  setImageUrl,
}) => {
  return (
    <div style={{ marginBottom: "24px" }}>
      <label
        className="components-base-control__label"
        style={{ display: "block", marginBottom: "8px" }}
      >
        {__("OG Image", "open-graph-tags")}
      </label>

      <p
        className="components-base-control__help"
        style={{ marginTop: "-4px", marginBottom: "8px" }}
      >
        {_ogt_image_id
          ? __("Using custom image", "open-graph-tags")
          : hasPostThumbnail
          ? __("Using featured image (default)", "open-graph-tags")
          : __("No image set", "open-graph-tags")}
      </p>

      <MediaUploadCheck>
        <div
          style={{
            border: "1px solid #ccc",
            padding: "16px",
            borderRadius: "4px",
            backgroundColor: "#fff",
          }}
        >
          {(imageUrl || postThumbnailUrl) && (
            <div style={{ marginBottom: "16px" }}>
              <img
                src={imageUrl || postThumbnailUrl}
                alt=""
                style={{
                  maxWidth: "100%",
                  display: "block",
                  marginBottom: "8px",
                }}
              />
              {_ogt_image_id && (
                <Button
                  onClick={() => {
                    updateMeta("_ogt_image_id", "");
                    setImageUrl("");
                  }}
                  variant="link"
                  isDestructive
                  style={{ padding: "0" }}
                >
                  {__("Reset to featured image", "open-graph-tags")}
                </Button>
              )}
            </div>
          )}

          <div style={{ display: "flex", gap: "8px" }}>
            <MediaUpload
              onSelect={(media) => {
                updateMeta("_ogt_image_id", media.id);
                setImageUrl(media.url);
              }}
              allowedTypes={["image"]}
              value={_ogt_image_id}
              render={({ open }) => (
                <Button onClick={open} variant="secondary">
                  {_ogt_image_id
                    ? __("Change Image", "open-graph-tags")
                    : __("Select Custom Image", "open-graph-tags")}
                </Button>
              )}
            />
          </div>
        </div>
      </MediaUploadCheck>
    </div>
  );
};

export default OGImageControl;
