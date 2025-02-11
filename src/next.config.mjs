// @ts-check

/**
* @type {import('next').NextConfig}
*/
export default (phase, { defaultConfig }) => {
    return {
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
                    destination: 'https://forms.gle/rjTRr46NLjMoaXFMA',
                    permanent: true,
                },
            ]
        },
    };
};