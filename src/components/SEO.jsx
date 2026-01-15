// src/components/SEO.jsx
import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

const SITE_NAME = "Danilov";
const BASE_URL = "https://danilov.az";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.jpg`;

/**
 * SEO Component for managing meta tags, hreflang, and structured data
 */
export default function SEO({
  title,
  description,
  canonical,
  lang = "az",
  path = "",
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  schema = null,
  noIndex = false,
}) {
  // Generate canonical URL
  const canonicalUrl = canonical || `${BASE_URL}${path}`;

  // Generate hreflang links for all supported languages
  const hreflangLinks = [
    { hreflang: "az", href: `${BASE_URL}/az${path.replace(/^\/(az|ru|en)/, "")}` },
    { hreflang: "ru", href: `${BASE_URL}/ru${path.replace(/^\/(az|ru|en)/, "")}` },
    { hreflang: "en", href: `${BASE_URL}/en${path.replace(/^\/(az|ru|en)/, "")}` },
    { hreflang: "x-default", href: `${BASE_URL}/az${path.replace(/^\/(az|ru|en)/, "")}` },
  ];

  // Map language code to full locale
  const getLocale = (langCode) => {
    const locales = {
      az: "az_AZ",
      ru: "ru_RU",
      en: "en_US",
    };
    return locales[langCode] || "az_AZ";
  };

  return (
    <Helmet>
      {/* HTML Language */}
      <html lang={lang} />

      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Hreflang Links */}
      {hreflangLinks.map((link) => (
        <link
          key={link.hreflang}
          rel="alternate"
          hreflang={link.hreflang}
          href={link.href}
        />
      ))}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={getLocale(lang)} />
      {lang !== "az" && <meta property="og:locale:alternate" content="az_AZ" />}
      {lang !== "ru" && <meta property="og:locale:alternate" content="ru_RU" />}
      {lang !== "en" && <meta property="og:locale:alternate" content="en_US" />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data / JSON-LD */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  canonical: PropTypes.string,
  lang: PropTypes.oneOf(["az", "ru", "en"]),
  path: PropTypes.string,
  ogImage: PropTypes.string,
  ogType: PropTypes.string,
  schema: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  noIndex: PropTypes.bool,
};

export { BASE_URL, SITE_NAME, DEFAULT_OG_IMAGE };
