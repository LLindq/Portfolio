
const { db } = require('../util/admin');
const collection = 'blogs';
exports.getAllBlogs = (request, response) => {
	db
        .collection(collection)
        // .where('username', '==', request.user.username)
		.orderBy('createdAt', 'desc')
		.get()
		.then((data) => {
			let blogs = [];
			data.forEach((doc) => {
				blogs.push({
                    blogId: doc.id,
                    title: doc.data().title,
					body: doc.data().body,
					createdAt: doc.data().createdAt,
				});
			});
			return response.json(blogs);
		})
		.catch((err) => {
			console.error(err);
			return response.status(500).json({ error: err.code});
		});
};

exports.getOneBlog = (request, response) => {
	db
        .collection('blogs')
        .where('username', '==', request.user.username)
		.orderBy('createdAt', 'desc')
		.get()
		.then((data) => {
			let blog = [];
			data.forEach((doc) => {
				blog.push({
                    blogId: doc.id,
                    title: doc.data().title,
					body: doc.data().body,
					createdAt: doc.data().createdAt,
				});
			});
			return response.json(blog);
		})
		.catch((err) => {
			console.error(err);
			return response.status(500).json({ error: err.code});
		});
};

exports.postOneBlog = (request, response) => {
	if (request.body.body.trim() === '') {
		return response.status(400).json({ body: 'Must not be empty' });
    }
    
    if(request.body.title.trim() === '') {
        return response.status(400).json({ title: 'Must not be empty' });
    }
    
    const newBlogItem = {
        title: request.body.title,
        body: request.body.body,
        createdAt: new Date().toISOString(),
        username: request.user.username

    }
    db
        .collection('blogs')
        .add(newBlogItem)
        .then((doc)=>{
            const responseBlogItem = newBlogItem;
            responseBlogItem.id = doc.id;
            return response.json(responseBlogItem);
        })
        .catch((err) => {
			response.status(500).json({ error: 'Something went wrong' });
			console.error(err);
		});
};



exports.deleteBlog = (request, response) => {
    const document = db.doc(`/blogss/${request.params.blogId}`);
    document
        .get()
        .then((doc) => {
            if(doc.data().username !== request.user.username){
                console.log('unauth)')
                return response.status(403).json({error:"UnAuthorized"})
           }
            if (!doc.exists) {
                return response.status(404).json({ error: 'Todo not found' })
            }
            response.json({ message: 'Delete successfull' });
            return document.delete();
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).json({ error: err.code });
        });
};

exports.editBlog = ( request, response ) => { 
    if(request.body.blogId || request.body.createdAt){
        response.status(403).json({message: 'Not allowed to edit'});
    }
    let document = db.collection('blogs').doc(`${request.params.blogId}`);
    document.update(request.body)
    .then(()=> {
        response.json({message: 'Updated successfully'});
    })
    .catch((err) => {
        console.error(err);
        return response.status(500).json({ 
                error: err.code 
        });
    });
};
