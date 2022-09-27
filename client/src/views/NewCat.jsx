import { useState } from "react";
import { useNavigate } from "react-router-dom"; //refrenced below in NewCat()
import { createCat } from "../services/internalApiService";
//imports the function from that file
//exports  function
export const NewCat = (props) => {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState("");
    const [city, setCity] = useState("");
    
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate(); //creates navigation obj using useNav hook




    const handleNewCatSubmit = (e) => {
        e.preventDefault();

        //creates a new Cat obj using state
        const newCat = {
            // name: name, is longhand but the key and var name match..
            name,
            type,
            description,
            photo,
            city
        }
        // passes this state info into the function createCat from intenalApiServicde
        createCat(newCat)
            //service returns only the data
            //if using axios directly, you need to use res.data
            .then(data =>{
                console.log("new cat data: ", data.results) //when in doubt add .results or checkout console on site
                navigate(`/cats`) //calls useNav to navigate us to this url
            })
            //errors may not exist, contitionally added using state
            .catch(error => {
                setErrors(error.response?.data?.errors);
                console.log(error.response)
            })
    }



    return (
        <div className="w-50 p-4 rounded mx-auto shadow mt-5">
        <h3 className="text-center">New Cat</h3>
        {/* form onSubmit function defined  above  */}
        <form
            onSubmit={(e) => {
                handleNewCatSubmit(e)
            }}
        >
        <div className="form-group">
            <label className="h6">Name</label>
            <input onChange={(event) => { setName(event.target.value);}}
                type="text"
                className="form-control"
            />
            { 
                name.length == 0? <p className='text-danger'> </p> :
                    name.length < 2 ?
                        <p className='text-danger'>Must be at least 2 characters in length!</p> : null
            }

            <label className="h6">Type</label>
            <input onChange={(event) => { setType(event.target.value);}}
                type="text"
                className="form-control"
            />
            { 
                type.length == 0? <p className='text-danger'> </p> :
                    type.length < 2 ?
                        <p className='text-danger'>Must be at least 2 characters in length!</p> : null
            }

            <label className="h6">Description</label>
            <input onChange={(event) => { setDescription(event.target.value);}}
                type="text"
                className="form-control"
            />
            { 
                description.length == 0? <p className='text-danger'> </p> :
                    description.length < 5 ?
                        <p className='text-danger'>Must be at least 5 characters in length!</p> : null
            }

            
            <label for="city">Found in:</label>
            <select name="city" className="h6" onChange={(event) => { setCity(event.target.value);}}>
                <option value="">Select City</option>
                <option value="Seattle">Seattle</option>
                <option value="Chicago">Chicago</option>
                <option value="San_Jose">San Jose</option>
                <option value="Miami">Miami</option>
            </select>

            <br></br>

            <label className="h6">Photo URL</label>
            <input onChange={(event) => { setPhoto(event.target.value);}}
                type="text"
                className="form-control"
            />
            
        </div>

        

        <button className="btn btn-sm btn-outline-success mt-3">Submit</button>
        </form>
    </div>
    )
    
} 
//exports a default
export default NewCat;
