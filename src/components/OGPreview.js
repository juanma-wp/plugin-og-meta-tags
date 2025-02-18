import { __ } from "@wordpress/i18n";

const OGPreview = ({
  currentTitle,
  currentDescription,
  currentUrl,
  currentType,
  imageUrl,
  hasPostThumbnail,
  postThumbnailUrl,
}) => {
  return (
    <div
      className="ogt-preview"
      style={{
        marginTop: "20px",
        padding: "10px",
        backgroundColor: "#f0f0f0",
        borderRadius: "4px",
      }}
    >
      <h3 style={{ marginTop: 0 }}>{__("Preview", "open-graph-tags")}</h3>
      <div style={{ fontSize: "12px" }}>
        <p>
          <strong>og:title:</strong> {currentTitle}
        </p>
        <p>
          <strong>og:description:</strong> {currentDescription}
        </p>
        {(imageUrl || hasPostThumbnail) && (
          <p>
            <strong>og:image:</strong>
            <br />
            <img
              src={imageUrl || postThumbnailUrl}
              alt=""
              style={{ maxWidth: "100%", marginTop: "5px" }}
            />
          </p>
        )}
        <p>
          <strong>og:url:</strong> {currentUrl}
        </p>
        <p>
          <strong>og:type:</strong> {currentType}
        </p>
      </div>
    </div>
  );
};

export default OGPreview;
