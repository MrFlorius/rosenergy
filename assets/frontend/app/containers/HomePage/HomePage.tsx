import React, {FC, useEffect, useState} from 'react'
import { FormattedMessage } from 'react-intl'
import ThemeToggle from '../../components/ThemeToggle'
import LocaleToggle from '../../components/LocaleToggle'
import Typography from '@material-ui/core/Typography'
import {makeStyles, Theme} from '@material-ui/core/styles'

import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';

import AddIcon from '@material-ui/icons/Add';

import Filter from  './assets/filter.svg'
import Expand from  './assets/expand.svg'
import Search from  './assets/search.svg'
import Bg from  './assets/bg.svg'
import Rating from '@material-ui/lab/Rating';
import Avatar1 from './assets/author.png'
import axios from 'axios'
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		margin: 'auto',
		textAlign: 'center',
	},
	buttonsRowWrapper: {
		display: 'flex',
		marginTop: theme.spacing(1),
	},
	buttonsRow: {
		display: 'flex',
		margin: '0 auto',
	},
	button: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		padding: '16px 16px',
		background: 'linear-gradient(270deg, #004F8C 0%, #79B4E2 100%)',
		borderRadius: '8px'
	},
	topBar: {
		display: 'flex',
		justifyContent: 'space-between',
		padding: '32px 16px 16px 32px'
	},
	text: {
		textAlign: 'start'
	},
	title: {
		fontWeight: 500,
		fontSize: 22,
	},
	description: {
		color: '#737373',
		width: 500
	},
	filters: {
		color: '#737373',
		display: 'flex',
		height: '32px',
		//width: '100%',
		background: '#E9F1F7',
		padding: '16px 16px 16px 32px',
		alignItems: 'center',
		'& > *': {
			marginRight: theme.spacing(2)
		}
	},
	itemsCenter: {
		display: 'flex',
		alignItems: 'center',
		'& > *': {
			marginRight: theme.spacing(2)
		}
	},
	cardList: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center'
	},
	card: {
		maxWidth: 400,
		position: 'relative',
		flexBasis: '28%',
		background: '#fafafa',
		boxShadow: '0px 0px 35px rgba(0, 0, 0, 0.05)',
		borderRadius: 10,
		//height: 100,
		margin: '48px 32px 0 32px',
		backgroundImage: 'url(https://svgur.com/i/Rrg.svg)',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'bottom',
		backgroundSize: 'contain',
		[theme.breakpoints.down('xs')]: {
			maxWidth: '100%',
			width: '100%',
			flexBasis: 'unset',
			margin: '16px 16px 0 16px',
		},
	},
	bg: {
		//backgroundImage: 'url(https://svgur.com/i/Rrg.svg)',
		//position: 'absolute',
		//bottom: -5,
	},
	cardContent: {
		position: 'relative',
		zIndex: 255,
		display: 'flex',
		flexDirection: 'column',
		textAlign: 'start',
		padding: '16px 32px',
		justifyContent: 'space-between',
		height: '100%',
		boxSizing: 'border-box'
	},
	cardTitle: {
		fontSize: 24,
		fontWeight: 900
	},
	cardSecondary: {
		color: '#737373'
	},
	avatar: {
		height: 48,
		width: 48,
		borderRadius: '50%'
	},
	cardBottom: {
		marginTop: 16,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	openProject: {
		marginTop: 12,
		fontWeight: 900,
		borderBottom: '3px solid #000000'
	},
	cardTop: {
		display: 'flex',
		flexDirection: 'column',
		textAlign: 'start',
	}
}))

interface HomePageProps {}


const HomePage : FC<HomePageProps> = ({}) => {

	useEffect(() => {
		axios('http://rosenergy.ninsar.tech/api/offers', { method: 'get'}).then((res) => {
			//console.log()\
			setData(res.data.data)
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

	// @ts-ignore
	const [data, setData] = useState([])


	const classes = useStyles()

	return (

		<div className={classes.root}>

			<div className={classes.topBar}>
				<div >
					<Typography className={clsx(classes.text, classes.title)}>Проекты</Typography>
					<Hidden xsDown>
						<Typography className={clsx(classes.text, classes.description)}>Проекты сотрудников, создаваемые в рамках программы рационализаторской деятельности</Typography>
					</Hidden>
					</div>
				<div>
					<Hidden xsDown>
						<Button
							variant="contained"
							color="secondary"
							className={classes.button}
							startIcon={<AddIcon />}
							onClick={() => { window.open("http://" + location.host + "/projects/create","_self") }}
						>
							Создать проект
						</Button>
					</Hidden>
				</div>
			</div>
			<Hidden xsDown>

			<div className={classes.filters}>
				<div className={classes.itemsCenter}><Filter/><Typography>Фильтровать по</Typography></div>
				<div className={classes.itemsCenter}><Expand/><Typography>тегам</Typography></div>
				<div className={classes.itemsCenter}><Expand/><Typography>конкурсные проекты</Typography></div>
				<div className={classes.itemsCenter}><Expand/><Typography>трендовые проекты</Typography></div>
				<div className={classes.itemsCenter}><Search/><TextField style={{top: -10}} label="Search" /></div>
			</div>
			</Hidden>

			<div className={classes.cardList}>


				{
					data.map((item, index) => {
						console.log(item.tags)
						return (<div key={index} className={classes.card}>
							<div className={classes.cardContent}>
								<div className={classes.cardTop}>
									<Rating
										value={3}
									/>
									<Typography className={classes.cardSecondary}>{item.tags && item.tags[0] ? item.tags[0].name : ''}</Typography>
									<Typography className={classes.cardTitle}>{item.name}</Typography>
									<Typography className={classes.cardSecondary}>{item.description}</Typography>
								</div>

								<div className={classes.cardBottom}>
									<img className={classes.avatar} src={Avatar1}/>
									<Typography onClick={() => { window.open("http://" + location.host + "/project/" + item.id,"_self")}} className={classes.openProject}>Открыть проект</Typography>
								</div>
							</div>
						</div>)
					})
				}

			</div>

		</div>
	)
}



export default HomePage
