import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Drawer from '@mui/material/Drawer';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import React from 'react';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	flexShrink: 0,
	borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
	border: '1px solid',
	borderColor: theme.palette.divider,
	padding: '8px 12px',
  }));

interface ComponentProps {
	active: string;
	onNavigate?: (page: string) => void;
}

function Navbar({ active = '1', onNavigate } : ComponentProps) {
	const [open, setOpen] = React.useState(false);
	const toggleDrawer = (newOpen: boolean) => () => {
	  setOpen(newOpen);
	};
	const isActive = (page: string) => active === page;
	const handleClick = (page: string) => onNavigate?.(page);
	
	return (
		<AppBar position="static" sx={{ boxShadow: 0, bgcolor: 'transparent', mt: '28px'}}>
			<Container maxWidth="xl">
				<StyledToolbar>
				<Typography variant="h6" sx={{ color: '#5d8aa8' }}>
					Страны мира
				</Typography>

				<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
					<Button variant={isActive('1') ? 'contained' : 'text'} color="info" size="medium" 
					onClick={() => handleClick('1')}>
						Главная
					</Button>
					<Button variant={isActive('2') ? 'contained' : 'text'} color="info" size="medium"
					onClick={() => handleClick('2')}>
						Континенты
					</Button>
					<Button variant={isActive('3') ? 'contained' : 'text'} color="info" size="medium"
					onClick={() => handleClick('3')}>
						Список стран мира
					</Button>
				</Box>

				<Box 
					sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', justifyContent: 'flex-end'}}
					component="form">
					<TextField size="small" placeholder="Название страны" sx={{ width: '250px' }} />
					<Button variant="contained" color="info" type="submit" size="small">
						Найти
					</Button>
				</Box>

				<Box sx={{ display: { xs: 'flex', md: 'none' }}}>    
					<IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
						<MenuIcon />
					</IconButton>
					<Drawer anchor="top" open={ open } onClose={toggleDrawer(false)}>
					<Box>               
						<Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
						<IconButton onClick={toggleDrawer(false)}>
							<CloseRoundedIcon />
						</IconButton>
						</Box>
						<MenuList>
							<MenuItem 
							sx={{bgcolor: isActive('1') ? 'info.main' : 'transparent', '&:hover': { bgcolor: 'lightblue' }}}
							onClick={() => handleClick('1')}>
								Главная
							</MenuItem>
							<MenuItem 
							sx={{bgcolor: isActive('2') ? 'info.main' : 'transparent', '&:hover': { bgcolor: 'lightblue' }}}
							onClick={() => handleClick('2')}>
								Континенты
							</MenuItem>
							<MenuItem 
							sx={{bgcolor: isActive('3') ? 'info.main' : 'transparent','&:hover': { bgcolor: 'lightblue' }}}
							onClick={() => handleClick('3')}>
								Список стран мира
							</MenuItem>  
						</MenuList>
					</Box>
					</Drawer>
				</Box>
				</StyledToolbar>
			</Container>  
		</AppBar>
	);
}
export default Navbar;