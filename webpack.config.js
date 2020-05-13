const path = require('path');

module.exports = {
    entry: './package.js',//entry：是我們的進入點，現在指定路徑是 index.js
    output: {
        filename: 'package.bundle.js',
        path: path.resolve(__dirname, './dist'),
    }//output：打包輸出後的檔案，檔名在index後面加了個bundle，來確認它是打包過後的檔案。
};
module.exports = {
    module: {
        rules: [
            // 編譯 css 檔案設定
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            // 編譯 scss 檔案設定
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    }
};``