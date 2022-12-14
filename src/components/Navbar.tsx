import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import FireplaceIcon from '@mui/icons-material/Fireplace';
import { useAppSelector } from '../hooks';
import { login, logout } from '../controllers/user.controller';
import { NavLink, useNavigate } from 'react-router-dom';

interface Link {
  title: string;
  path?: string;
  handler?: React.MouseEventHandler;
};

const Navbar: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const settings: Link[] = [
    { title: 'Profile', path: '/profile' },
    { title: 'Logout', handler: () => logout() }
  ];

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" id="navbar">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <FireplaceIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <NavLink to='/'>
            <Typography
              variant="h6"
              noWrap
              component="span"
              onClick={() => navigate('/')}
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.15rem',
                color: 'inherit',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              BOILERPLATE
            </Typography>
          </NavLink>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}>
              {/* {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))} */}
            </Menu>
          </Box>
          <FireplaceIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <NavLink to='/'>
            <Typography
              variant="h5"
              noWrap
              component="span"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.15rem',
                color: 'inherit',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              BOILERPLATE
            </Typography>
          </NavLink>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))} */}
          </Box>
          {user
            ? <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={user !== null && user.displayName !== null
                      ? user.displayName
                      : undefined}
                    src={user !== null && user.photoURL !== null
                      ? user.photoURL : './assets/avatar-blank.png'} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting.title} onClick={(e) => {
                    handleCloseUserMenu();
                    if (setting.handler) setting.handler(e);
                  }}>
                    {setting.path
                      ? <NavLink to={setting.path}>
                        <Typography sx={{
                          color: 'white',
                          textDecoration: 'none',
                        }} textAlign="center">{setting.title}</Typography>
                      </NavLink>
                      : <Typography textAlign="center">{setting.title}</Typography>
                    }
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            : <MenuItem onClick={login}>Login</MenuItem>}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
