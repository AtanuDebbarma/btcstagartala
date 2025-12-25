// Custom Font Awesome icon bundle - only load icons we actually use
// This replaces the full Font Awesome CSS import

export const loadFontAwesome = () => {
  // Create a style element for our custom Font Awesome subset
  const style = document.createElement('style');
  style.textContent = `
    /* Font Awesome subset - only icons we use */
    @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/fontawesome.min.css');
    
    /* Load only the icon fonts we need */
    @font-face {
      font-family: "Font Awesome 6 Free";
      font-style: normal;
      font-weight: 900;
      font-display: swap;
      src: url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-solid-900.woff2') format('woff2');
    }
    
    @font-face {
      font-family: "Font Awesome 6 Brands";
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-brands-400.woff2') format('woff2');
    }
    
    /* Base classes */
    .fa-solid, .fa-brands, .fas, .fab {
      font-family: "Font Awesome 6 Free";
      font-weight: 900;
      font-style: normal;
      font-variant: normal;
      text-rendering: auto;
      line-height: 1;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    .fa-brands, .fab {
      font-family: "Font Awesome 6 Brands";
      font-weight: 400;
    }
    
    /* Animation classes */
    .fa-spin {
      animation: fa-spin 2s infinite linear;
    }
    
    @keyframes fa-spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    /* Size classes */
    .fa-2x { font-size: 2em; }
    
    /* Icon definitions - only the ones we use in btcstagartala */
    .fa-bars:before { content: "\\f0c9"; }
    .fa-times:before { content: "\\f00d"; }
    .fa-pen:before { content: "\\f304"; }
    .fa-trash:before { content: "\\f2ed"; }
    .fa-plus:before { content: "\\2b"; }
    .fa-eye:before { content: "\\f06e"; }
    .fa-download:before { content: "\\f019"; }
    .fa-file-pdf:before { content: "\\f1c1"; }
    .fa-arrows-up-down:before { content: "\\f07d"; }
    .fa-expand:before { content: "\\f065"; }
    .fa-chevron-left:before { content: "\\f053"; }
    .fa-chevron-right:before { content: "\\f054"; }
    .fa-info-circle:before { content: "\\f05a"; }
    .fa-power-off:before { content: "\\f011"; }
    .fa-ban:before { content: "\\f05e"; }
    
    /* Brand icons */
    .fa-facebook:before { content: "\\f09a"; }
    .fa-instagram:before { content: "\\f16d"; }
    .fa-whatsapp:before { content: "\\f232"; }
    .fa-google:before { content: "\\f1a0"; }
    .fa-github:before { content: "\\f09b"; }
  `;

  document.head.appendChild(style);
};
