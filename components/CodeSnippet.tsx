import { ContentCopy } from "@mui/icons-material";
import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
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
    <>
      <Stack alignItems="center" justifyContent="space-between" direction="row">
        <Typography variant="h6">Code</Typography>
        <Tooltip title="Click to copy the snippet to the clipboard">
          <IconButton onClick={handleCopyTextToClipboard} size="large">
            <ContentCopy />
          </IconButton>
        </Tooltip>
      </Stack>
      <Stack
        sx={{
          p: 1,
          border: "solid 1px",
          flex: 1,
          overflowY: "auto",
          position: "relative",
        }}
      >
        <pre style={{ margin: 0 }}>
          <code>{code}</code>
        </pre>
      </Stack>
    </>
  );
}

export default CodeSnippet;
