module.exports = {
    siteUrl: "https://daily-swing.com",
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