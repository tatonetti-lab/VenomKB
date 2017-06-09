const imagesContext = require.context(
    '!!file-loader?name=[name].[ext]!.',
    true,
    /\.(svg|png|ico|xml|json)$/
);

imagesContext.keys().forEach(imagesContext);
