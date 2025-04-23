import { useWindowDimensions } from '@/components/useWindowDimensions';
import { GetServerSideProps, NextPage } from 'next'
import React from 'react'

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const cookie = context.req.headers.cookie || '';

    const hasAccess = cookie.split(';').some((c: string) => c.trim().startsWith('video_access=granted'));

    if (!hasAccess) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};

const VideoPage: NextPage = () => {
    const { width } = useWindowDimensions();
    return (
        <div className="flex flex-col items-center justify-center h-screen px-4">
            <h2 className="text-lg mb-4 text-center font-semibold">🎬 คลาสเรียนมายากล Devil Ring</h2>
            <p className="text-lg mb-4 text-center  text-red-600">ห้ามนำไปเผยแพร่ในที่สาธารณะเด็ดขาด {width < 640 && <br />} มีลิขสิทธิ์จาก De vo </p>
            <div className="relative w-[80%] sm:w-[50%] max-w-xl mx-auto" >
                <iframe
                    className="w-full h-[60vh]"
                    src="https://www.youtube.com/embed/a36teF80R00"
                    title="คลาสเรียนมายากล Devil Ring"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    rel="0"
                    frameBorder="0"
                />
            </div>
        </div>
    )
}

export default VideoPage