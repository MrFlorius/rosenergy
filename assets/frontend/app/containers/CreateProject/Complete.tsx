import React, {FC} from 'react'

import {makeStyles} from "@material-ui/core/styles";

import {Button, Typography} from "@material-ui/core";
import Succ from "./assets/succ.svg";
import {useParams} from "react-router-dom";

interface AppProps {}

const useStyles = makeStyles(theme => ({
    root: {
        margin: 'auto',
        textAlign: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 500,
        padding: 32
    },
    text: {
        padding: 32
    }

}))

const Complete : FC<AppProps> = ({}) => {

    const params = useParams()

    const classes = useStyles()

    return (
        <div className={classes.root}>
            <div>

            </div>
            <Typography className={classes.title}>Спасибо за предложение по рационализации! </Typography>
            <Succ/>

            <Typography className={classes.text}>Оно отправлено на рассмотрение эксперту и секретарю для включения в реестр. В личном кабинете вы сможете отслеживать статус своего предложения. </Typography>

            <Typography className={classes.text}>Пока ожидаете оценки – зайдите в список текущих предложений и проголосуйте за лучшие для ускорения их внедрения.</Typography>
            <div style={{ width: '100%', marginBottom: 32 }}>
                <Button onClick={() => { window.open("http://rosenergy.ninsar.tech/api/offers/" + params.id + "/download/","_blank")}}

                        variant="outlined" color="primary">
                    Сгенерировать doc
                </Button>
            </div>

            <Button onClick={() => { window.open("http://" + location.host + "/projects/","_self")}} variant="contained" color="primary">
                Перейти к проектам
            </Button>
        </div>
    )
}

export default Complete
