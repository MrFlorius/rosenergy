import React, {FC, useState} from 'react'
import Typography from "@material-ui/core/Typography/Typography";

import {makeStyles, Theme} from '@material-ui/core/styles';
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Attach from "./assets/attach.svg";
import Info from "./assets/info.svg";
import Tags from "./assets/tags.svg";
import {Collapse} from 'react-collapse';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import {Checkbox, FormControlLabel, Hidden, Tooltip} from "@material-ui/core";
import FileUp from "./FileUp";
import ChipInput from 'material-ui-chip-input'
import axios from "axios";

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
		padding: 32
	},
	text: {
		textAlign: 'start'
	},
	title: {
		fontWeight: 500,
		fontSize: 22,
		marginRight: 12
	},
	description: {
		color: '#737373',
		fontWeight: 400,
		fontSize: 20,
	},
	oneLineText: {
		display: 'flex',
		alignItems: 'center'
	},
	saveText: {
		color: '#79B4E2',
		marginRight: 24,
		fontSize: 18,
		textDecoration: 'underline',
		cursor: 'pointer'
	},
	download: {
		display: 'flex'
	},
	formPage: {
		display: 'flex',
		flexDirection: 'column',
		padding: '0 32px 32px 32px',
		boxSizing: 'border-box'
	},
	filledPercentage: {
		height: 30,
		width: '100%',
		background: '#EFEFEF',
		borderRadius: 15,
		position: 'relative'
	},
	completePercentage: {
		background: 'linear-gradient(90deg, #79B4E2 0%, #004F8C 100%)',
		boxShadow: '5px 0px 5px rgba(0, 0, 0, 0.1)',
		borderRadius: 15,
		height: 30,
		width: 190
	},
	textPercentage: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		color: '#737373',
		fontSize: 15,
		[theme.breakpoints.down('xs')]: {
			fontSize: 12
		}
	},
	collapse: {
		marginTop: 32,
		cursor: 'pointer',
		height: 40,
		width: '100%',
		border: '0.5px solid #C4C4C4',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		textAlign: 'start',
		borderRadius: 7,
		padding: '0 16px',
		boxSizing: 'border-box',
		color: '#737373',
		fontWeight: 600
	},
	activeCollapse: {
		background: '#E9F1F7'
	},
	columnsCollapse: {
		display: 'flex',
		flexDirection: 'row',
		[theme.breakpoints.down('xs')]: {
			flexDirection: 'column',
		},

	},
	textField: {
		width: '100%',
		marginBottom: 16
	},
	column: {
		//padding: 16
		[theme.breakpoints.down('xs')]: {
			width: '100% !important'
		}
	},
	columnFix: {
		padding: '16px 0 16px 16px',
		width: '50%',
		[theme.breakpoints.down('xs')]: {
			padding: '16px 16px 16px 0'
		}
	},
	textInput: {
		textAlign: 'start',
		fontWeight: 500,
		fontSize: 14,
		color: '#5C5C5C'
	},
	tags: {
		width: '100%',
		display: 'flex',
		'& > *': {
			marginRight: 8
		},
		marginBottom: 16
	},
	tagsBox: {
		border: '0.5px solid #C4C4C4',
		boxSizing: 'border-box',
		borderRadius: 7,
		padding: 16,
		width: '100%',
		display: 'flex',
		marginRight: 16
	},
	sendButtons: {
		'& > *': {
			marginRight: 16,
			[theme.breakpoints.down('xs')]: {
				marginRight: 0,
				marginBottom: 16
			}
		},
	},
	pageEnd: {
		marginBottom: 16,
		[theme.breakpoints.down('xs')]: {

			marginBottom: 64
		}
	}
}))

interface CreateProject {}

const CreateProject : FC<CreateProject> = ({}) => {

	const classes = useStyles();

	const [author, setAuthor] = useState(false)
	const [project, setProject] = useState(true)


	const [orgName, setorgName] = useState('')
	const [authorName, setauthorName] = useState('')
	const [structName, setstructName] = useState('')
	const [birtdayDate, setbirtdayDate] = useState('')
	const [role, setrole] = useState('')
	const [education, seteducation] = useState('')
	const [expirience, setexpirience] = useState('')

	const [tags, setTags] = useState([])

	/*const [orgName, setorgName] = useState('')
	const [authorName, setauthorName] = useState('')
	const [structName, setstructName] = useState('')
	const [birtdayDate, setbirtdayDate] = useState('')
	const [role, setrole] = useState('')
	const [education, seteducation] = useState('')
	const [expirience, setexpirience] = useState('')*/

	const [name, setname] = useState('')
	const [description, setdescription] = useState('')
	const [solution, setsolution] = useState('')
	const [outcome, setoutcome] = useState('')
	const [benefits, setbenefits] = useState('')


	const addTag = (chip) => {
		const chips = [...tags, chip]
		console.log(chips)
		setTags(chips)
	}
	const removeTag = (index) => {
		const chips = tags.filter((item, index1) => index !== index1)
		setTags(chips)
	}

	const formTags = () => {
		const newTags = []
		tags.forEach((item, index) => {
			newTags.push({
				name: item,
				id: index + 1
			})
		})
		return newTags
	}

	const send = () => {
		fetch('http://rosenergy.ninsar.tech/api/users', {
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			},
			redirect: 'follow',
			referrerPolicy: 'no-referrer',
			body: JSON.stringify({
				user: {
					department: orgName,
					education: education,
					expirience: null,
					job: role,
					organization: structName,
					first_name: authorName.split(' ')[0],
					last_name: authorName.split(' ')[1],
					year_of_birth: null,
					email: 'test' + new Date().getTime() + '@test.ru',
					password: '1234567890',
					password_confirmation: '1234567890'
				}
			})
		}).then(res => res.json()).then((r) => {
			console.log(r.data.id)
			fetch('http://rosenergy.ninsar.tech/api/offers', {
				method: 'POST',
				mode: 'cors',
				cache: 'no-cache',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json'
				},
				redirect: 'follow',
				referrerPolicy: 'no-referrer',
				body: JSON.stringify({
					offer: {
						name,
						user_id: r.data.id,
						tags: formTags(),
						description,
						outcome,
						solution,
						benefits,
						status_id: 1
					}
				})
			}).then(res => res.json()).then((r) => {
				console.log(r)
				window.open("http://" + location.host + "/project/complete/" + r.data.id,"_self")
				//console.log(r)
			}).catch((err) => console.log(err))
			//console.log(r)
		}).catch((err) => console.log(err))

/*		axios.post('http://rosenergy.ninsar.tech/api/users', {
				department: orgName,
				education: education,
				expirience: expirience,
				job: role,
				organization: structName,
				first_name: authorName.split(' ')[0],
				last_name: authorName.split(' ')[1],
				year_of_birth: birtdayDate,
				email: 'test@test.ru'


		}, {headers: { "Access-Control-Allow-Origin": "*" }}).then((res) => {
			//console.log()\
			//setData(res.data.data)
		}).catch((err) => console.error(err))*/
	}

	return (

		<div className={classes.root}>

			<div className={classes.topBar}>
				<div className={classes.oneLineText}>
					<Typography className={clsx(classes.text, classes.title)}>Создание проекта</Typography>
					<Hidden xsDown>
						<Typography className={clsx(classes.text, classes.title, classes.description)}>- Заявление на рационализаторское предложение</Typography>
					</Hidden>
					</div>
				<Hidden xsDown>
					<div className={classes.download}>
						<Typography className={classes.saveText}>Скачать шаблон .doc</Typography>
						<Attach/>
					</div>
				</Hidden>
			</div>

			<div className={classes.formPage}>
				<div className={classes.filledPercentage}>
					<div className={classes.completePercentage}></div>
					<Typography className={classes.textPercentage}>Проект заполнен на 10%</Typography>
				</div>


				<div className={clsx(classes.collapse, {[classes.activeCollapse]: author})} onClick={() => setAuthor(!author)}>
					<Typography>Данные об авторе проекта</Typography>
					{author ? <ExpandLessIcon/> : <ExpandMoreIcon/> }
				</div>
				<Collapse isOpened={author}>
					<div className={classes.columnsCollapse}>
						<div className={classes.column} style={{padding: '16px 16px 16px 0', width: '50%'}}>
							<div style={{display: 'flex'}}>
								<Typography className={classes.textInput}>Наименование организации </Typography>
								<Typography className={classes.textInput} style={{marginLeft: 4, opacity: .5}}>(Обособленного подразделения)</Typography>
							</div>
							<TextField onChange={(e => setorgName(e.target.value ))} className={classes.textField}/>
							<Typography className={classes.textInput}>Фамилия и имя автора</Typography>
							<TextField onChange={(e => setauthorName(e.target.value ))} className={classes.textField}/>
							<Typography className={classes.textInput}>Наименование структурного подразделения</Typography>
							<TextField onChange={(e => setstructName(e.target.value ))} className={classes.textField} />
							<Typography className={classes.textInput}>Год рождения</Typography>
							<TextField onChange={(e => setbirtdayDate(e.target.value ))} className={classes.textField} />
						</div>
						<div className={clsx(classes.column, classes.columnFix)} style={{}}>
							<Typography className={classes.textInput}>Должность</Typography>
							<TextField onChange={(e => setrole(e.target.value ))} className={classes.textField}/>
							<Typography className={classes.textInput}>Образование</Typography>
							<TextField onChange={(e => seteducation(e.target.value ))} className={classes.textField} />
							<Typography className={classes.textInput}>Стаж работы в энергетике с 0000 года</Typography>
							<TextField onChange={(e => setexpirience(e.target.value ))} className={classes.textField} />
						</div>
					</div>
				</Collapse>

				<div className={clsx(classes.collapse, {[classes.activeCollapse]: project})} onClick={() => setProject(!project)}>
					<Typography>Информация о проекте</Typography>
					{project ? <ExpandLessIcon/> : <ExpandMoreIcon/> }
				</div>
				<Collapse isOpened={project}>
					<div className={classes.columnsCollapse}>
						<div className={classes.column} style={{padding: '16px 16px 16px 0', width: '50%'}}>
							<Typography className={classes.textInput}>Краткое наименование предложения</Typography>
							<div style={{display: 'flex'}}>
								<TextField onChange={(e => setname(e.target.value ))}  className={classes.textField} />
								<Tooltip title="Выберите краткое и ёмкое название для привлечения внимания экспертов и коллег" placement="top-end">
									<div><Info/></div>
								</Tooltip>
							</div>
						</div>
					</div>
					<div className={classes.columnsCollapse}>
						<div className={clsx(classes.tags, classes.column)} style={{}}>
							<Typography className={classes.textInput}>Добавить теги</Typography>
							<Tags/>
							<Typography className={classes.textInput} style={{fontSize: 15, color: 'rgb(155 155 155)'}}>(от 5 желательно)</Typography>
						</div>
					</div>
					<div className={clsx(classes.columnsCollapse)}>
						<div className={classes.tagsBox}>
							<ChipInput
								value={tags}
								onAdd={(chip) => addTag(chip)}
								onDelete={(chip, index) => removeTag(index)}
							/>
						</div>

						<Tooltip title="Выберете из существующих и при необходимости добавьте свои" placement="top-end">
							<div><Info/></div>
						</Tooltip>
					</div>
					<div className={classes.columnsCollapse}  style={{display: 'flex', justifyContent: 'center', marginTop: 16}}>

						<Typography style={{fontWeight: 500}}>ОПИСАНИЕ ПРЕДЛОЖЕНИЯ</Typography>
					</div>
					<div className={classes.columnsCollapse}>
						<div className={classes.column} style={{padding: '16px 16px 16px 0', width: '66%'}}>
							<Typography className={classes.textInput}>Текущая ситуация</Typography>
							<div style={{display: 'flex'}}>
								<TextField onChange={(e => setdescription(e.target.value ))} className={classes.textField} />
								<Tooltip title="Какие недостатки в существующем объекте или процессе?" placement="top-end">
									<div><Info/></div>
								</Tooltip>
							</div>
						</div>
					</div>
					<div className={classes.columnsCollapse}>
						<div className={classes.column} style={{padding: '16px 16px 16px 0', width: '66%'}}>
							<Typography  className={classes.textInput}>Описание предлагаемого решения</Typography>
							<div style={{display: 'flex'}}>
								<TextField onChange={(e => setsolution(e.target.value ))} className={classes.textField} />
								<Tooltip title="Как и с помощью чего возможно решить проблему?" placement="top-end">
									<div><Info/></div>
								</Tooltip>
							</div>
						</div>
					</div>
					<div className={classes.columnsCollapse}>
						<div className={classes.column} style={{padding: '16px 16px 16px 0', width: '66%'}}>
							<Typography className={classes.textInput}>Экономический эффект</Typography>
							<div style={{display: 'flex'}}>
								<TextField onChange={(e => setoutcome(e.target.value ))}  className={classes.textField} />
								<Tooltip title="Текущие расходы и предполагаемая экономия. От них будет зависеть ваше вознаграждение" placement="top-end">
									<div><Info/></div>
								</Tooltip>
							</div>
						</div>
					</div>
					<div className={classes.columnsCollapse}>
						<div className={classes.column} style={{padding: '16px 16px 16px 0', width: '66%'}}>
							<Typography className={classes.textInput}>Другие преимущества</Typography>
							<div style={{display: 'flex'}}>
								<TextField onChange={(e => setbenefits(e.target.value ))}  className={classes.textField} />
								<Tooltip title="Технические, организаторские и иные результаты применения решения" placement="top-end">
									<div><Info/></div>
								</Tooltip>
							</div>
						</div>
					</div>
					<div className={classes.columnsCollapse} style={{marginBottom: 16}}>
						<Typography className={classes.textInput}>Прикрепить дополнительные файлы/материалы</Typography>
					</div>
					<div className={classes.columnsCollapse} style={{ marginBottom: 16 }}>
						<FileUp/>
					</div>
					<div className={clsx(classes.columnsCollapse, classes.sendButtons)} style={{justifyContent: 'center', marginBottom: 16}}>
						<Button variant="outlined" color="primary">
							Переслать участнику
						</Button>
						<Button variant="outlined" color="primary">
							Сгенерировать doc
						</Button>
					</div>
					<div className={clsx(classes.columnsCollapse, classes.pageEnd)} style={{justifyContent: 'center'}}>
						<Button onClick={() => send()} variant="contained" color="primary">
							Отправить
						</Button>
					</div>
				</Collapse>
			</div>








		</div>
	)
}






/*<div className={classes.columnsCollapse}>
	<div className={classes.column} style={{width: '50%', display: 'flex', flexDirection: 'column'}}>
		<FormControlLabel
			control={
				<Checkbox
					checked={cb1}
					onChange={(e) => setcb1(e.target.checked)}

				/>
			}
			label="Управление технологическим процессом. Цифровая сеть"
		/>
		<FormControlLabel
			control={
				<Checkbox
					checked={cb2}
					onChange={(e) => setcb2(e.target.checked)}

				/>
			}
			label="Дополнительные сервисы"
		/>
		<FormControlLabel
			control={
				<Checkbox
					checked={cb3}
					onChange={(e) => setcb3(e.target.checked)}

				/>
			}
			label="Цифровое управление компанией"
		/>
	</div>
	<div className={classes.column} style={{padding: '16px 0 16px 16px', width: '50%', display: 'flex', flexDirection: 'column'}}>
		<FormControlLabel
			control={
				<Checkbox
					checked={cb4}
					onChange={(e) => setcb4(e.target.checked)}

				/>
			}
			label="Комплексная система информационной безопасности"
		/>
		<FormControlLabel
			control={
				<Checkbox
					checked={cb5}
					onChange={(e) => setcb5(e.target.checked)}

				/>
			}
			label="Не относится"
		/>

	</div>
</div>
<div className={classes.columnsCollapse}  style={{display: 'flex', justifyContent: 'center', marginTop: 16}}>

	<Typography style={{fontWeight: 500}}>ОПИСАНИЕ ПРЕДЛОЖЕНИЯ</Typography>
</div>
<div className={classes.columnsCollapse}>
	<div className={classes.column} style={{padding: '16px 16px 16px 0', width: '66%'}}>
		<Typography className={classes.textInput}>Описание действительного положения с указанием существующих недостатков</Typography>
		<TextField className={classes.textField} />
	</div>
</div>
<div className={classes.columnsCollapse}>
	<div className={classes.column} style={{padding: '16px 16px 16px 0', width: '66%'}}>
		<Typography className={classes.textInput}>Описание предлагаемого решения</Typography>
		<TextField className={classes.textField} />
	</div>
</div>
<div className={classes.columnsCollapse}>
	<div className={classes.column} style={{padding: '16px 16px 16px 0', width: '66%'}}>
		<Typography className={classes.textInput}>Ожидаемый положительный эффект от использования</Typography>
		<TextField className={classes.textField} />
	</div>
</div>

<div className={classes.columnsCollapse} style={{marginBottom: 16}}>
	<Typography className={classes.textInput}>Прикрепить дополнительные файлы/материалы</Typography>
</div>
<div className={classes.columnsCollapse}>
	<FileUp/>
</div>*/



export default CreateProject
