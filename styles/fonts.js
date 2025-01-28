// styles/fonts.js
export const Fonts = () => (
  <style jsx global>{`
    @import url("https://api.fontshare.com/v2/css?f[]=clash-display@600,700&display=swap");
    @import url("https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@300,400,500&display=swap");

    .font-clash {
      font-family: "Clash Display", sans-serif;
    }

    .font-grotesk {
      font-family: "Cabinet Grotesk", sans-serif;
    }
  `}</style>
);
