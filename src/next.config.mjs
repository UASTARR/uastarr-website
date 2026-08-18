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
                    destination: 'https://forms.gle/4ds4ACGLKkrwFAAJ9',
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
