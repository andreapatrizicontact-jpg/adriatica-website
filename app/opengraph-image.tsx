import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Same black-to-blue gradient as the confirmed logo chip
// (public/brand/logo-adriatica-chip.png) — real hex values from
// app/globals.css since Satori can't resolve CSS custom properties.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #06060f 0%, #25227a 55%, #004aad 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 40,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#5271ff",
            fontWeight: 700,
          }}
        >
          Marketing Studio
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 160,
            fontWeight: 900,
            color: "#ffffff",
            marginTop: 16,
          }}
        >
          Adriatica.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 36,
            color: "rgba(255,255,255,0.85)",
            marginTop: 24,
            maxWidth: 900,
          }}
        >
          Trasformiamo brand in storie che le persone vogliono seguire.
        </div>
      </div>
    ),
    { ...size }
  );
}
