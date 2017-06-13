const imagesContext = require.context(
    '!!file-loader?name=[name].[ext]!.',
    true,
    /\.(svg|png|ico|xml|json)$/
);

imagesContext.keys().forEach(imagesContext);

const ratingImagesContext = require.context(
    '!!file-loader?name=./ratings/[name].[ext]!.',
    true,
    /\.(png|svg)$/
);

ratingImagesContext.keys().forEach(ratingImagesContext);
