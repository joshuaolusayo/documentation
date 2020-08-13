var plugins = [{
      plugin: require('/Users/mac/Desktop/Codes/Documentation/reactjs.org-master/node_modules/gatsby-plugin-glamor/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/mac/Desktop/Codes/Documentation/reactjs.org-master/plugins/gatsby-remark-header-custom-ids/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/mac/Desktop/Codes/Documentation/reactjs.org-master/node_modules/gatsby-plugin-google-analytics/gatsby-ssr'),
      options: {"plugins":[],"trackingId":"UA-41298772-1"},
    },{
      plugin: require('/Users/mac/Desktop/Codes/Documentation/reactjs.org-master/node_modules/gatsby-plugin-feed/gatsby-ssr'),
      options: {"plugins":[],"query":"\n         {\n          site {\n            siteMetadata {\n              title: rssFeedTitle\n              description: rssFeedDescription\n              siteUrl\n              site_url: siteUrl\n            }\n          }\n        }","feeds":[{"query":"\n              {\n                  allMarkdownRemark\n                  (limit: 10,\n                  filter: {fileAbsolutePath: {regex: \"/blog/\"}},\n                  sort: {fields: [fields___date],\n                  order: DESC}) {\n                    edges {\n                      node {\n                        fields {\n                          date\n                          slug\n                        }\n                        frontmatter {\n                          title\n                        }\n                        html\n                      }\n                    }\n                  }\n                }\n            ","output":"/feed.xml"}]},
    },{
      plugin: require('/Users/mac/Desktop/Codes/Documentation/reactjs.org-master/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/mac/Desktop/Codes/Documentation/reactjs.org-master/node_modules/gatsby-plugin-manifest/gatsby-ssr'),
      options: {"plugins":[],"name":"React Docs","short_name":"React","lang":"en","start_url":"/","background_color":"#20232a","theme_color":"#20232a","display":"standalone","icon":"static/logo-512x512.png","legacy":true,"cache_busting_mode":"query","include_favicon":true,"theme_color_in_head":true,"cacheDigest":"f4d46f030265b4c48a05c999b8d93791"},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
