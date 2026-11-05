import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import head from "../assets/headLogo.png";
import DropdownMenu from "../components/DropdownMenu";
import NavItem from "../components/NavItem";
import comicHtml from "../assets/Comic/vertical-narrative/index.html?raw";
import comicCss from "../assets/Comic/vertical-narrative/styles.css?raw";
import audioCss from "../assets/Comic/vertical-narrative/audio.css?raw";
import comicScript from "../assets/Comic/vertical-narrative/index.js?raw";
import "../styles/Comic.css"

const comicStyles = comicCss.replace(/^\uFEFF/, "");
const comicAssets = import.meta.glob(
  "../assets/Comic/vertical-narrative/*.{gif,GIF,png,wav}",
  { eager: true, import: "default", query: "?url" },
);
const comicAssetUrls = new Map(
  Object.entries(comicAssets).map(([path, url]) => [path.toLowerCase(), url]),
);

function getComicAssetUrl(reference) {
  const assetUrl =
    comicAssetUrls.get(
      `../assets/Comic/vertical-narrative/${reference}`.toLowerCase(),
    );

  if (!assetUrl) {
    throw new Error(`Vertical narrative asset not found: ${reference}`);
  }

  return assetUrl;
}

const scriptWithAssetUrls = comicScript.replace(
  /(["'])([^"']+\.(?:png|gif|wav))\1/gi,
  (_, _quote, reference) => JSON.stringify(getComicAssetUrl(reference)),
);

const comicDocument = comicHtml
  .replace(
    /<link\s+rel="stylesheet"\s+href="styles\.css"\s*\/?>/i,
    `<style>${comicStyles}</style>`,
  )
  .replace(
    /<link\s+rel="stylesheet"\s+href="audio\.css"\s*\/?>/i,
    `<style>${audioCss}</style>`,
  )
  .replace(
    /<script\b[^>]*src="index\.js"[^>]*>\s*<\/script>/i,
    `<script>${scriptWithAssetUrls}</script>`,
  )
  .replace(
    /\b(src|href|data-gif-src|data-src)=("([^"]+)"|'([^']+)')/gi,
    (attribute, name, _quoted, doubleQuoted, singleQuoted) => {
      const reference = doubleQuoted ?? singleQuoted;

      if (!/\.(?:png|gif|wav)$/i.test(reference)) {
        return attribute;
      }

      return `${name}="${getComicAssetUrl(reference)}"`;
    },
  );

function VerticalNar() {
  return (
    <div style={{ position: "fixed", inset: 0 }}>
      <iframe
        title="Vertical narrative comic"
        srcDoc={comicDocument}
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
      <div
        style={{
          position: "fixed",
          inset: "0 0 auto",
          zIndex: 1000,
        }}
      >
        <Navbar>
          <NavItem icon={head}>
            <DropdownMenu></DropdownMenu>
          </NavItem>
        </Navbar>
      </div>
      <Link
        to="/Infographic"
        style={{
          position: "fixed",
          left: "25px",
          top: "25px",
          zIndex: 1001,
        }}
      >
        <button type="button" className="modelBackButton" id="vert-btn">
          Back
        </button>
      </Link>
     
    </div>
  );
}

export default VerticalNar;
