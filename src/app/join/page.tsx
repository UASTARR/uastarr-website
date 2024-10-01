import React from 'react'

import { Metadata } from 'next';
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
    title: "Join Us",
};

const JoinPage = () => {
    redirect('https://forms.gle/rjTRr46NLjMoaXFMA')
}

export default JoinPage;