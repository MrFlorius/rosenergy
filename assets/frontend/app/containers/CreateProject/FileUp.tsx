import React, {FC} from 'react'

import {makeStyles} from "@material-ui/core/styles";
import FileIcon from "./assets/file.svg";
import {Button, Typography} from "@material-ui/core";

interface AppProps {}

const useStyles = makeStyles(theme => ({
    fileup: {
        display: 'flex',
        border: '0.5px solid #C4C4C4',
        borderRadius: '7px',
        justifyContent: 'space-between',
        [theme.breakpoints.down('xs')]: {
            width: '100%'
        }
    },
    text: {
        marginLeft: 16,

    },
    fileWrapper: {
        width: '66%',
        [theme.breakpoints.down('xs')]: {
            width: '100%'
        }
    }
}))

const FileUp : FC<AppProps> = ({}) => {

    const classes = useStyles()

    return (
        <div className={classes.fileWrapper}>

            <div className={classes.fileup}>
                <div style={{ display: 'flex', padding: 16}}>
                    <FileIcon/>
                    <Typography className={classes.text}>Файл не выбран</Typography>
                </div>
                <Button style={{ background: '#79B4E2', color: '#ffffff', borderBottomLeftRadius: 0, borderTopLeftRadius: 0 }}><Typography>Выбрать</Typography></Button>
            </div>

        </div>
    )
}

export default FileUp
