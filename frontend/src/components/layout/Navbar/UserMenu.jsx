import {
  Menu,
  MenuItem,
} from "@mui/material";

function UserMenu({
  anchorEl,
  open,
  onClose,
  authenticated,
  navigate,
  onLogout,
}) {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
    >
      {authenticated ? (
        [
          
          <MenuItem
            key="profile"
            onClick={() => {
              navigate("/profile");
              onClose();
            }}
          >
            Profile
          </MenuItem>,
          <MenuItem
    onClick={() => {
      navigate("/orders");
      onClose();
    }}
  >
    My Orders
  </MenuItem>,

          <MenuItem
            key="logout"
            onClick={() => {
              onLogout();
              onClose();
            }}
          >
            Logout
          </MenuItem>,
        ]
      ) : (
        [
          <MenuItem
            key="login"
            onClick={() => {
              navigate("/login");
              onClose();
            }}
          >
            Login
          </MenuItem>,

          <MenuItem
            key="register"
            onClick={() => {
              navigate("/register");
              onClose();
            }}
          >
            Register
          </MenuItem>,
        ]
      )}
    </Menu>
  );
}

export default UserMenu;