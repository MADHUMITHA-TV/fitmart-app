import { Card, CardContent } from "@mui/material";

function AuthCard({ children }) {
  return (
    <Card
      elevation={8}
      sx={{
        width: "100%",
        maxWidth: 450,
        borderRadius: 4,
        p: 2,
      }}
    >
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}

export default AuthCard;