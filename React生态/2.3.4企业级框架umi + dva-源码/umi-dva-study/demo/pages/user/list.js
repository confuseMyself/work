import request from 'axios'
import styles from './user.css';
import {
	useEffect,
	useState
} from 'react'
export default function() {
	const [list,setList] = useState([])
	useEffect(() => {
		request.get('/api/user/list').then(res => {
			setList(res.data)
		})
	}, [])
	return (
		<div className={styles.normal}>
			{
				list.map(item => <p>{item.name} , {item.age}</p>)
			}
		</div>
	);
}
