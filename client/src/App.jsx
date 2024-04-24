import { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import { storage } from './utils/FirebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

function App() {

  const [profile, setProfile] = useState(null)
  const [user, setUser] = useState({
    name: "",
    description: "",
  })
  const [showuser, setShowuser] = useState([])

  // Get User Working
  useEffect(() => {
    axios.get(`${window.location.origin}/api/user/getuser`)
      .then((json) => {
        console.log(json.data.result); // Check the format of the data received
        setShowuser(json.data.result);
      })
      .catch(err => console.log(err.message));
  }, []);


  let name, value;
  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  }

  const getData = (e) => {
    e.preventDefault()

    const storageRef = ref(storage, `images/Profiles/${profile.name}`);
    uploadBytes(storageRef, profile).then((snapshot) => {
      getDownloadURL(snapshot.ref)
        .then((url) => {
          const payload = { name: user.name, description: user.description, profile: url };
          console.log(payload);
          axios.post(`${window.location.origin}/api/user/adduser`, payload)
            .then(json => {
              if (json.data.message == "Missing Required Field") {
                alert("All fields required")
              } else {
                // Fetch user data again after successfully adding a new user
                axios.get(`${window.location.origin}/api/user/getuser`)
                  .then((json) => {
                    setShowuser(json.data.result);
                    setUser({
                      name: "",
                      description: ""
                  })
                  })
                  .catch(err => console.log(err.message));
              }
              console.log(json.data.message);

            }).catch(err => console.log(err.message))
        }).catch((error) => alert(error.message));
    })




  }

  return (
    <>
      <div className="container">
        <h1 className='text-center mt-5'>POST - USER</h1>
        <div className="row mt-5">
          <div className="col-sm-6">
            <Form onSubmit={getData}>
              <Form.Group className="mb-3" >
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" required name='name' id='name' placeholder="Enter name"
                  onChange={handleInputs}
                  value={user.name} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" required name='description' id='description' placeholder="Enter Description"
                  onChange={handleInputs}
                  value={user.description} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Profile</Form.Label>
                <Form.Control className="form-control" onChange={(e) => setProfile(e.target.files[0])} type="file" id="formFile" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
          <div className="col-sm-6">
            <Table striped bordered hover>
              <thead className="text-center">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Profile</th>
                  <th>Joining Date</th>
                </tr>
              </thead>
              <tbody>
                {
                  showuser.map((val, key) => (
                    <tr key={key}>
                      <td>{key + 1}</td>
                      <td>{val.name}</td>
                      <td>{val.description}</td>
                      <td><img className='img-fluid text-center' style={{ height: "30px", width: "30px" }} src={val.profile} alt="" /></td>
                      <td>{val.joining}</td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
