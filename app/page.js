"use client";

import axios from "axios";
// import { useSearchParams } from "next/navigation";

export default function Home() {
  // const searchParams = useSearchParams();
  // const code = searchParams.get("code");
  
  const getData = async () => {
    const response = await axios.get(
      `https://graph.instagram.com/me/media?fields=id,media_type,media_url,permalink,caption&access_token=${process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN}`
    );

    console.log("data: ", response);
  };

  return (
    <main>
      <button onClick={getData}>Get user data</button>
    </main>
  );
}
