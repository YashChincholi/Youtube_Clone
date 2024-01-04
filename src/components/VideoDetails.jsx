import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import ReactPlayer from "react-player";
import { CheckCircle } from "@mui/icons-material";
import { Videos, Loader } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const VideoDetails = () => {
  const { id } = useParams();
  const [videoDetails, setVideoDetails] = useState(null);
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) =>
      setVideoDetails(data.items[0])
    );
    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
      (data) => {
        setVideos(data.items);
      }
    );
  }, [id]);
  if (!videoDetails?.snippet) return <Loader />;
  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetails;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls={true}
            />
            <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: "#fff" }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${channelId}`}>
                <Typography
                  variant={{ sm: "subtitle1", md: "h6" }}
                  color="#fff"
                >
                  {channelTitle}
                  <CheckCircle
                    sx={{ color: "grey", ml: "5px", fontSize: "12px" }}
                  />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} Views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} Likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box
          justifyContent="center"
          alignItems="center"
          px={2}
          py={{ md: 1, xs: 5 }}
        >
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetails;
