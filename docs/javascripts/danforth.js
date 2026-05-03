/* ============================================================
   Danforth Center — Material for MkDocs theme JS
   Drop into:  docs/javascripts/danforth.js
   Wire in mkdocs.yml:
     extra_javascript: [javascripts/danforth.js]
   ============================================================ */

(() => {
  'use strict';

  /* ---------- 1. The Frond ----------
     Inline SVG (single path-stroke version of the brand mark).
     We base64 it into a CSS var so .ddpsc-hero::after can use it
     without an extra HTTP round-trip. The full multi-path mark
     is large; this is a faithful single-path silhouette suitable
     for watermarks. For full-fidelity uses, ship the file and
     reference /assets/frond-blue.svg directly. */
  const FROND_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 258.62 245.24" preserveAspectRatio="xMidYMid meet"><g id="layer-MC0">
    <path id="path1" d="m 0,0 c 0,-6.315 -5.119,-11.435 -11.435,-11.435 -6.315,0 -11.434,5.12 -11.434,11.435 0,6.315 5.119,11.435 11.434,11.435 C -5.119,11.435 0,6.315 0,0" style="fill:#004F6B;fill-opacity:1;fill-rule:nonzero;stroke:none" transform="matrix(1.3333333,0,0,-1.3333333,144.54733,229.99467)" clip-path="url(#clipPath2)"></path>
    <path id="path3" d="m 0,0 c -0.087,6.306 -0.777,12.595 -2.072,18.748 -1.251,6.163 -3.095,12.202 -5.518,17.999 -4.837,11.599 -11.979,22.214 -20.859,31.078 -8.805,8.938 -19.371,16.151 -30.937,21.067 -5.78,2.462 -11.806,4.348 -17.96,5.64 -5.967,1.299 -12.065,2.028 -18.186,2.188 -0.304,0.008 -0.547,0.256 -0.544,0.56 10e-4,0.254 0.174,0.474 0.42,0.537 l 0.782,0.2 1.207,0.267 2.436,0.531 c 1.628,0.264 3.273,0.477 4.93,0.669 1.656,0.172 3.313,0.207 4.991,0.302 0.421,0.029 0.838,0.031 1.253,0.018 l 1.253,-0.023 2.518,-0.05 c 6.712,-0.308 13.433,-1.556 19.942,-3.608 C -43.33,91.99 -31.226,84.537 -21.509,74.719 -11.774,64.919 -4.403,52.771 -0.361,39.73 1.645,33.208 2.847,26.48 3.112,19.77 L 3.148,17.251 C 3.144,16.413 3.203,15.588 3.136,14.746 3.033,13.07 2.986,11.414 2.804,9.759 2.603,8.104 2.381,6.461 2.107,4.834 L 1.564,2.402 1.29,1.197 0.979,0 Z" style="fill:#004F6B;fill-opacity:1;fill-rule:nonzero;stroke:none" transform="matrix(1.3333333,0,0,-1.3333333,128.10133,236.1196)" clip-path="url(#clipPath4)"></path>
    <path id="path5" d="m 0,0 c -1.548,5.588 -3.598,11.027 -6.112,16.234 -2.474,5.227 -5.404,10.234 -8.756,14.94 -6.707,9.414 -15.143,17.562 -24.694,24.026 -9.495,6.556 -20.214,11.326 -31.43,14.092 -5.609,1.383 -11.346,2.25 -17.118,2.617 -5.585,0.402 -11.208,0.304 -16.791,-0.27 -0.308,-0.032 -0.585,0.187 -0.623,0.494 -0.03,0.248 0.106,0.488 0.334,0.589 l 0.668,0.295 1.065,0.419 c 0.713,0.274 1.431,0.541 2.154,0.799 1.449,0.487 2.918,0.931 4.406,1.302 1.486,0.394 2.99,0.694 4.507,0.98 1.514,0.247 3.041,0.462 4.578,0.667 6.146,0.688 12.428,0.559 18.649,-0.288 12.437,-1.738 24.612,-6.439 35.104,-13.608 10.503,-7.146 19.393,-16.664 25.595,-27.584 3.083,-5.469 5.528,-11.259 7.161,-17.23 C -0.482,15.491 0.126,12.46 0.521,9.417 0.744,7.904 0.821,6.355 0.939,4.84 0.977,4.076 0.963,3.3 0.975,2.538 L 0.979,1.394 0.947,0.247 Z" style="fill:#004F6B;fill-opacity:1;fill-rule:nonzero;stroke:none" transform="matrix(1.3333333,0,0,-1.3333333,147.4368,169.3488)"></path>
    <path id="path6" d="m 0,0 c -1.402,6.013 -3.378,11.882 -5.884,17.506 -2.464,5.641 -5.438,11.063 -8.949,16.118 -3.495,5.063 -7.462,9.796 -11.832,14.12 -4.377,4.319 -9.185,8.188 -14.29,11.6 -10.145,6.935 -21.681,11.803 -33.704,14.399 -0.747,0.184 -1.506,0.312 -2.262,0.45 l -2.27,0.415 c -1.519,0.241 -3.047,0.434 -4.571,0.645 -1.532,0.136 -3.062,0.312 -4.598,0.414 -1.537,0.07 -3.074,0.179 -4.613,0.217 -5.973,0.175 -11.968,-0.199 -17.884,-1.128 -0.304,-0.047 -0.59,0.156 -0.643,0.458 -0.044,0.248 0.082,0.494 0.309,0.604 l 0.715,0.347 1.113,0.483 c 0.746,0.316 1.498,0.625 2.255,0.925 1.52,0.568 3.063,1.09 4.629,1.536 3.129,0.918 6.339,1.579 9.592,2.058 0.814,0.135 1.629,0.197 2.447,0.283 l 2.463,0.245 c 0.825,0.097 1.646,0.093 2.472,0.133 l 2.485,0.089 c 1.655,0.004 3.318,-0.027 4.98,-0.105 l 2.493,-0.172 c 0.834,-0.053 1.668,-0.119 2.492,-0.242 13.271,-1.544 26.346,-6.347 37.555,-13.934 l 2.088,-1.44 2.027,-1.524 c 1.364,-0.999 2.665,-2.08 3.963,-3.161 0.319,-0.276 0.646,-0.545 0.959,-0.827 l 0.931,-0.861 1.856,-1.721 c 0.617,-0.576 1.198,-1.189 1.797,-1.783 0.596,-0.597 1.192,-1.193 1.752,-1.822 2.242,-2.52 4.458,-5.055 6.381,-7.816 2.01,-2.687 3.764,-5.557 5.395,-8.467 3.245,-5.838 5.729,-12.057 7.34,-18.437 l 0.576,-2.395 c 0.159,-0.808 0.329,-1.608 0.465,-2.418 0.306,-1.605 0.526,-3.228 0.696,-4.85 L 0.861,8.731 C 0.892,8.325 0.92,7.918 0.938,7.51 L 1.06,5.076 C 1.094,4.268 1.047,3.443 1.043,2.635 L 1.019,1.422 0.956,0.208 Z" style="fill:#004F6B;fill-opacity:1;fill-rule:nonzero;stroke:none" transform="matrix(1.3333333,0,0,-1.3333333,172.65413,140.21333)"></path>
    <path id="path7" d="m 0,0 c -0.829,6.223 -2.269,12.355 -4.288,18.282 -1.975,5.941 -4.521,11.688 -7.602,17.132 -6.151,10.891 -14.427,20.575 -24.253,28.291 -9.738,7.82 -21.007,13.746 -33.007,17.291 -5.998,1.783 -12.181,2.932 -18.414,3.511 l -2.34,0.195 c -0.781,0.062 -1.56,0.145 -2.344,0.157 -1.565,0.045 -3.131,0.139 -4.699,0.144 -2.95,0.01 -5.903,-0.12 -8.847,-0.377 -0.305,-0.027 -0.576,0.195 -0.608,0.5 -0.027,0.25 0.116,0.489 0.35,0.582 6.004,2.376 12.429,3.581 18.947,4.063 6.667,0.46 13.46,0.024 20.132,-1.263 13.345,-2.597 26.166,-8.586 36.925,-17.152 0.342,-0.259 0.673,-0.533 1.011,-0.8 l 0.974,-0.845 1.943,-1.693 c 0.657,-0.554 1.269,-1.159 1.893,-1.749 0.621,-0.594 1.248,-1.18 1.862,-1.782 1.194,-1.235 2.343,-2.513 3.51,-3.769 l 1.663,-1.964 c 0.552,-0.655 1.113,-1.303 1.622,-1.994 l 1.534,-2.063 c 0.508,-0.689 1.029,-1.366 1.497,-2.084 0.476,-0.712 0.968,-1.41 1.426,-2.132 l 0.694,-1.077 0.65,-1.105 c 1.77,-2.919 3.364,-5.938 4.724,-9.053 C -2.292,33.036 -0.302,26.53 0.758,19.924 0.906,19.104 1.006,18.272 1.1,17.441 1.194,16.611 1.305,15.789 1.378,14.959 1.476,14.137 1.491,13.297 1.542,12.47 1.591,11.642 1.613,10.812 1.64,9.987 1.669,8.332 1.587,6.669 1.528,5.032 1.461,4.207 1.361,3.381 1.277,2.563 L 1.144,1.338 0.972,0.116 Z" style="fill:#004F6B;fill-opacity:1;fill-rule:nonzero;stroke:none" transform="matrix(1.3333333,0,0,-1.3333333,201.44707,119.93213)"></path>
    <path id="path8" d="m 0,0 c 0.087,6.306 0.777,12.595 2.072,18.749 1.252,6.162 3.095,12.201 5.518,17.998 4.837,11.599 11.979,22.214 20.859,31.078 8.805,8.938 19.372,16.151 30.937,21.067 5.78,2.462 11.806,4.349 17.96,5.64 5.967,1.299 12.066,2.028 18.186,2.188 0.304,0.008 0.547,0.256 0.545,0.56 -0.002,0.254 -0.175,0.475 -0.421,0.537 l -0.782,0.2 -1.207,0.267 -2.436,0.531 c -1.628,0.264 -3.273,0.477 -4.931,0.669 -1.655,0.172 -3.312,0.207 -4.99,0.302 -0.421,0.029 -0.838,0.031 -1.254,0.018 l -1.252,-0.023 -2.518,-0.05 C 69.575,99.423 62.853,98.175 56.344,96.123 43.33,91.99 31.226,84.537 21.508,74.719 11.774,64.919 4.403,52.772 0.361,39.73 -1.645,33.208 -2.847,26.48 -3.112,19.77 l -0.036,-2.518 c 0.003,-0.839 -0.055,-1.664 0.012,-2.505 0.103,-1.677 0.15,-3.333 0.331,-4.987 0.201,-1.656 0.424,-3.299 0.698,-4.926 L -1.564,2.402 -1.29,1.197 -0.979,0 Z" style="fill:#004F6B;fill-opacity:1;fill-rule:nonzero;stroke:none" transform="matrix(1.3333333,0,0,-1.3333333,130.5168,236.1196)"></path>
    <path id="path9" d="m 0,0 c 1.547,5.588 3.598,11.027 6.113,16.234 2.472,5.227 5.403,10.234 8.755,14.94 6.707,9.414 15.143,17.562 24.694,24.026 9.495,6.556 20.214,11.326 31.429,14.092 5.61,1.383 11.347,2.25 17.118,2.617 5.586,0.402 11.209,0.304 16.792,-0.27 0.308,-0.032 0.585,0.187 0.622,0.494 0.031,0.249 -0.104,0.488 -0.334,0.589 l -0.667,0.295 -1.065,0.419 c -0.713,0.274 -1.431,0.541 -2.154,0.799 -1.449,0.487 -2.918,0.931 -4.406,1.302 -1.487,0.395 -2.991,0.694 -4.506,0.98 -1.515,0.247 -3.042,0.463 -4.579,0.667 -6.146,0.688 -12.428,0.559 -18.65,-0.288 C 56.727,75.158 44.551,70.457 34.059,63.288 23.556,56.142 14.666,46.624 8.463,35.704 5.381,30.235 2.936,24.445 1.302,18.474 0.482,15.491 -0.126,12.46 -0.522,9.417 -0.745,7.904 -0.822,6.355 -0.939,4.84 -0.977,4.076 -0.962,3.3 -0.975,2.538 L -0.98,1.394 -0.947,0.247 Z" style="fill:#004F6B;fill-opacity:1;fill-rule:nonzero;stroke:none" transform="matrix(1.3333333,0,0,-1.3333333,111.1816,169.3488)"></path>
    <path id="path10" d="m 0,0 c 1.402,6.013 3.378,11.882 5.884,17.506 2.464,5.641 5.439,11.063 8.949,16.118 3.495,5.063 7.462,9.796 11.832,14.12 4.377,4.319 9.185,8.188 14.29,11.6 10.145,6.935 21.681,11.803 33.704,14.399 0.747,0.184 1.506,0.313 2.262,0.45 l 2.27,0.415 c 1.519,0.241 3.046,0.434 4.571,0.645 1.532,0.136 3.062,0.312 4.598,0.414 1.537,0.07 3.074,0.179 4.613,0.217 5.972,0.175 11.967,-0.199 17.884,-1.128 0.304,-0.047 0.589,0.156 0.643,0.458 0.044,0.248 -0.082,0.494 -0.309,0.604 l -0.714,0.348 -1.115,0.482 c -0.745,0.316 -1.497,0.625 -2.255,0.925 -1.518,0.568 -3.062,1.091 -4.628,1.536 -3.128,0.918 -6.338,1.579 -9.592,2.058 -0.814,0.135 -1.629,0.197 -2.448,0.283 l -2.461,0.245 c -0.826,0.097 -1.647,0.093 -2.473,0.133 l -2.484,0.089 C 81.364,81.921 79.702,81.89 78.04,81.812 L 75.547,81.64 C 74.713,81.587 73.879,81.521 73.056,81.398 59.784,79.854 46.71,75.051 35.501,67.464 L 33.412,66.024 31.385,64.5 C 30.021,63.501 28.72,62.42 27.421,61.339 27.102,61.063 26.776,60.794 26.462,60.512 L 25.532,59.651 23.675,57.93 C 23.059,57.354 22.478,56.741 21.878,56.148 21.284,55.55 20.687,54.954 20.126,54.325 17.885,51.805 15.669,49.27 13.746,46.509 11.736,43.822 9.982,40.952 8.351,38.042 5.106,32.204 2.622,25.985 1.01,19.605 L 0.435,17.21 C 0.276,16.402 0.106,15.602 -0.03,14.793 -0.336,13.187 -0.556,11.564 -0.726,9.942 L -0.861,8.731 C -0.892,8.325 -0.92,7.918 -0.938,7.51 L -1.06,5.076 C -1.094,4.268 -1.047,3.443 -1.043,2.635 l 0.024,-1.213 0.063,-1.214 z" style="fill:#004F6B;fill-opacity:1;fill-rule:nonzero;stroke:none" transform="matrix(1.3333333,0,0,-1.3333333,85.964,140.21333)"></path>
    <path id="path11" d="m 0,0 c 0.83,6.223 2.269,12.355 4.288,18.282 1.975,5.941 4.521,11.688 7.602,17.132 6.152,10.891 14.427,20.575 24.253,28.291 9.738,7.82 21.008,13.746 33.008,17.291 5.997,1.783 12.18,2.932 18.413,3.512 l 2.341,0.194 c 0.78,0.062 1.56,0.145 2.344,0.157 1.565,0.045 3.13,0.139 4.698,0.144 2.951,0.01 5.903,-0.12 8.847,-0.377 0.306,-0.027 0.577,0.195 0.609,0.5 0.026,0.25 -0.116,0.489 -0.351,0.582 -6.004,2.376 -12.429,3.581 -18.946,4.063 -6.668,0.46 -13.461,0.024 -20.133,-1.263 C 53.628,85.911 40.807,79.922 30.049,71.356 29.706,71.097 29.375,70.823 29.038,70.556 L 28.063,69.711 26.12,68.018 C 25.463,67.464 24.851,66.859 24.227,66.27 23.606,65.675 22.979,65.089 22.366,64.487 21.171,63.252 20.023,61.974 18.856,60.718 L 17.192,58.755 C 16.64,58.099 16.08,57.451 15.57,56.76 l -1.533,-2.063 c -0.508,-0.689 -1.03,-1.366 -1.497,-2.084 -0.476,-0.712 -0.969,-1.41 -1.427,-2.132 L 10.419,49.404 9.769,48.299 C 7.999,45.38 6.405,42.361 5.045,39.246 2.292,33.036 0.303,26.53 -0.757,19.924 -0.906,19.104 -1.005,18.272 -1.099,17.441 -1.193,16.611 -1.304,15.789 -1.377,14.96 -1.475,14.137 -1.491,13.297 -1.542,12.47 -1.59,11.642 -1.613,10.812 -1.639,9.987 -1.668,8.332 -1.586,6.67 -1.528,5.032 -1.46,4.207 -1.361,3.381 -1.277,2.563 l 0.133,-1.225 0.172,-1.221 z" style="fill:#004F6B;fill-opacity:1;fill-rule:nonzero;stroke:none" transform="matrix(1.3333333,0,0,-1.3333333,57.170533,119.93213)"></path>
  </g></svg>`;
  const fronDataUri = 'url("data:image/svg+xml;charset=utf-8,'
    + encodeURIComponent(FROND_SVG.replace('currentColor', '#004F6B')) + '")';
  document.documentElement.style.setProperty('--ddpsc-frond-bg', fronDataUri);

  /* ---------- 2. Frond stamp at end of every article ----------
     Adds a small Frond mark to the bottom of .md-content article
     pages, separated by a hairline. Editorial signoff. */
  const stamp = () => {
    const article = document.querySelector('article.md-content__inner');
    if (!article || article.querySelector('.ddpsc-frond-stamp')) return;
    const div = document.createElement('div');
    div.className = 'ddpsc-frond-stamp';
    div.setAttribute('aria-hidden', 'true');
    div.innerHTML = `
      <hr style="border:0;border-top:1px solid var(--rule);margin:3rem 0 1.2rem;">
      <div style="display:flex;justify-content:center;padding:0 0 1.5rem;">
        <div style="width:36px;height:36px;color:var(--ddpsc-regal-blue);opacity:.55;">${FROND_SVG}</div>
      </div>`;
    article.appendChild(div);
  };

  /* ---------- 3. Section anchor hover affordance ----------
     Material adds # links to headings; we make them subtle and
     branded (vibrant green on hover). */
  const styleAnchors = () => {
    document.querySelectorAll('.md-typeset .headerlink').forEach(a => {
      a.style.color = 'var(--regal-blue-40)';
      a.style.transition = 'color 160ms';
    });
  };

  /* ---------- 4. Reading-progress strip ----------
     A 2px vibrant-green progress strip pinned to the top of the
     viewport that tracks scroll within the current article. */
  const progress = () => {
    if (document.getElementById('ddpsc-progress')) return;
    const bar = document.createElement('div');
    bar.id = 'ddpsc-progress';
    Object.assign(bar.style, {
      position: 'fixed', top: '0', left: '0',
      height: '2px', width: '0',
      background: 'var(--ddpsc-vibrant-green)',
      zIndex: '20',
      transition: 'width 80ms linear',
      pointerEvents: 'none',
    });
    document.body.appendChild(bar);
    const update = () => {
      const article = document.querySelector('article.md-content__inner');
      if (!article) { bar.style.width = '0'; return; }
      const rect = article.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const seen = -rect.top;
      const pct = total > 0 ? Math.max(0, Math.min(1, seen / total)) : 0;
      bar.style.width = (pct * 100).toFixed(2) + '%';
    };
    document.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  };

  /* ---------- 5. External-link affordance ----------
     Marks links that leave the docs site with a small ↗ glyph,
     so contributors and readers can tell. */
  const markExternal = () => {
    const host = window.location.hostname;
    document.querySelectorAll('article.md-content__inner a[href]').forEach(a => {
      try {
        const u = new URL(a.href, window.location.href);
        if (u.hostname && u.hostname !== host && !a.dataset.ddpscExt) {
          a.dataset.ddpscExt = '1';
          a.setAttribute('target', a.getAttribute('target') || '_blank');
          a.setAttribute('rel', (a.getAttribute('rel') || '') + ' noopener');
          const glyph = document.createElement('span');
          glyph.textContent = '↗';
          glyph.setAttribute('aria-hidden', 'true');
          glyph.style.cssText = 'font-size:0.85em;margin-left:0.2em;opacity:0.7;';
          a.appendChild(glyph);
        }
      } catch (_) { /* mailto:, tel:, etc. — ignore */ }
    });
  };

  /* ---------- 6. Smart copy attribution ----------
     When a reader copies text from the docs, append a citation
     line (URL + retrieved date) to the clipboard. Helpful for
     scientific docs that get pasted into manuscripts. */
  const smartCopy = () => {
    document.addEventListener('copy', (ev) => {
      const sel = document.getSelection();
      if (!sel || sel.isCollapsed) return;
      const text = sel.toString();
      if (text.length < 80) return; // only on substantive copies
      const url = window.location.href.split('#')[0];
      const today = new Date().toISOString().slice(0, 10);
      const cite = `\n\n— Donald Danforth Plant Science Center · ${url} (retrieved ${today})`;
      ev.clipboardData.setData('text/plain', text + cite);
      ev.preventDefault();
    });
  };

  /* ---------- 7. Material's instant-loading hook ----------
     Material's instant-navigation re-renders the inner DOM
     without a full reload; document$ is the official subscription
     point that fires once on initial load and after every
     subsequent navigation. Falls back to DOMContentLoaded. */
  const init = () => {
    stamp();
    styleAnchors();
    markExternal();
    progress();
  };

  if (typeof document$ !== 'undefined') {
    // Material instant-navigation
    document$.subscribe(init);
  } else if (document.readyState !== 'loading') {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }
  // smartCopy is one-shot — it attaches a global copy listener
  smartCopy();
})();
