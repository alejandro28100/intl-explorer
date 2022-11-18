import { ContentCopy } from "@mui/icons-material";
import { IconButton, Stack, Tooltip } from "@mui/material";
import { useSnackbar } from "notistack";

interface CodeSnippetProps {
  code: string;
}

function CodeSnippet(props: CodeSnippetProps) {
  const { code } = props;
  const { enqueueSnackbar } = useSnackbar();

  async function handleCopyTextToClipboard() {
    try {
      await navigator.clipboard.writeText(code);
      enqueueSnackbar("Copied to clipboard", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Copying to clipboard not supported :( ", {
        variant: "error",
      });
    }
  }
  return (
    <Stack sx={{ position: "relative", width: "100%", height: "100%" }}>
      <Tooltip title="Click to copy the snippet to the clipboard">
        <IconButton
          onClick={handleCopyTextToClipboard}
          size="large"
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
          }}
        >
          <ContentCopy />
        </IconButton>
      </Tooltip>
      <pre>
        <code>{code}</code>
      </pre>
    </Stack>
  );
}

export default CodeSnippet;
