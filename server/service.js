const request = require('request')

module.exports = {
	chzw: (str) => {
		request.post({
			headers: {'content-type' : 'application/x-www-form-urlencoded'},
			url: 'http://119.81.236.205:3998/chzw',
			body: 'text='+str
		}, function(err, res, body){
			if (err) console.log('chzw err:', err)
			else return res.body
		})
	},
	ifly: (str) => {

	}
}