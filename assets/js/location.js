LookUp("json", res => {
	console.log("Success fetch ", res)
}, (err) => {
	console.log("Error fetch, ", err)
})

// Google map

let map = ''
initMap(map)
