export default {
	'/api/user/list': (req,res) => {
		res.send(
			[
				{
					id:1,name:'ryan',age:35
				},
				{
					id:2,name:'star',age:40
				}
			]
		)
	}
}
