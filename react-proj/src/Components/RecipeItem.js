import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material"

const RecipeItem = ({ item, onItemClick = () => {} }) => {
    return (
        <Card sx={{ width: 200, borderRadius: 10, height: 350 }}  onClick={() => onItemClick()}>
            <CardActionArea sx={{ width: 200, borderRadius: 10, height: 350, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                <CardMedia component='img' src={item.strMealThumb} alt={`Picture of ${item.strMeal}`} />
                <CardContent>
                    <Typography textOverflow="ellipsis" variant='h6' component='p'>{item.strMeal}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export { RecipeItem }