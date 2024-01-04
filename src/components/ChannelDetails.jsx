import React, { useEffect, useState } from "react";
import { Videos, ChannelCard } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

const ChannelDetails = () => {
  const [channelDetails, setChannelDetails] = useState();
  const [videos, setVideos] = useState([]);
  const { id } = useParams();
  console.log(channelDetails, videos);
  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`).then((data) => {
      setChannelDetails(data?.items[0]);
    });
    fetchFromAPI(`search?channelId=${id}&part=snippet%2Cid&order=date`).then(
      (data) => {
        setVideos(data?.items);
      }
    );
  }, [id]);

  return (
    <Box minHeight="95vh">
      <Box>
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(220,218,19,1) 0%, rgba(6,248,156,1) 50%, rgba(255,0,201,1) 100%)",
            zIndex: 10,
            height: "200px",
          }}
        />

        <ChannelCard channelDetail={channelDetails} marginTop={"-110px"} />
      </Box>
      <Box display="flex" p={2}>
        <Box sx={{ mr: { sm: "100px" } }} />
        <Videos videos={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetails;
