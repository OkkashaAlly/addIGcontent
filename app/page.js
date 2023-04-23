"use client";

// import axios from "axios";
import { useSearchParams } from 'next/navigation';

export default function Home() {
  const searchParams = useSearchParams();

  const code = searchParams.get('code');

  console.log("code: ", code);
  
  const url = `https://api.instagram.com/oauth/authorize?client_id=${process.env.INSTAGRAM_CLIENT_ID}&redirect_uri=https://add-ig-content.vercel.app/&scope=user_profile,user_media&response_type=code`;

  const getToken = async () => {
    const response = await fetch(
      `https://api.instagram.com/oauth/access_token?client_id=${process.env.INSTAGRAM_CLIENT_ID}&client_secret=${process.env.INSTAGRAM_CLIENT_SECRET}&grant_type=authorization_code&redirect_uri=https://add-ig-content.vercel.app/&code=${code}`
    );

    const data = await response.json();

    console.log("data: ", data);
  };

  if (code) {
    getToken()
  }



  // const handleSingIn = async () => {
  //   console.log(
  //     "process.env.INSTAGRAM_CLIENT_ID: ",
  //     process.env.INSTAGRAM_CLIENT_ID
  //   );

  //   const response = await axios.get(url, { withCredentials: true });

  //   console.log("Response: ", response);
  // };

  return (
    <main>
      <h1>COde: {code}</h1>
      <a href={url}>Sign In instagram</a>
    </main>
  );
}
