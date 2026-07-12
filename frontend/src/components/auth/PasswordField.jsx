import { useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function PasswordField({
  label,
  register,
  name,
  error,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      fullWidth
      margin="normal"
      label={label}
      type={showPassword ? "text" : "password"}
      {...register(name)}
      error={!!error}
      helperText={error?.message}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() =>
                setShowPassword(!showPassword)
              }
              edge="end"
            >
              {showPassword ? (
                <VisibilityOff />
              ) : (
                <Visibility />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default PasswordField;