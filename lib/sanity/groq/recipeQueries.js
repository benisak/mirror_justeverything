const { groq } = require("next-sanity");

const allRecipeSlugsQuery = groq`
*[_type == "recipe" && (isHidden == false || isHidden == null)] {
    slug
}
`;

module.exports = { allRecipeSlugsQuery };
