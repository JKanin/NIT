import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

function Footer() {
	return (
		<Box sx={{ py: 4}}>
		<Container maxWidth="xl">
			<Divider sx={{ borderColor: 'black', mb: 3 }} />
			<Box sx={{ textAlign: 'center'}}>
			<Typography variant="body2">
				2026, Б9123-09.03.04 (Программная инженерия), подгруппа 3, Ким Денис Х.
			</Typography>
			</Box>
		</Container>
		</Box>
	);
}

export default Footer;