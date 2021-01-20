import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../util/global.scss';
import '../util/publicblog.scss';
import Sidenav from '../components/sidenav';

export default function Publicblog() {

    const [blogs, setBlogs] = useState([]);
    ///Hämtar inläggen i bloggen
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
    <div className="containerHtml">
        <Sidenav />
        <div className="blogTitle">Blog</div>
        {/* Loopar ut blog-collectionen och presenterar inläggen var för sig */}
        {blogs.map((blog) => {
            console.log(blog)
            return(
                <div>
                    <div className="mainBlog">
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

