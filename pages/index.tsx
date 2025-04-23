import React, { useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import Cookies from 'js-cookie';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const cookie = context.req.headers.cookie || '';

  const hasAccess = cookie.split(';').some((c: string) => c.trim().startsWith('video_access=granted'));

  if (hasAccess) {
    return {
      redirect: {
        destination: '/video',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const MainPage: NextPage = () => {
  const router = useRouter();
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const correctPassword = 'DeVil_RiNg@';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      Cookies.set('video_access', 'granted', { expires: 0.1667 });
      router.push('/video');
    } else {
      setError('รหัสผ่านไม่ถูกต้อง');
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="space-y-4 max-w-sm w-full">
        <h1 className="text-xl font-bold text-center">ใส่รหัสผ่านเพื่อดูวิดีโอ Devil Ring</h1>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            className="border w-full p-2 rounded pr-10"
            placeholder="รหัสผ่าน"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600"
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
        </div>
        <button className="bg-black text-white w-full py-2 rounded font-bold">
          ยืนยัน
        </button>
        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>
    </div>
  )
}

export default MainPage