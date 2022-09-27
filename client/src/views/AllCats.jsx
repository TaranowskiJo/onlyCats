import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { getAllCats, deleteCatById, likeCatById } from "../services/internalApiService";
import { Socket } from 'socket.io-client';
import io from 'socket.io-client';

const AllCats = (props) =>{
    const [cats, setCats] = useState([]);
    // const randomUsername = faker.internet.userName() ; // Rowan Nikolaus
    // const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
    const [socket] = useState(() => io(':8000'));//enables client connection to server
 
    const [boxVisibility, setBoxVisibility] = useState(true);
    // const [likeImage, setLikeImage] = useState("")
    useEffect(() => {
    console.log("Is this running?");
    socket.on('Welcome',data => console.log(data));


    return () => socket.disconnect(true);
  })
    
    useEffect(() => {
        getAllCats()
            .then(data => {
                console.log(data.results)
                setCats(data.results)
                socket.emit("added_new_cat", data.results);
            })
            .catch(error =>[
                console.log(error)
            ])
    },[])

    const handleDelete = (idToDelete) => {
        deleteCatById(idToDelete)
            .then(data => {
                // There's no reason to stay on the page after the one item being viewed
                // has been deleted.
                console.log("delete and yeet")
                const filteredCats = cats.filter((cat) => {
                    return cat._id !== idToDelete
            })
            setCats(filteredCats)
            })
            .catch(err => {
                console.log(err)
            })
        }
    const handleLike = (idToLike) => {
        likeCatById(idToLike)
            .then(data => {
                // There's no reason to stay on the page after the one item being viewed
                // has been like.
                console.log("like!!")
                const filteredCats = cats.filter((cat) => {
                    return cat._id !== idToLike
            })
            setCats(filteredCats)
            })
            .catch(err => {
                console.log(err)
            })
        }
    
        const setLikeImage = () => {
            console.log("clicked!")
            
        
    } 
    // console.log(cats)

    return (
        <div className="body mx-auto ">
            <h2 className="text-center">Dashboard</h2>


            <div className="card-holder">
                {cats.map((cat) => {
                    const { _id, name, type, description, photo, likes, city, timestamps} = cat;
                    return (
                        <div key={_id} className="smc shadow mb-3 rounded text-center ">
                            <h3 className=""> { name } </h3>
                            <a href={ `cats/${city}` } className="link" >{city}</a>
                            
                            <p>{timestamps}</p>

                            <img src={photo} alt="cat photo"className="card-photo"/>

                            <p>{likes}</p>

                            <div className="actions">
                                <img src="images\comment.png" alt="comment-icon" className="comment"
                                    onClick={() => setBoxVisibility(false) }/>
                                <img src="images\heart.png" alt="heart-icon" id ="heart" className="heart" onClick={() => setLikeImage()}/>
                            </div>

                            <div className="post-body">
                                <p>{type}</p>
                                <p className="description">{description}</p>
                            </div>

                            {/* <button onClick={(e => handleDelete(_id))} className="btn btn-sm btn-outline-danger mx-1">
                                Delete
                            </button> */}
                        </div>
                        ) } )
                }
            </div>
                <div className={`chat-box ${boxVisibility ? "hide-box" : ""}`}>
                    <ul id="messages"></ul>
                    <form id="form" action="">
                        <input id="input" autoComplete="off" /><button>Send</button>
                    </form>
                </div>
            
        </div>
    )

}


export default AllCats;