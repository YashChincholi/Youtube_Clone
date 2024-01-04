import { Link } from "react-router-dom";
import { Stack } from "@mui/material";
import { logo } from "../utils/constant";
import SearchBar from "./SearchBar";

const Navbar = () => (
  <Stack
    direction="row"
    alignItems="center"
    p={2}
    sx={{
      justifyContent: "space-between",
      position: "sticky",
      backgroundColor: "#000",
      top: 0,
    }}
  >
    <Link to="/" style={{ display: "flex", alignItems: "center" }}>
      <img src={logo} alt="logo" height={45} />
    </Link>
    <SearchBar />
  </Stack>
);

export default Navbar;
