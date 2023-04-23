"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();

  const code = searchParams.get("code");

  console.log("code: ", code);
  console.log(
    "process.env.INSTAGRAM_CLIENT_ID: ",
    process.env.INSTAGRAM_CLIENT_ID
  );
  console.log(
    "process.env.INSTAGRAM_CLIENT_SECRET: ",
    process.env.INSTAGRAM_CLIENT_SECRET
  );

  const url = `https://api.instagram.com/oauth/authorize?client_id=${process.env.INSTAGRAM_CLIENT_ID}&redirect_uri=https://add-ig-content.vercel.app/&scope=user_profile,user_media&response_type=code`;

  const getToken = async () => {
    const response = await axios.post(
      `https://api.instagram.com/oauth/access_token?client_id=${process.env.INSTAGRAM_CLIENT_ID}&client_secret=${process.env.INSTAGRAM_CLIENT_SECRET}&grant_type=authorization_code&redirect_uri=https://add-ig-content.vercel.app/&code=${code}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const data = await response.json();

    console.log("data: ", data);
  };

  return (
    <main>
      {!code ? (
        <a href={url}>Sign In instagram</a>
      ) : (
        <button onClick={getToken}>Get token</button>
      )}
    </main>
  );
}
