
require("dotenv").config({
  path: `.env.production`,
})

module.exports = {
  siteMetadata: {
    title: 'Blog - Orchid',
    description:
      'Your VPN should be secure, which is why Orchid is building with open source tools for custom VPN configurations and privacy services.',
    siteUrl: (process.env.TARGET_LANG === "en" || !process.env.TARGET_LANG) ? 'https://blog.orchid.com/' : `https://blog.${process.env.TARGET_LANG}.orchid.com/`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Blog - Orchid`,
        short_name: `Orchid`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#5f45ba`,
        display: `standalone`,
        icon: `static/img/favicon.png`,
      },
    },
    `gatsby-plugin-catch-links`,
    'gatsby-plugin-react-helmet',
    `gatsby-plugin-force-trailing-slashes`,
    `gatsby-plugin-offline`,
    'gatsby-plugin-sass',
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'uploads',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },
    `gatsby-plugin-emotion`,
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'uploads',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    /*{
      resolve: 'gatsby-plugin-purgecss', // purges all unused/unreferenced css rules
      options: {
        develop: true, // Activates purging in npm run develop
        purgeOnly: ['/all.css'], // applies purging only on the bulma css file
      },
    }, // must be after other CSS plugins*/

    {
      resolve: `gatsby-plugin-advanced-sitemap`,
      options: {
        query: ``,
        mapping: {
        },
        exclude: [
          `/dev-404-page`,
          `/404`,
          `/404.html`,
          `/offline-plugin-app-shell-fallback`,
        ],
        createLinkInHead: true,
        addUncaughtPages: true,
      },
    },
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
}
