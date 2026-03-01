import { motion } from 'framer-motion'

/**
 * DaliLogo — Blueprint-style Dali logo paths draping over a glowing sphere.
 * The paths are displaced upward near the sphere center using a radial
 * displacement map, simulating fabric draping over a ball.
 */

// Radial gradient displacement map centered on the sphere (102, 88).
// G channel goes from 0 at sphere center → 128 at edges.
// feDisplacementMap: Y offset = (G/255 - 0.5) * scale → negative near center = push up.
const _dispSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="150" height="126"><defs><radialGradient id="dg" cx="68%" cy="70%" r="28%"><stop offset="0%" stop-color="rgb(128,0,128)"/><stop offset="100%" stop-color="rgb(128,128,128)"/></radialGradient></defs><rect width="150" height="126" fill="url(#dg)"/></svg>`
const DISP_MAP_URI = `data:image/svg+xml;base64,${btoa(_dispSvg)}`

export default function DaliLogo({ className = '' }) {
  return (
    <motion.div
      className={className}
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 1.0 }}
    >
      <svg
        viewBox="0 0 150 126"
        fill="none"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Clip everything to the viewBox to prevent stray overflow */}
        <g clipPath="url(#dali-clip)">

        {/* Glowing sphere */}
        <g filter="url(#dali-sphere-filter)" opacity="0.3">
          <path
            d="M139.787 87.7898C139.787 108.5 122.998 125.29 102.287 125.29C81.5764 125.29 64.7871 108.5 64.7871 87.7898C64.7871 67.0791 81.5764 50.2898 102.287 50.2898C122.998 50.2898 139.787 67.0791 139.787 87.7898Z"
            fill="url(#dali-radial)"
          />
        </g>

        {/* Logo paths — displaced upward near sphere to simulate draping */}
        <g filter="url(#dali-drape-filter)" opacity="0.22">
          <path
            d="M4.48633 13.3395C6.78781 13.3489 9.33818 13.9175 11.5996 14.8297C13.8592 15.7412 15.8253 16.9939 16.9678 18.3688C16.9685 18.3701 16.9694 18.3723 16.9707 18.3746C16.9738 18.3802 16.9793 18.388 16.9854 18.399C16.9977 18.4213 17.0156 18.4549 17.04 18.4986C17.089 18.586 17.1625 18.7153 17.2588 18.8844C17.4514 19.2226 17.7373 19.719 18.1104 20.3502C18.8566 21.6128 19.9521 23.4164 21.3477 25.5807C24.1387 29.9092 28.132 35.6809 32.9404 41.4527C37.7487 47.2243 43.3728 52.998 49.4268 57.3287C55.4803 61.6591 61.9676 64.5504 68.5 64.5504C72.146 64.5504 74.1597 62.5822 76.6279 60.107C79.0965 57.6315 82.0283 54.6377 87.5176 52.5465C91.7661 50.928 95.0111 49.959 98.5039 49.691C101.997 49.423 105.741 49.8558 110.989 51.0484C121.473 53.4311 130.562 62.0345 134.457 68.526C138.355 75.0223 139.492 78.0963 139.95 83.0045C141.345 97.9551 134.249 116.378 116.772 121.742C110.871 123.553 106.605 123.519 103.384 122.238C100.163 120.957 97.9783 118.427 96.2461 115.227C94.5133 112.026 93.2366 108.162 91.8291 104.216C90.4224 100.273 88.8853 96.2519 86.6318 92.7467C82.1243 85.7353 77.1121 83.4763 73.2217 82.9742C71.2777 82.7234 69.6155 82.9108 68.4395 83.1617C67.8517 83.2871 67.3854 83.4288 67.0654 83.5387C66.9054 83.5937 66.7817 83.6409 66.6982 83.6744C66.6567 83.6911 66.6249 83.7043 66.6035 83.7135C66.5929 83.718 66.5846 83.7218 66.5791 83.7242L66.5771 83.7252H66.5762L66.5615 83.7301C66.5512 83.733 66.5356 83.7372 66.5156 83.7428C66.4751 83.7541 66.4153 83.7712 66.3379 83.7926C66.1826 83.8354 65.9561 83.8967 65.6738 83.9723C65.1093 84.1233 64.3193 84.3296 63.418 84.5504C61.6147 84.9921 59.3671 85.4918 57.585 85.7242C49.2491 86.8114 41.5035 83.1467 34.5703 77.0279C27.6373 70.9093 21.5219 62.3411 16.4492 53.6334C11.3767 44.926 7.3474 36.0811 4.58691 29.4137C3.20684 26.0804 2.1438 23.2913 1.42578 21.3356C1.06681 20.3578 0.794307 19.5881 0.611328 19.0631C0.519871 18.8007 0.450461 18.5992 0.404297 18.4635C0.381215 18.3956 0.364126 18.3437 0.352539 18.3092C0.346852 18.2923 0.341752 18.2797 0.338867 18.2711C0.337503 18.267 0.336659 18.2635 0.335938 18.2613C0.335576 18.2603 0.335142 18.259 0.334961 18.2584C0.161396 17.5113 0.0495633 16.8288 0.0498047 16.2262C0.0500916 15.6229 0.163492 15.1023 0.436523 14.6764C0.981552 13.8266 2.18104 13.3301 4.48633 13.3395ZM5.125 14.0084C3.16697 14.0004 2.01024 14.4297 1.47266 15.1949C0.968652 15.9127 1.02185 16.9073 1.43457 18.0631L1.52246 18.2965V18.2984C1.52318 18.3005 1.52497 18.3033 1.52637 18.3072C1.52925 18.3155 1.53333 18.3281 1.53906 18.3443C1.55063 18.3771 1.56785 18.4264 1.59082 18.4908C1.63686 18.6199 1.70579 18.8117 1.79688 19.0611C1.97919 19.5605 2.25137 20.2928 2.6084 21.2233C3.32257 23.0846 4.37901 25.7412 5.74707 28.9195C8.48312 35.276 12.4671 43.7233 17.458 52.0846C22.4487 60.4454 28.4475 68.7231 35.2148 74.7389C41.9821 80.7546 49.5235 84.5129 57.5957 83.8229C59.6831 83.6443 62.1888 82.7674 64.4805 81.8746C65.629 81.4272 66.7205 80.9771 67.6855 80.6061C68.6495 80.2355 69.4794 79.9469 70.0996 79.8229C74.8478 78.8732 78.4394 78.9287 81.6641 80.4986C84.8903 82.0695 87.7579 85.1603 91.0479 90.3004C92.6893 92.865 93.7998 96.1548 94.8545 99.5572C95.9084 102.957 96.9074 106.47 98.3262 109.468C99.7453 112.468 101.588 114.961 104.335 116.317C107.083 117.673 110.725 117.887 115.734 116.35C130.556 111.801 142.326 97.3752 139.049 80.9899C138.549 78.4927 138.298 76.9015 137.672 75.1666C137.045 73.4307 136.043 71.5512 134.042 68.4723C132.038 65.3887 128.481 61.5821 124.201 58.2604C119.921 54.9386 114.915 52.0989 110.012 50.9518C103.262 49.3727 94.552 49.4431 84.458 54.4547L83.4766 54.9557L83.4727 54.9576C79.968 57.2106 77.5062 59.6756 75.4033 61.6549C73.2975 63.6369 71.5584 65.1248 69.4922 65.4508C62.7973 66.5071 56.0929 64.0959 49.7988 59.8766C43.5051 55.6574 37.6267 49.6334 32.585 43.4752C27.5434 37.3172 23.3402 31.0264 20.3975 26.275C18.9262 23.8995 17.7697 21.909 16.9814 20.5123C16.5873 19.814 16.2856 19.2635 16.082 18.8883C15.9803 18.7009 15.9023 18.5575 15.8506 18.4606C15.8248 18.4121 15.806 18.3748 15.793 18.3502C15.7866 18.3382 15.7816 18.3291 15.7783 18.3229C15.7767 18.3198 15.7752 18.3166 15.7744 18.315L15.7734 18.3141C15.7732 18.3137 15.7728 18.3133 15.7285 18.3365L15.7744 18.3131L15.7676 18.3043L15.5752 18.0846C14.5754 16.99 12.9846 16.0043 11.1816 15.277C9.25786 14.5009 7.08721 14.0164 5.125 14.0084Z"
            stroke="var(--accent)"
            strokeWidth="0.4"
          />
          <path
            d="M111 51C121.618 43.0355 132.496 35.5756 137.306 32.1684C164.553 14.105 139.322 7.93179 105.764 8.70742C83.6717 9.21808 40.823 7.89912 26.7821 11.3732C20.0114 13.0485 18.0656 16.1217 21.7322 18.4786L22.8147 19.1735L23.0153 19.2985C27.2551 21.8544 36.826 22.6265 44.7461 21.0511L45.1285 20.9727L92.8496 15.6596L93.6046 15.5744C104.399 14.374 134.366 11.1687 138.001 15.5698L138.167 15.7808C141.501 20.1575 104.866 28.774 96.2723 31.7685L95.8541 31.9105L65.3392 40.8513L64.9425 41.0261C56.6682 44.7373 66.6364 53.4977 73.8797 55.8862L75.9672 56.5744L76.2657 56.6691C76.6184 56.7779 78.8884 57.3939 79.3 57.5M108.5 50.5C112.399 47.6337 118.396 43.6921 124.249 39.4823C126.13 38.1289 128.901 35.7933 135.841 31.2704C162.15 14.1242 137.627 8.80067 105.384 9.54595C94.8608 9.78921 85.0384 9.89885 71.643 10.113C59.8274 10.4055 34.9104 10.2708 27.9599 11.9906C22.2609 13.4008 20.5134 16.0159 23.704 18.0667L24.7842 18.7614C28.4191 21.0975 37.0767 21.7955 44.1061 20.3197L92.8477 14.6793C104.172 13.0445 135.823 10.1659 140.019 15.2446C144.207 20.3169 106.929 29.6345 96.6905 33.0367L66.4319 41.8793C59.0115 45.0707 68.8826 52.4929 75.2549 54.5942L77.5 55.5C78.1342 55.7091 79.6398 56.0986 80.5 56.3"
            stroke="var(--accent)"
            strokeWidth="0.4"
          />
        </g>
        </g>{/* end clip */}

        <defs>
          <clipPath id="dali-clip">
            <rect width="150" height="126"/>
          </clipPath>

          {/* Drape displacement filter — pushes paths upward near sphere center */}
          <filter id="dali-drape-filter" x="-5%" y="-20%" width="110%" height="140%" colorInterpolationFilters="sRGB">
            <feImage href={DISP_MAP_URI} result="dispMap" x="0" y="0" width="150" height="126" preserveAspectRatio="none"/>
            <feDisplacementMap in="SourceGraphic" in2="dispMap" scale="22" xChannelSelector="R" yChannelSelector="G"/>
          </filter>

          {/* Sphere texture filter */}
          <filter id="dali-sphere-filter" x="60.7871" y="46.2898" width="83" height="83" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feTurbulence type="fractalNoise" baseFrequency="0.999 0.999" numOctaves="3" seed="8615" result="displacementX" />
            <feTurbulence type="fractalNoise" baseFrequency="0.999 0.999" numOctaves="3" seed="8616" result="displacementY" />
            <feColorMatrix in="displacementX" type="matrix" values="0 0 0 1 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0 1" result="displacementXRed" />
            <feColorMatrix in="displacementY" type="matrix" values="0 0 0 0 0  0 0 0 1 0  0 0 0 0 0  0 0 0 0 1" />
            <feComposite in="displacementXRed" operator="arithmetic" k1="0" k2="1" k3="1" k4="0"/>
            <feDisplacementMap in="shape" scale="8" xChannelSelector="R" yChannelSelector="G" width="100%" height="100%" />
            <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" />
            <feComponentTransfer result="sourceDisplacedAlpha"><feFuncA type="gamma" exponent="0.2" /></feComponentTransfer>
            <feColorMatrix in="shape" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" />
            <feComponentTransfer result="inputSourceAlpha"><feFuncA type="gamma" exponent="0.2" /></feComponentTransfer>
            <feComposite in="sourceDisplacedAlpha" operator="arithmetic" k1="1" k2="0" k3="0" k4="0" result="displacementAlphasMultiplied"/>
            <feComposite in="displacementAlphasMultiplied" operator="arithmetic" k1="0" k2="0" k3="-0.5" k4="0.5" result="centeringAdjustment"/>
            <feComposite in="displacementX" in2="displacementAlphasMultiplied" operator="arithmetic" k1="1" k2="0" k3="0" k4="0" />
            <feComposite in="centeringAdjustment" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
            <feColorMatrix type="matrix" values="0 0 0 1 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0 1" result="displacementXFinal" />
            <feComposite in="displacementY" in2="displacementAlphasMultiplied" operator="arithmetic" k1="1" k2="0" k3="0" k4="0" />
            <feComposite in="centeringAdjustment" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
            <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 1 0  0 0 0 0 0  0 0 0 0 1" result="displacementYFinal" />
            <feComposite in="displacementXFinal" in2="displacementYFinal" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
            <feComposite in2="displacementAlphasMultiplied" operator="in" result="displacementMap" />
            <feFlood floodColor="rgb(127, 127, 127)" floodOpacity="1"/>
            <feComposite in2="displacementAlphasMultiplied" operator="out" />
            <feComposite in2="displacementMap" operator="over" result="displacementMapWithBg"/>
            <feDisplacementMap in="shape" scale="8" xChannelSelector="R" yChannelSelector="G" width="100%" height="100%" result="displacedImage" />
            <feColorMatrix in="shape" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 127 0" result="imageOpaque" />
            <feDisplacementMap in="imageOpaque" in2="displacementMapWithBg" scale="8" xChannelSelector="R" yChannelSelector="G" width="100%" height="100%" result="displacedImageOpaque" />
            <feColorMatrix in="displacedImage" type="matrix" values="0 0 0 1 0  0 0 0 0 0  0 0 0 0 0  0 0 0 127 0" result="displacedImageRed" />
            <feColorMatrix in="shape" type="matrix" values="0 0 0 1 0  0 0 0 0 0  0 0 0 0 0  0 0 0 127 0" />
            <feComposite in="displacedImageRed" operator="atop" result="transparencyRedMap"/>
            <feColorMatrix in="transparencyRedMap" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0" result="transparencyAlphaMap" />
            <feComposite in="displacedImageOpaque" in2="imageOpaque" operator="over" />
            <feComposite in2="transparencyAlphaMap" operator="in" result="effect1_texture_94_6"/>
          </filter>

          <radialGradient id="dali-radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(69.7871 50.2898) rotate(51.3905) scale(88.941)">
            <stop stopColor="#FFFBF5" stopOpacity="0"/>
            <stop offset="0.977471" stopColor="var(--accent)" stopOpacity="0.3"/>
          </radialGradient>
        </defs>
      </svg>
    </motion.div>
  )
}
