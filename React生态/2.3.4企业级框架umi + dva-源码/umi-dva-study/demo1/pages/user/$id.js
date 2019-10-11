
import styles from './user.css';

export default function(props) {
	console.log(props)
	return (
		<div className={styles.normal}>
			<h1>Page user {props.match.params.id}</h1>
		</div>
	);
}
