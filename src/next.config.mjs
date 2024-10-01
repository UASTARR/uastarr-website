/** @type {import('next').NextConfig} */
export default {
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
        ]
    },
};

export async function redirects() {
    return [
        {
            source: '/join',
            destination: 'https://forms.gle/rjTRr46NLjMoaXFMA',
            permanent: true,
        },
    ]
}

