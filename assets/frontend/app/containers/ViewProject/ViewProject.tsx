import React, {FC, useEffect, useState} from 'react'
import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";
import {useParams} from "react-router-dom";
import {Typography} from "@material-ui/core";

interface AppProps {}

const useStyles = makeStyles(theme => ({
	wrapper: {
		display: 'flex',
		flexDirection: 'row'
	},
	content: {
		background: '#fafafa',
		borderRadius: 10,
		boxShadow: '0px 0px 35px rgba(0, 0, 0, 0.05)',
		width: '100%',
		margin: '48px 48px 48px 0',
		height: '100%'
	},
	view: {
		padding: 32
	},
	title: {
		color: 'rgba(0, 79, 140, 0.7)',
		fontSize: 18,
		fontWeight: 500,
	}
}))

const ViewProject : FC<AppProps> = ({}) => {

	const classes = useStyles()

	const params = useParams()

	const [data, setData] = useState({})

	useEffect(() => {
		axios('http://rosenergy.ninsar.tech/api/offers/'+ params.id, { method: 'get'}).then((res) => {
			setData(res)
			console.log(data)
			//setData(res.data.data)
		}).catch((err) => console.error(err))
		/*		const testURL = 'http://rosenergy.ninsar.tech/api/offers';
                const myInit = {
                    method: 'GET',

                };

                const myRequest = new Request(testURL, myInit);

                fetch(myRequest).then(function(response) {
                    console.log(response)
                })*/
		//return response;
	}, [])

	return (
		<div className={classes.view}>
			<Typography className={classes.title}>
				1. Краткое наименование предложения
			</Typography>
			<Typography>
				{data.id}
			</Typography>
			<Typography className={classes.title}>
				2. Краткое описание проекта
			</Typography>
			<Typography className={classes.title}>
				3. Категория предложения в части цифровой трансформации
			</Typography>


			<Typography>
				ОПИСАНИЕ ПРЕДЛОЖЕНИЯ
			</Typography>
			<Typography className={classes.title}>
				4. Описание действительного положения с указанием существующих недостатков
			</Typography>
			<Typography className={classes.title}>
				5. Описание предлагаемого решения
			</Typography>
			<Typography className={classes.title}>
				6. Ожидаемый положительный эффект от использования
			</Typography>
			<Typography className={classes.title}>
				7. В чем нуждается проект
			</Typography>
		</div>
	)
}

export default ViewProject
