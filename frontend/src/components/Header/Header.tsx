import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';


// import { MaterialUISwitch } from "./Styled/ThemeToggle";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {userAction} from "../../redux/slices/usersSlice";


const pages = ['Movies', 'Genres'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Header = () => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const dispatch = useAppDispatch();
    const [searchQuery, setSearchQuery] = useState('');
    // const themeMode = useAppSelector(state => state.theme.mode);

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

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(userAction.loadUsers());
    };

    return (
        <AppBar position="static" sx={{margin:0}}>
            <Container maxWidth="xl" sx={{padding:0}}>
                <Toolbar disableGutters sx={{padding:0}}>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to="/users"
                        sx={{
                            mr: 3,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        admin
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
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
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/*<Grid container alignItems="center" sx={{ flexGrow: 1 }}>*/}
                    {/*    {pages.map((page) => (*/}
                    {/*        <Grid item key={page} sx={{ mr: 2 }}>*/}
                    {/*            <Button*/}
                    {/*                component={Link}*/}
                    {/*                to={`/${page.toLowerCase()}`}*/}
                    {/*                onClick={handleCloseNavMenu}*/}
                    {/*                sx={{ color: 'red' }}*/}
                    {/*            >*/}
                    {/*                {page}*/}
                    {/*            </Button>*/}
                    {/*        </Grid>*/}
                    {/*    ))}*/}

                    {/*    <Grid item>*/}
                    {/*        <form onSubmit={handleSearchSubmit}>*/}
                    {/*            <Search>*/}
                    {/*                <SearchIconWrapper />*/}
                    {/*                <StyledInputBase*/}
                    {/*                    placeholder="Search…"*/}
                    {/*                    inputProps={{ 'aria-label': 'search' }}*/}
                    {/*                    value={searchQuery}*/}
                    {/*                    onChange={handleSearchChange}*/}
                    {/*                />*/}
                    {/*            </Search>*/}
                    {/*        </form>*/}
                    {/*    </Grid>*/}
                    {/*</Grid>*/}
                    {/*<Grid item>*/}
                    {/*    <MaterialUISwitch checked={themeMode === 'dark'} onChange={() => dispatch(themeActions.toggleTheme())} />*/}
                    {/*</Grid>*/}
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Sign Up" src="/static/images/avatar/2.jpg" />
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
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export { Header };