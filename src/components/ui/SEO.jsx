import { Helmet } from 'react-helmet-async'

const SITE_URL  = 'https://robjonesportfolio.vercel.app'
const OG_IMAGE  = `${SITE_URL}/images/og-image.jpg`
const TWITTER   = '@robjonesdesigns'

export default function SEO({ title, description, canonical, ogImage }) {
  const fullTitle   = title ? `${title} — Rob Jones` : 'Rob Jones — Product Designer'
  const metaDesc    = description ?? 'UX & Product Designer with 5+ years across enterprise SaaS and 0→1 startups. Currently available for new roles.'
  const metaImage   = ogImage ?? OG_IMAGE
  const metaUrl     = canonical ? `${SITE_URL}${canonical}` : SITE_URL

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />
      <link rel="canonical" href={metaUrl} />

      {/* Open Graph */}
      <meta property="og:type"        content="website" />
      <meta property="og:url"         content={metaUrl} />
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:image"       content={metaImage} />

      {/* Twitter */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:site"        content={TWITTER} />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image"       content={metaImage} />
    </Helmet>
  )
}
