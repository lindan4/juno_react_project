import { Favorite } from "@mui/icons-material";
import { Card, CardActionArea, CardMedia, CardContent, Typography, IconButton } from "@mui/material";



const FavouriteItem = ({ item, onPress =  () => {}, removeFromFavourite = () => {} }) => {
    return (
        <Card key={item.mealId} sx={{ width: '70%' }}>
            <CardActionArea onClick={() => onPress()} >
                <CardContent sx={{ display: 'flex', flexDirection : 'row', justifyContent: 'stretch' }}>
                    <CardMedia width={50} height={50} component='img' src={item.strMealThumb} />
                    <CardContent>
                        <Typography>{item.strMeal}</Typography>
                    </CardContent>
                    <IconButton onClick={() => removeFromFavourite()}>
                        <Favorite sx={{ color: 'pink' }} />
                    </IconButton>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}


export { FavouriteItem }