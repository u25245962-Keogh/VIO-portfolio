import { Link } from "react-router-dom";
import head from "../assets/headLogo.png";
import infographicHtml from "../assets/Comic/FINAL-infographic/File/index.html?raw";
import infographicCss from "../assets/Comic/FINAL-infographic/File/style.css?raw";
import infographicScript from "../assets/Comic/FINAL-infographic/File/script.js?raw";
import Navbar from "../components/Navbar";
import DropdownMenu from "../components/DropdownMenu";
import NavItem from "../components/NavItem";
import "../styles/Model.css";
import "../styles/font.css";

const infographicAssets = import.meta.glob(
  "../assets/Comic/FINAL-infographic/**/*.{gif,png}",
  { eager: true, import: "default", query: "?url" },
);

function getInfographicAssetUrl(reference) {
  const assetPath = reference.startsWith("../animations infographic/")
    ? reference.slice(3)
    : `File/${reference}`;
  const assetKey = `../assets/Comic/FINAL-infographic/${assetPath}`;
  const assetUrl = infographicAssets[assetKey];

  if (!assetUrl) {
    throw new Error(`Infographic asset not found: ${reference}`);
  }

  return assetUrl;
}

const scriptWithAssetUrls = infographicScript.replace(
  /(["'])(\.\.\/animations infographic\/[^"']+|map-open\.png)\1/g,
  (_, _quote, reference) => JSON.stringify(getInfographicAssetUrl(reference)),
);

const infographicDocument = infographicHtml
  .replace(
    /<link\s+rel="stylesheet"\s+href="style\.css"\s*\/?>/i,
    `<style>${infographicCss}</style>`,
  )
  .replace(
    /<script\b[^>]*src="script\.js"[^>]*>\s*<\/script>/i,
    `<script>${scriptWithAssetUrls}</script>`,
  )
  .replace(/\b(src|href)=("([^"]+)"|'([^']+)')/gi, (attribute, name, _quoted, doubleQuoted, singleQuoted) => {
    const reference = doubleQuoted ?? singleQuoted;
    return `${name}="${getInfographicAssetUrl(reference)}"`;
  });

function Infographic() {
  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <div style={{ position: "absolute", inset: "0 0 auto", zIndex: 2 }}>
        <Navbar>
          <NavItem icon={head}>
            <DropdownMenu></DropdownMenu>
          </NavItem>
        </Navbar>
      </div>
      <Link to="/Comic">
        <button
          type="button"
          id="ModelBack"
          style={{ top: "70px", left: "25px", margin: 0 }}
        >
          Back
        </button>
      </Link>
      <Link
        to="/VerticalNar"
        style={{
          position: "fixed",
          right: "25px",
          bottom: "25px",
          zIndex: 2,
        }}
      >
        <button type="button" className="modelBackButton">
         next
        </button>
      </Link>
      <iframe
        title="Finley infographic"
        srcDoc={infographicDocument}
        style={{
          position: "absolute",
          inset: 0,
          display: "block",
          width: "100%",
          height: "100%",
          border: 0,
          zIndex: 0,
        }}
      />
    </div>
  );
}

export default Infographic;
