import { useAppStore } from "@lib/store/app";
import { Box, Button, Flash } from "@primer/react";

function AppFlash() {
  const appFlash = useAppStore((s) => s.flash);
  const setFlash = useAppStore((s) => s.setFlash);
  const close = () => setFlash();

  return (
    <>
      {appFlash && (
        <Flash variant={appFlash.severity}>
          <Box display="flex" alignItems="center" p={2} position="relative">
            <Box maxWidth={"80%"} textAlign="center" marginX="auto">
              {appFlash.message}
            </Box>
            <Box position={"absolute"} right={0}>
              <Button
                onClick={close}
                size="small"
                variant="invisible"
                sx={{ color: "fg.default" }}
              >
                &times;
              </Button>
            </Box>
          </Box>
        </Flash>
      )}
    </>
  );
}
export default AppFlash;
