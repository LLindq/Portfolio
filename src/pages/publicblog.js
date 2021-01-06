import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../util/global.scss';

import '../util/publicblog.scss';
import Sidenav from '../components/sidenav';

export default function Publicblog() {

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        axios
			.get('/blogs')
			.then((response) => {
                setBlogs(response.data)
			})
			.catch((err) => {
				console.log(err);
			});
    },[])


    


    return(
    <div>
        <div id='stars'></div>
        <div id='stars2'></div>
        <div id='stars3'></div>
        {blogs.map((blog) => {
            console.log(blog)
            return(
                <div>
                    <Sidenav />
                    <div className="main">
                        <div className="titleContainer">
                            <div className="blogTitle">{blog.title}</div>
                        </div>
                        <div className="bodyContainer">
                            <div className="blogBody">{blog.body}</div>
                        </div>
                    </div>
                </div>)
        })}
    </div>
    )
}

