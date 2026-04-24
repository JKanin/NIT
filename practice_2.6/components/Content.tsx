import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import countries from "../data";
import CountryCard from "./CountryCard";
import Box from '@mui/material/Box';

const cardData = [countries[0], countries[1], countries[2], countries[3], countries[4], countries[5], countries[6], countries[7]];

function Content() {
	return (
		<Container maxWidth="xl" sx={{ py: 4 }}>
		<Grid container spacing={{ xs: 3, md: 6 }} sx={{ position: 'relative' }}>
			<Grid size={{ xs: 12, md: 4 }}>
			<Grid container spacing={{ xs: 3, md: 6 }}>
				<Grid size={{ xs: 12 }}>
				<CountryCard country={cardData[0]} index={0} />
				</Grid>
				<Grid size={{ xs: 12 }}>
				<CountryCard country={cardData[2]} index={2} />
				</Grid>
			</Grid>
			</Grid>

			<Grid size={{ xs: 12, md: 4 }}>
			<Grid container spacing={{ xs: 3, md: 6 }}>
				<Grid size={{ xs: 12 }}>
				<CountryCard country={cardData[1]} index={1} />
				</Grid>
				<Grid size={{ xs: 12 }}>
				<CountryCard country={cardData[3]} index={3} />
				</Grid>
			</Grid>
			</Grid>

			<Box sx={{display: { xs: 'none', md: 'block' },
					position: 'absolute',
					top: 0,
					bottom: 0,
					left: '67%',
					width: '3px',
					backgroundColor: 'black',
				}}
        	/>

			<Grid size={{ xs: 12, md: 4 }}>
			<Grid container spacing={{ xs: 2, md: 5 }}>
				<Grid size={{ xs: 12 }}>
				<CountryCard country={cardData[4]} index={4} />
				</Grid>
				<Grid size={{ xs: 12 }}>
				<CountryCard country={cardData[5]} index={5} />
				</Grid>
				<Grid size={{ xs: 12 }}>
				<CountryCard country={cardData[6]} index={6} />
				</Grid>
				<Grid size={{ xs: 12 }}>
				<CountryCard country={cardData[7]} index={7} />
				</Grid>
			</Grid>
			</Grid>

		</Grid>
		</Container>
	);
}

export default Content;