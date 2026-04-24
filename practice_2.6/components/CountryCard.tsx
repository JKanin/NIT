import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const StyledTypography = styled(Typography)(({ theme }) => ({
	color: theme.palette.text.secondary,
	textAlign: 'justify',
	marginBottom: '10px',
}));

interface ComponentProps {
	country: {
		img: string;
		title: string;
		description: string[];
	};
	index: number;
}

function CountryCard({ country, index }: ComponentProps) {
	const isEven = index % 2 === 0;
	const isRightCard = index > 3;

	if (isRightCard) {
		return (
		<Card sx={{ 
			display: 'flex', 
			height: '100%',
			flexDirection: { xs: 'column', md: 'row' }
		}}>
			<Box sx={{ order: { xs: 2, md: 1 } }}>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{country.title}
				</Typography>
				{country.description.map((item, ind) => (
					<StyledTypography key={ind} variant="body2">
						{item}
					</StyledTypography>
				))}
			</CardContent>

			<CardActions sx={{ p: 2, pt: 0 }}>
				<Button size="small">
					Подробнее
				</Button>
			</CardActions>
			</Box>
			<CardMedia 
				component="img" 
				alt={country.title} 
				image={country.img} 
				sx={{ width: { xs: '100%', md: '35%' },
				}}
			/>
		</Card>
		);
	}

	return (
		<Card>
		{!isEven && (
			<>
			<CardMedia component="img" alt={country.title} image={country.img} sx={{ height: 250}}/>
			
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{country.title}
				</Typography>

				{country.description.map((item, ind) => (
				<StyledTypography key={ind} variant="body2">
					{item}
				</StyledTypography>
				))}
			</CardContent>

			<CardActions sx={{ p: 2, pt: 0 }}>
				<Button size="small">
					Подробнее
				</Button>
			</CardActions>
			</>
		)}
		{isEven && (
			<>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{country.title}
				</Typography>

				{country.description.map((item, ind) => (
					<StyledTypography key={ind} variant="body2">
						{item}
					</StyledTypography>
				))}
			</CardContent>

			<CardMedia component="img" alt={country.title} image={country.img} sx={{ height: 250}}/>

			<CardActions sx={{ p: 2, pt: 0 }}>
				<Button size="small">
					Подробнее
				</Button>
			</CardActions>
			</>
		)}
		</Card>
	);
}

export default CountryCard;