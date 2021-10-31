import { Favorite } from "@mui/icons-material";
import { Card, CardActionArea, CardMedia, CardContent, Typography, IconButton } from "@mui/material";

const FavouriteItem = ({ item, onPress =  () => {}, removeFromFavourite = () => {} }) => {
    return (
        <Card key={item.mealId} sx={{ width:  250, height: 350 }}>
            <CardActionArea onClick={() => onPress()} >
                <CardContent sx={{ display: 'flex', flexDirection : 'column'  }}>
                    <CardMedia component='img' src={item.strMealThumb} alt={`Picture of ${item.strMeal}`} />
                    <CardContent sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                        <Typography>{item.strMeal}</Typography>
                        <IconButton sx={{ marginLeft: 5 }} onClick={event => removeFromFavourite(event)}>
                            <Favorite sx={{ color: 'pink' }} />
                        </IconButton>
                    </CardContent>
                    
                </CardContent>
            </CardActionArea>
        </Card>
    )
}


export { FavouriteItem }