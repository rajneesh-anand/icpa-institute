import React from "react";
import PlayList from "@components/course/playlist";
import Container from "@components/ui/container";
import Layout from "@components/layout";

function text({ data }) {
  return (
    <Container>
      <PlayList mediaData={data} />
    </Container>
  );
}
text.Layout = Layout;

export default text;

export const getServerSideProps = async (ctx) => {
  const YOUTUBE_PLAYLIST_ITEMS_API =
    "https://www.googleapis.com/youtube/v3/playlistItems";

  const res = await fetch(
    `${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&maxResults=50&playlistId=UU0fQiGRmQuOjj_o_FoAH05A&key=${process.env.YOUTUBE_API_KEY}`
  );

  const data = await res.json();

  return {
    props: { data },
  };
};
