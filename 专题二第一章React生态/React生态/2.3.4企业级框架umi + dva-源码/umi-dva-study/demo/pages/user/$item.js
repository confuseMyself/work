
import styles from './user.css';

export default function(props) {
	console.log(props,'props')
	return (
		<div className={styles.normal}>
			item {props.match.params.item}
		</div>
	);
}
// 深度封装了webpack
// 深度封装了 react-router
// mock
