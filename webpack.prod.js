import {merge} from 'webpack-merge';
import common from './webpack.config.js';

export default merge(common, {
    mode: 'production',
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
});