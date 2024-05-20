module.exports = {
    siteUrl: process.env.SITE_URL,
    generateRobotsTxt: true,
    exclude: ['/mypage'],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/mypage'],
            },
        ],
    },
}