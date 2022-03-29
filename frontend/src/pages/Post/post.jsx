import React, { useEffect, useState } from "react";
import axios from "axios";
import PostsCard from "./PostsCard";
import PostForm from "./PostForm";

const GetAllPosts = () => {
    const [data, setData] = useState([])
    const Token = localStorage.getItem("Token")
    const userId = JSON.parse(localStorage.getItem("newUser")).id 

    useEffect(() => {
        axios
        .get("http://localhost:5000/api/posts", {
            headers: {
                "x-access-token": Token,
            },
            params: {userId: userId},
        })
        .then(res => {
            setData(res.data)
        })
    }, [Token, setData, userId])
    const firstNameUser = JSON.parse(localStorage.getItem("newUser")).firstName
    const addnewpost = () => {
        window.location.reload()
    }
    return (
        <div className="posts">
          <div className="welcome">
            <h1>Bienvenue {firstNameUser}</h1>
          </div>
          <div>
            <PostForm addPost={addnewpost}></PostForm>
          </div>
          <ul className="posts-list">
            {data.map((posts, i) => (
              <PostsCard
                className="post-card"
                post={posts}
                key={i}
                addPost={addnewpost}
              />
            ))}
          </ul>
        </div>
      )
}

export default GetAllPosts;