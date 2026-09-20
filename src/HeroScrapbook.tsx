import frameCutout from "../Image/Frame01.png";
import baseTexture from "../Image/Texture_Sample00.jpg";
import lifePanel02 from "../Image/LifePanel_02.png";
import lifePanel03 from "../Image/LifePanel_03.png";
import "./HeroScrapbook.css";

const photos = [lifePanel02, lifePanel03];

/** Decorative copies of the artwork; the gallery remains the reading surface. */
export function HeroPhotoNotes({ variant = "all" }: { variant?: "all" | "memo" | "portrait" }) {
  return (
    <div className="hero-photo-notes" data-photo-group={variant} aria-hidden="true">
      {photos.map((photo, index) => {
        if (variant === "memo" && index !== 1 || variant === "portrait" && index !== 0) return null;
        return (
          <div className={`hero-photo-note hero-photo-note--${index + 1}`} key={photo}>
            <img className="hero-photo-print" src={photo} alt="" draggable={false} data-hero-panel="true" />
            <span className="hero-photo-tape" />
            {index === 0 && <span className="hero-photo-clip" />}
          </div>
        );
      })}
    </div>
  );
}

export function HeroHomeFrame() {
  return (
    <>
      <svg className="hero-frame-palette" width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          <filter id="hero-dark-frame" colorInterpolationFilters="sRGB">
            {/* Recolour the opaque paper and lavender ink without blending in the backdrop. */}
            <feColorMatrix type="matrix" values="0 -2.75 0 0 2.90686  0 -2.2 0 0 2.35686  0 -3.325 0 0 3.48186  0 0 0 1 0" />
          </filter>
        </defs>
      </svg>
      <div className="hero-base-texture" style={{ backgroundImage: `url("${baseTexture}")` }} aria-hidden="true" />
      <div className="hero-home-frame" style={{ borderImageSource: `url("${frameCutout}")` }} aria-hidden="true" />
    </>
  );
}

export function HeroFigureBackdrop() {
  return <img className="hero-figure-backdrop" src={`${import.meta.env.BASE_URL}backgrounds/hero-lace-expanded.png`} alt="" aria-hidden="true" draggable={false} data-hero-texture="true" />;
}
