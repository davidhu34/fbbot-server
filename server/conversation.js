const mqtt = require('mqtt')

const {
	TYPE, ORGANIZATION_ID, DEVICE_TYPE, DEVICE_ID, USERNAME, PASSWORD
} = require('../configs.js').MQTT

const clientId = [TYPE, ORGANIZATION_ID, DEVICE_TYPE, DEVICE_ID].join(':')
const iot_client = mqtt.connect('mqtt://'+ORGANIZATION_ID+'.messaging.internetofthings.ibmcloud.com:1883', {
	"clientId" : clientId,
	"keepalive" : 30,
	"username" : USERNAME,
	"password" : PASSWORD
})

iot_client.on('connect', () => {
	console.log('Client connected to IBM IoT Cloud.')

	iot_client.subscribe('iot-2/cmd/+/fmt/json', (err, granted) => {
		console.log('subscribed command, granted: '+ JSON.stringify(granted))
	})
	iot_client.publish('iot-2/evt/init/fmt/string', JSON.stringify({text: 'connected'}))
})

module.exports = iot_client
