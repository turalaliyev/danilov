// src/seo/schema.js
// JSON-LD Structured Data for SEO

const BASE_URL = "https://danilov.az";

/**
 * Organization Schema - appears on all pages
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Danilov",
  alternateName: "Danilov Shoes",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  description:
    "Premium handmade leather shoes from Baku, Azerbaijan. Classic, derby, oxford, loafers and more for men and women since 2010.",
  foundingDate: "2010",
  foundingLocation: {
    "@type": "Place",
    name: "Baku, Azerbaijan",
  },
  sameAs: [
    "https://www.instagram.com/danilov_baku",
    "https://www.tiktok.com/@danilov_baku",
    "https://wa.me/994556746674",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+994-55-674-66-74",
    contactType: "customer service",
    availableLanguage: ["Azerbaijani", "Russian", "English"],
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Baku",
    addressCountry: "AZ",
  },
};

/**
 * LocalBusiness Schema - for contact/store pages
 */
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ShoeStore",
  "@id": `${BASE_URL}/#business`,
  name: "Danilov",
  image: `${BASE_URL}/og-image.jpg`,
  url: BASE_URL,
  telephone: "+994556746674",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Baku",
    addressLocality: "Baku",
    addressCountry: "AZ",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 40.4093,
    longitude: 49.8671,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "20:00",
    },
  ],
  sameAs: [
    "https://www.instagram.com/danilov_baku",
    "https://www.tiktok.com/@danilov_baku",
  ],
};

/**
 * Website Schema - for homepage
 */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  name: "Danilov",
  url: BASE_URL,
  description: "Premium handmade leather shoes from Baku, Azerbaijan",
  publisher: {
    "@id": `${BASE_URL}/#organization`,
  },
  inLanguage: ["az", "ru", "en"],
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/az/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

/**
 * Generate Breadcrumb Schema
 * @param {Array} items - Array of { name, url } objects
 * @returns {object} BreadcrumbList schema
 */
export function generateBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate Product Schema
 * @param {object} product - Product data
 * @param {string} lang - Language code
 * @returns {object} Product schema
 */
export function generateProductSchema(product, lang = "az") {
  if (!product) return null;

  const productTitle =
    lang === "az"
      ? product.title_az || product.title_en
      : lang === "ru"
        ? product.title_ru || product.title_en
        : product.title_en || product.title_az;

  const productDescription =
    lang === "az"
      ? product.description_az || product.description_en
      : lang === "ru"
        ? product.description_ru || product.description_en
        : product.description_en || product.description_az;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productTitle,
    description: productDescription || `${productTitle} - Premium handmade shoe from Danilov`,
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: "Danilov",
    },
    offers: {
      "@type": "Offer",
      url: `${BASE_URL}/${lang}/product/${product.sku}`,
      priceCurrency: "AZN",
      price: product.price || 0,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Danilov",
      },
    },
    manufacturer: {
      "@type": "Organization",
      name: "Danilov",
      url: BASE_URL,
    },
  };
}

/**
 * Generate ItemList Schema for category pages
 * @param {Array} products - Array of products
 * @param {string} lang - Language code
 * @param {string} categoryName - Category name
 * @returns {object} ItemList schema
 */
export function generateItemListSchema(products, lang = "az", categoryName = "Shoes") {
  if (!products || !products.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: categoryName,
    numberOfItems: products.length,
    itemListElement: products.slice(0, 10).map((product, index) => {
      const productTitle =
        lang === "az"
          ? product.title_az || product.title_en
          : lang === "ru"
            ? product.title_ru || product.title_en
            : product.title_en || product.title_az;

      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: productTitle,
          url: `${BASE_URL}/${lang}/product/${product.sku}`,
        },
      };
    }),
  };
}

/**
 * Combine multiple schemas into a graph
 * @param {...object} schemas - Schema objects to combine
 * @returns {object} Combined schema graph
 */
export function combineSchemas(...schemas) {
  const validSchemas = schemas.filter(Boolean);
  if (validSchemas.length === 0) return null;
  if (validSchemas.length === 1) return validSchemas[0];

  return {
    "@context": "https://schema.org",
    "@graph": validSchemas.map((schema) => {
      // Remove @context from individual schemas when combining
      const { "@context": _, ...rest } = schema;
      return rest;
    }),
  };
}
