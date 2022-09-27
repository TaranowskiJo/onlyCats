import { useEffect,useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
        getCatByCity,
    } from "../services/internalApiService";


const CatCity = (props) => {
    const { city } = useParams(); //pulls id out of the parameters
    const [ cityCats, setCityCats] = useState([]);

    const navigate = useNavigate(); //creates navigation obj using useNav hook

    // console.log(city);
    
    useEffect(() => {
        getCatByCity(city) //takes id from parameters above
            .then(data => {
                // console.log("data is", data)
                setCityCats(data.results)
            })
            .catch(err =>{
                // console.log(err)
            })
        },[city])


        if(cityCats === null){
            return <h2> dis bitch empty. nyah</h2>
        }

    //destructuring  pulls name and price  and stores 
    //so that lines 32,33 don''t have to be product.name,product.price
    // const {  name, type,description, photo, city } = cat;

    return (
        <div className="body mx-auto">
        <h2 className="text-center"> {city}'s Locals </h2>
        
            <div className="card-holder">

                {cityCats.map((cat) => {
                    const { _id, name, type, description, photo,likes, timestamps} = cat;
                    return (
                        <div key={_id} className="smc shadow mb-2 rounded text-center">
                            <h2>{name}</h2>
                            <a href={ `cats/${city}` } className="link" >{city}</a>

                            <p>{timestamps}</p>

                            <img src={photo} alt= {name} className="card-photo"/>
                            
                            <p>{likes}</p>

                            <div className="actions">
                                <img src="images\comment.png" alt="comment-icon" className="comment"/>
                                <img src="images\heart.png" alt="heart-icon" className="heart"/>
                            </div>

                            <div className="post-body">
                                <p>{type}</p>
                                <p className="description">{description}</p>
                            </div>
                            

                        </div>
                )})}
            </div>
        </div>
    )
    
}
//ONLY 1 Defaul per file
export default CatCity;