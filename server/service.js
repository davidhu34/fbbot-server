const request = require('request')
const { CHZW_URL } = require('./configs').SERVICE

module.exports = {
	chzw: (str) => new Promise( (resolve, reject) => {
		console.log('translating zhtw:', str)
		request.post({
			headers: {'content-type' : 'application/x-www-form-urlencoded'},
			url: CHZW_URL,
			body: 'text='+str
		}, (err, res, body) => {
			if (err) reject(err)
			else {
				console.log('zhtw success', res.body)
				resolve(res.body)
			}
		})
	}).catch( err => {
		console.log('chzw err:', err)
	}),

	ifly: (str) => {

	}
}
