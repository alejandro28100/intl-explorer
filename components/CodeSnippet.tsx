import { ContentCopy } from "@mui/icons-material";
import { IconButton, Stack, Tooltip } from "@mui/material";

interface CodeSnippetProps {
  code: string;
}

function CodeSnippet(props: CodeSnippetProps) {
  const { code } = props;

  function handleCopyTextToClipboard() {
    return navigator.clipboard.writeText(code);
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
