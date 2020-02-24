module.exports = {
    // 输出到哪个文件夹，没有自动创建
    outputDir: __dirname + '/../server/admin',
    // 是否带前缀，公共路径
    publicPath: process.env.NODE_ENV === 'production' ? '/admin' : '/'
}