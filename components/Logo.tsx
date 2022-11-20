import { Explore } from "@mui/icons-material";
import { Stack, Icon, Typography } from "@mui/material";

function Logo() {
  return (
    <Stack flex="1" direction="row" spacing={2}>
      <Icon>
        <Explore />
      </Icon>
      <Typography
        variant="h6"
        sx={{
          cursor: "default",
        }}
      >
        Intl Explorer
      </Typography>
    </Stack>
  );
}

export default Logo;
