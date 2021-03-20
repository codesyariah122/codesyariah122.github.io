---
layout: post
title:  "Berbicara hook dan lifecycle"
author: puji
categories: [ Javascript, NodeJS, ReactJS ]
image: assets/images/post/react-hooks.png
tags: [webdevelopment]
opening: بسم الله الرحمن الرحيم
---  

{{page.opening}}

#### Berbicara tentang lifecycle  
Sekilas tentang hook di react js, Apa itu hook ???  
Hook adalah sebuah fitur di react js versi 16.8 yang menurut gout sendiri adalah wow, bukan wokwow yah.  
hook dalam penggunaan yang simple dan sederhana begitu terkesan powerfull dan sangat berkesan di hidup gout.  
berikut sekilas tentang penggunaan hook, untuk menggunakan hook kita harus mengambil sebuah modul bawaan react yaitu {useState} dimana modul atau component ini secara default sudah dapat kita gunakan sewaktu awal kita melakukan installasi react js.  

```javascript
import React, { Fragment, useState } from 'react'

const Home = props => {
	const [count, setCount] = useState(0)

	const increment = () => {
		setCount(number => number += 1)
	}

	const decrement = () => {
		setCount(number => number -= 1)
	}

	return (
		<Fragment>
			<h4>Count Number</h4>
				<button onClick={increment}>+</button> <h5> {count} </h5> <button onClick={decrement}>-</button>
		</Fragment>
	)
}

export default Home
```  

Penggunaan hook di dalam fungsi component diatas, kita dapat memanipulasi state dengan hook yang kita tentukan. Penggunaan hook dapat dimanfaatkan dalam sebuah aplikasi yang reactive dan realtime.  

Selain penggunaan {useState} seperti diatas adalah fitur hook dari reactjs, kita bisa juga menggunakan fitur side effect, jika dalam penggunaan class component untuk menggunakan side effect kita harus menjalankan method lifecycle seperti  componentWillMount. Didalam functional component kita bisa menggunakan {useEffect}, seperti ini contoh penggunaan useEffect :  

```javascript
import React, { useState, useEffect } from 'react'
import ListUsers from './components/ListUsers'

const Home = props => {

	const userData = [
		{id: 1, username: 'user1', email: 'user1@email.com'}
	]

	const [users, setUsers] = useState([])

	const getUsers = async() => {
		return await userData
	}

	useEffect(() => {
		getUsers()
		.then( data => setUsers(data))
	}, [users])

	return (
		<ListUsers users={users}/>
	)
} 

export default Home

```  

kemudian kita bisa mengirim state ke props child components, sehingga di child component kita bisa manfaatkan state dari parent components :  

```javascript

import React from 'react'

const ListUsers = props => {
	const users = props.users

	return (
		<>
			<ul>
				{users.length > 0 ? (
					users.map(user => (
						<li>{user.username}</li>
						<li>{user.email}</li>
					))
				) : (
					<li>User not available</li>
				)}
			</ul>
		</>
	)
}
export default ListUsers
```  

repository link react-crud with dummy data :  
<a href="https://github.com/codesyariah122/youtube-chanel-codesyariah/tree/react">React Hooks</a>

Ok sekian dulu artikel gout kali ini, semoga bermanfaat .

wassalaam


