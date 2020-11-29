import React, {FC} from 'react'
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import {Chip, Paper} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Hidden from "@material-ui/core/Hidden";

interface AppProps {}

const useStyles = makeStyles(theme => ({
	root: {
		margin: 'auto',
		textAlign: 'center',
	},
	text: {
		textAlign: 'start'
	},
	title: {
		fontWeight: 500,
		fontSize: 22,
		marginBottom: 16
	},
	topBar: {
		textAlign: 'start',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'start',
		padding: '32px 16px 16px 32px'
	},
	chip: {
		marginRight: 16
	},
	card: {
		boxSizing: 'border-box',
		boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
		borderRadius: 7,
		margin: 32
	},
	button: {
		//marginLeft: theme.spacing(1),
		//marginRight: theme.spacing(1),
		padding: '8px 32px',
		background: '#004F8C',
		borderRadius: '8px'
	},
}))

const MyProjects : FC<AppProps> = ({}) => {

	const classes = useStyles()

	return (
		<div className={classes.root}>
			<div className={classes.topBar}>
				<Typography className={clsx(classes.text, classes.title)}>Мои проекты</Typography>
				<div>
					<Chip className={classes.chip} label="Принятые" />
					<Chip className={classes.chip} label="Отклоненные" />
					<Chip label="На рассмотрении" />
				</div>
			</div>
{/*			<div>
				<Paper className={classes.card}>
					Электрический сектор
				</Paper>
			</div>*/}

			<div>
				<Button
					variant="contained"
					color="secondary"
					className={classes.button}

					onClick={() => { window.open("http://" + location.host + "/projects/create","_self") }}
				>
					Создать проект
				</Button>
			</div>

		</div>
	)
}

export default MyProjects
