import { Box, Button, CircularProgress, Container, Paper, Stack, Typography, useTheme } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import AppTitles from './AppTitles';
import ResultsGallery from './ResultsGallery';
import SingleImage from './SingleImage';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const MainApp = () => {
    const [results, setResults] = useState([]);
    const [gigaState, setGigaState] = useState(false);
    const fileInputRef = useRef(null);
    const showSingleImage = useRef(false);
    const isImageBeingProcessed = useRef(false);
    const [image, setImage] = useState({ src: null, title: null, excerpt: null, description: null, confidence: null });

    useEffect(() => {
            if(image.src){
                setResults(results => [...results, image])
            }
        return;
    }, [image]);

    const loadImage = (src) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.addEventListener('load', () => resolve(img));
            img.addEventListener('error', (err) => reject(err));
            img.src = src;
        })
    }

    const handleImageChange = (e) => {
        isImageBeingProcessed.current = true;
        setGigaState(false);


        loadImage(URL.createObjectURL(e.target.files[0])).then(async img => {
            isImageBeingProcessed.current = true

            const formData = new FormData();
            formData.append('image', e.target.files[0]);

            try{
                const response = await fetch('http://127.0.0.1:5000/make_predictions', {
                    method: 'POST',
                    body: formData,
                  });

                const responseData = await response.json();
                const imageUrl = responseData.predicted_image;
                const title = responseData.textData;

                showSingleImage.current = true;

                setImage((image) => {return {
                    src: imageUrl,
                    title: title,
                    confidence: "weed",
                    description: "weed",
                    excerpt: "weed"
                    }
                });

            } catch (error) {
                console.error('Error uploading image:', error);
            }

            isImageBeingProcessed.current = false;
        }).catch(err => console.error(err));
    }

    return (
        <Container disableGutters  >

            <Container sx={{ pt: 8, pb: 6 }} maxWidth="sm" >
                <Box sx={{ minHeight: "300px", display: "flex", alignItems: "center", justifyContent: "center" }} >
                    {isImageBeingProcessed.current &&
                        <CircularProgress />
                    }

                    <CSSTransition
                        in={gigaState}
                        classNames="my-node"
                        timeout={{
                            appear: 1000,
                            enter: 1000,
                            exit: 1000,
                        }}>

                    {showSingleImage.current ? <SingleImage image={image} />: <></> }

                    </CSSTransition>

                    { showSingleImage.current ? <></> : AppTitles() }

                </Box>
                <Stack
                    sx={{ pt: 4 }}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                >
                    <Button variant="contained" onClick={() => { fileInputRef.current.click(); }}>
                        <input ref={fileInputRef} type="file" id="image-upload" style={{ display: 'none' }} onChange={handleImageChange} />
                        {showSingleImage.current ? 'Upload next image' : 'Upload image'}
                    </Button>
                </Stack>

            </Container >
            {
                showSingleImage.current ?

                <Container sx={{ py: 8 }} >

                    <Typography sx={{ p: 8 }} align="center" variant="h4" component="h3">Recent results:</Typography>
                    <Paper elevation={3} sx={{ p: 4, bgcolor: "primary.main" }}>
                        <ResultsGallery results={results} />
                    </Paper>
                </Container> : <></>
            }
        </Container >
    );

}

export default MainApp;
