import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../App.css";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
const CreatePost = () => {
  const [posted, setPosted] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const { register, handleSubmit } = useForm();

  const OnSubmitHandler = (data) => {
    const foo = location.state.foo;
    const bearer = "Bearer " + location.state.foo;
    fetch("https://travel-partner-backend.herokuapp.com/travel/", {
      method: "POST",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
      body: JSON.stringify(data),
    }).then((locations) => {
      locations.json().then((location) => {
        setPosted(true);
        console.log(location);
        setTimeout(() => {
          history.push("/dashboard", { off: foo });
        }, 900);
      });
    });
  };
  return (
    <div>
      <h1>create your post</h1>

      <form onSubmit={handleSubmit(OnSubmitHandler)}>
        <input
          type="text"
          placeholder="location"
          name="location"
          ref={register}
        />
        <input
          type="text"
          placeholder="starting date"
          name="startDate"
          ref={register}
        />

        <input type="submit" />
        {posted && <p> yay !!! Post created</p>}
      </form>
    </div>
  );
};

export default CreatePost;
