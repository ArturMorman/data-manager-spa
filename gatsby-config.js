
/** 
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {

  ////  PATH PREFIX
  pathPrefix: `/data-manager-spa`,

  siteMetadata: {
    title: `Digital VooDoo`,
    description: `Front App for headless Wordpress, works with Wordpress as CMS and DB, pure JS Fetch and custom WP REST Api endpoints.`,
    author: `Artur Morman DigitalVooDoo`,
    siteUrl: `http://artur.morman.com.pl/data-manager-spa`,

    wpSiteUrl: `http://morman.com.pl/data-manager-wp`,
    // wpSiteUrl: `http://web-projects-manager.local`,

    ////  WP REST API CONFIG
    wpRestApi: {
      pathBase: `/wp-json/wp/v2/`,
      singlePostCustomEndpoint: `amor_single`
    },
    ////  WP POSTS AND THEIR TAXONOMIES REAT API SLUGS
    wpContentTypes: {
      postType: 'ProjectsData',
      taxonomies: {
        singleChoice: [
          'clients',
          'productTypes'
        ],
        multiChoice: [
          'technologies',
          'languages'
        ]
      }
    },
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        cssLoaderOptions: {
          camelCase: false,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Digital VooDoo App`,
        short_name: `Digital VooDoo`,
        start_url: `/remote-app/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        // display: `browser`,
        display: `standalone`,
        icon: `src/images/dv.png`,
        lang: `pl`
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        appendScript: require.resolve(`./src/serviceWorker/custom-sw-code.js`),
      },
    },
  ],
}
