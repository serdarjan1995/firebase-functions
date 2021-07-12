import React from 'react';
import {Button, Container, withStyles} from '@material-ui/core';
import {firebaseConfig} from "./firebaseApp";
import axios from "axios";

const styles = theme => ({
    root: {
        padding: 40,
    },
    formContainer: {
        textAlign: "center",
        marginBottom: 20,
    },
    fileInputWrapper: {
        margin: 20
    },
    mb10: {
        marginBottom: 10
    }
});

class UploadFile extends React.Component{

    state = {
        selectedFile: null,
    }

    getFunctionUrl(name, region='us-central1'){
        return "https://" + region + "-" + firebaseConfig.projectId + ".cloudfunctions.net/" + name;
    }

    onFileChange = event => {
        this.setState({ selectedFile: event.target.files[0] });
    };

    handleUploadImage = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append(
            "file",
            this.state.selectedFile,
        );
        alert('send')
        return;
        axios.post(this.getFunctionUrl('files'), formData).then((page) => {
            alert(JSON.stringify(page.data))
        }).catch((err) => {
            alert(JSON.stringify(err))
        })
    }


    fileData = () => {
        if (this.state.selectedFile) {
            return (
                <div>
                    <img alt="" src={URL.createObjectURL(this.state.selectedFile)} width="500"/>
                </div>
            );
        } else {
            return (
                <div>
                    <h4>Choose before Pressing the Upload button</h4>
                </div>
            );
        }
    };

    render() {
        const { classes } = this.props;

        return (
            <div className="App">
                <Container className={classes.root}>
                    <form className={classes.formContainer} onSubmit={this.handleUploadImage}>
                        <div className={classes.fileInputWrapper}>
                            <input type="file" name="image" accept="image/png, image/jpeg" onChange={this.onFileChange}/>
                        </div>

                        <div className={classes.mb10}>
                            <Button variant="contained" color="primary" type="submit">
                                Upload Image
                            </Button>
                        </div>

                        {this.fileData()}
                    </form>

                </Container>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: false })(UploadFile);
