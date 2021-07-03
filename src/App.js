import React from 'react';
import {Button, Container, Grid, withStyles} from '@material-ui/core';
import {firebaseConfig} from './firebaseApp';

const styles = theme => ({
    root: {
        padding: 40,
    },
    buttonContainer: {
        textAlign: "center",
        marginBottom: 20,
    }
});

class App extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            images: [],
        };
        this.handleAddImage=this.handleAddImage.bind(this);
    }

    handleAddImage(){
        let stateImages = this.state.images
        let randomSrc = Math.random().toString()
        this.setState({
            images: [
                ...stateImages,
                <img key={randomSrc} alt="" src={this.getFunctionUrl('getRandomImage') + '?' + randomSrc} />
            ]
        });
    }

    getFunctionUrl(name, region='us-central1'){
        return "https://" + region + "-" + firebaseConfig.projectId + ".cloudfunctions.net/" + name;
    }

    // Note: Firebase functions usually expected to have json content on response
    // If that is a case, you would call via httpsCallable() method
    //
    // const addMessage = firebase.functions().httpsCallable('addMessage');
    // addMessage({ text: messageText })
    //   .then((result) => {
    //     // Read result of the Cloud Function.
    //     var sanitizedMessage = result.data.text;
    //   });

    render() {
        const { classes } = this.props;

        return (
            <div className="App">
                <Container className={classes.root}>
                    <div className={classes.buttonContainer}>
                        <Button variant="contained" color="primary" onClick={this.handleAddImage}>
                            Add Image
                        </Button>
                    </div>

                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center"
                        style={{ minHeight: '100vh' }}
                    >
                        <div>{this.state.images.map(image => image)}</div>
                    </Grid>
                </Container>

            </div>
        );
    }
}

export default withStyles(styles, { withTheme: false })(App);
