"use client";

import axios from "axios";

export default function Home() {
  const handleSingIn = async () => {
    const url = `https://api.instagram.com/oauth/authorize?client_id=${process.env.INSTAGRAM_CLIENT_ID}&redirect_uri=https://add-ig-content.vercel.app/&scope=user_profile,user_media&response_type=code`;

    const response = await axios.get(url, { withCredentials: true });

    console.log("Response: ", response);
  };

  return (
    <main>
      <button onClick={handleSingIn}>Sign In instagram</button>
    </main>
  );
}
