import { Box, Typography } from "@mui/material";
import AuthCard from "./AuthCard";

function AuthLayout({ title, subtitle, children }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg,#2563EB,#4F46E5)",
        px: 2,
      }}
    >
      <AuthCard>
        <Typography
          variant="h4"
          fontWeight="bold"
          align="center"
          gutterBottom
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          mb={3}
        >
          {subtitle}
        </Typography>

        {children}
      </AuthCard>
    </Box>
  );
}

export default AuthLayout;