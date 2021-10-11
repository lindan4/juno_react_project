import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material"

const RecipeItem = ({ item, onItemClick = () => {} }) => {
    return (
        <Card sx={{ width: 200 }}  onClick={() => onItemClick()}>
            <CardActionArea>
                <CardMedia component='img' src={item.strMealThumb} />
                <CardContent>
                    <Typography variant='h5' component='h6'>{item.strMeal}</Typography>
                    {/* Add favourite button */}
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export { RecipeItem }