const { groq } = require("next-sanity");

// Consultas para obtener los slugs de categorías de posts
const allPostCategoriesQuery = groq`
  *[_type == "post_category"] {
    _id,
    title,
    slug
  }
`;

module.exports = { allPostCategoriesQuery };
