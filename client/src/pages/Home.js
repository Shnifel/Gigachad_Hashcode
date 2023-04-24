import React from "react";
import { Grid, Card, CardContent, CardMedia, Typography, IconButton, ThemeProvider, CssBaseline } from "@material-ui/core";
import { ArrowForward } from "@mui/icons-material";
import NavBar from "../components/Navbar";
import { darkTheme } from "../components/styles/Theme";


const competitions = [
  {
    id: 1,
    title: "Competition 1",
    image: "https://source.unsplash.com/random/400x200",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque euismod dui, in bibendum libero tristique ac. Ut euismod nisi eu magna pellentesque, non elementum velit sollicitudin. ",
  },
  {
    id: 2,
    title: "Competition 2",
    image: "https://source.unsplash.com/random/400x200",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque euismod dui, in bibendum libero tristique ac. Ut euismod nisi eu magna pellentesque, non elementum velit sollicitudin. ",
  },
  {
    id: 3,
    title: "Competition 3",
    image: "https://source.unsplash.com/random/400x200",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque euismod dui, in bibendum libero tristique ac. Ut euismod nisi eu magna pellentesque, non elementum velit sollicitudin. ",
  },
];

const Competitions = () => {
  return (
    <ThemeProvider>
        <CssBaseline/>
    <Grid container>
        <NavBar/>
    <Grid container spacing={3}>
      {competitions.map((competition) => (
        <Grid key={competition.id} item xs={12} sm={6} md={4}>
          <Card sx = {{borderRadius : 30}}>
            <CardMedia
              component="img"
              alt={competition.title}
              height="200"
              image={competition.image}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {competition.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {competition.description}
              </Typography>
              <IconButton aria-label="navigate to competition" href={`/competitions/${competition.id}`}>
                <ArrowForward />
              </IconButton>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    </Grid>
    </ThemeProvider>
  );
};

export default Competitions;
