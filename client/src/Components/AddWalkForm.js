import React, {useState} from "react";

function AddWalkForm({addWalk}) {
    const [formAllData, setFormAllData] = useState({
    walkusername: "",
    walkname: "",
    walklocation: "",
    walkaddress: "",
    walkcoordinates: "",
    walktypes: "",
    walklength: "",
    walkrating: "",
    walkdifficulty: "",
    walkdescription: "",
    walkphoto: "",
    });

const handleChange = (event) => {
    const name= event.target.name;
    const value= event.target.value;
    setFormAllData((state) => ({
        ...state,
        [name]: value,
    }));
    console.log(value);
};
   
   
const handleSubmit = (event) =>{
    event.preventDefault();
    addWalk(formAllData);
    addnewWalk();
};

const addnewWalk = () => {
    fetch("/add-walk", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
        walk_name: formAllData.walkname,
        location: formAllData.walklocation,
        address: formAllData.walkaddress,
        Coordinates: formAllData.walkcoordinates,
        types: formAllData.walktypes,
        length: formAllData.walklength,
        rating: formAllData.walkrating,
        difficulty: formAllData.walkdifficulty,
        description: formAllData.walkdescription,
        photo_url: formAllData.walkphoto,
        user_name: formAllData.walkusername,
        }),
})
    .then((res) => res.json())
    .then(json => {
        setFormAllData(json);
    })
    .catch(error => {
       // upon failure, show error message 
    })
}

return (
        <div class="container">
        <form class="walkform" onSubmit={handleSubmit}>
        <h2 class="title"> Do you want to share your walk? </h2>
            
            <div className="row">

                <div class ="form-group col-md-4">
                    <label className="form-label"> What is your username?</label>
                    <input 
                        name="walkusername"
                        type = "text"
                        value={formAllData.walkusername}
                        onChange={handleChange}
                        class="form-control"
                        required
                    />
                </div>

                <div class ="form-group col-md-4">
                    <label className="form-label"> What is the name of the walk?</label>
                    <input 
                        name="walkname"
                        type = "text"
                        value={formAllData.walkname}
                        onChange={handleChange}
                        class="form-control"
                        required
                    />
                </div>

                <div class ="form-group col-md-4">
                    <label className="form-label"> What was the location?</label>
                    <input 
                        name="walklocation"
                        type = "text"
                        value={formAllData.walklocation}
                        onChange={handleChange}
                        class="form-control"
                        required
                    />
                </div>

                <div class ="form-group col-md-4">
                    <label className="form-label"> What was the address?</label>
                    <input 
                        name="walkaddress"
                        type = "text"
                        value={formAllData.walkaddress}
                        onChange={handleChange}
                        class="form-control"
                        required
                    />
                </div>

                <div class ="form-group col-md-4">
                    <label className="form-label"> What were the coordinates?</label>
                    <input 
                        name="walkcoordinates"
                        type = "text"
                        value={formAllData.walkcoordinates}
                        onChange={handleChange}
                        class="form-control"
                        required
                    />
                </div>

                <div class ="form-group col-md-4">
                    <label className="form-label"> What was the type?</label>
                    <input 
                        name="walktypes"
                        type = "text"
                        value={formAllData.walktypes}
                        onChange={handleChange}
                        class="form-control"
                        required
                    />
                </div>

                <div class ="form-group col-md-4">
                    <label className="form-label"> What was the length?</label>
                    <input 
                        name="walklength"
                        type = "text"
                        value={formAllData.walklength}
                        onChange={handleChange}
                        class="form-control"
                        required
                    />
                </div>

                <div class ="form-group col-md-4">
                    <label className="form-label"> What was the rating?</label>
                    <input 
                        name="walkrating"
                        type = "text"
                        value={formAllData.walkrating}
                        onChange={handleChange}
                        class="form-control"
                        required
                    />
                </div>

                <div class ="form-group col-md-4">
                    <label className="form-label"> What was the difficulty?</label>
                    <input 
                        name="walkdifficulty"
                        type = "text"
                        value={formAllData.walkdifficulty}
                        onChange={handleChange}
                        class="form-control"
                        required
                    />
                </div>

                <div class ="form-group col-md-4">
                    <label className="form-label"> What was the description?</label>
                    <input 
                        name="walkdescription"
                        type = "text"
                        value={formAllData.walkdescription}
                        onChange={handleChange}
                        class="form-control"
                        required
                    />
                </div>

                <div class ="form-group col-md-4">
                    <label> Do you want to add a photo of your walk?</label>
                    <input 
                        name="walkphoto"
                        type = "link"
                        value={formAllData.walkphoto}
                        onChange={handleChange}
                        class="form-control"
                        required
                    />
                </div>
            </div>
            <button class="btn btn-secondary btn-lg" >SHARE</button>
        </form>
        </div>
    );
};

export default AddWalkForm;