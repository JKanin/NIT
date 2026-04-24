import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import countries from "../data";

const imgData = countries.slice(0, 9);

function Gallery() {
	const isSmall = useMediaQuery(useTheme().breakpoints.down('sm'));

	return (
		<Container maxWidth="lg">
		<Box>
			<ImageList
			variant={isSmall ? "masonry" : "quilted"}
			gap={8}
			cols={isSmall ? 1 : 4}
			rowHeight={200}
			sx={{...(isSmall && { columnCount: '1 !important' })}}>
			{imgData.map((item, index) => {
				let cols = 1;
				let rows = 1;
				if (!isSmall) {
				if (index === 0) cols = 2;
					else if (index === 1 || index === 2) cols = 1;
					else if (index === 3 || index === 4) cols = 1;
					else if (index === 5) cols = 2;
					else if (index === 6) cols = 2;
					else if (index === 7) cols = 1;
				}

				return (
					<ImageListItem key={item.img} cols={cols} rows={rows}>
						<img src={item.img} alt={item.title} loading="lazy"/>
						<ImageListItemBar position="bottom" title={item.title} />
					</ImageListItem>
				);
			})}
			</ImageList>
		</Box>
		</Container>
	);
}

export default Gallery;