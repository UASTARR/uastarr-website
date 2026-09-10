// @ts-check

/**
* @type {import('next').NextConfig}
*/
export default (phase, { defaultConfig }) => {
    return {
        cacheComponents: true,
        images: {
            remotePatterns: [
                {
                    protocol: 'https',
                    hostname: 'static.wixstatic.com',
                    pathname: '**',
                },
                {
                    protocol: 'https',
                    hostname: 'firebasestorage.googleapis.com',
                    pathname: '**',
                },
                {
                    protocol: 'https',
                    hostname: 'drive.google.com',
                    pathname: '**',
                },
            ]
        },
        redirects: async () => {
            return [
                {
                    source: '/join',
                    destination: 'https://docs.google.com/forms/d/e/1FAIpQLSfE1OcHA_KgcEfORc2od4RhBmEpq4Bf3K6TuKXuwQwaHSUrSg/viewform?usp=dialog',
                    permanent: false,
                },
                {
                    source: '/wiki',
                    destination: process.env.NEXT_PUBLIC_SITE_URL ? `https://wiki.${process.env.NEXT_PUBLIC_SITE_URL}` : '/down-for-maintenance',
                    permanent: false,
                },
                {
                    source: '/blogs',
                    destination: process.env.NEXT_PUBLIC_SITE_URL ? `https://blogs.${process.env.NEXT_PUBLIC_SITE_URL}` : '/down-for-maintenance',
                    permanent: false,
                }
            ]
        },
    };
};
