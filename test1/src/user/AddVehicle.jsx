import React, { useState } from 'react';
import { useAuthContext } from '../hooks/userHooks/useAuthContext';

const AddVehicleForm = () => {
  const { user } = useAuthContext();

    const[error,setError]=useState('')
    const[success,setSuccess]=useState('')
    const[loading,setLoading]=useState(null)

  const [carModel, setCarModel] = useState('');
  const [price, setPrice] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [numPictures, setNumPictures] = useState('');
  const [pictures,setPictures]=useState([])
  const handleSubmit = async(e) => {
    e.preventDefault();
    setError('')
    setSuccess('')
    setLoading(true)
    try{
const response=await fetch('/auth/user/vehicle/add',{
    method:"POST",
    headers:{
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
    },
    body:JSON.stringify({carModel,price,phone,city,numPictures,pictures})
})
const json=await response.json()
if(!response.ok){
    setError(json.message)
    setSuccess('')
    setLoading(null)
}
if(response.ok){
    setError('')
    setSuccess(json.message)
    setLoading(null)
    setNumPictures("")
    setCity("")
    setPhone("")
    setPrice("")
    setCarModel("")
}

    }catch(error){

    }    
  }
 
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (pictures.length === parseInt(numPictures)) {
      alert(`You can upload only ${numPictures} pictures.`);
    } else {
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          alert('File size exceeds the 5MB limit. Please select a smaller file.');
        } else {
          TransformFile(file);
        }
      } else {
        alert('No file selected.');
      }
    }
  };

  const TransformFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPictures([...pictures, reader.result]);
    };
  };

  console.log(pictures)
  return (
    <div className='container register_form'>
      <div className="row justify-content-center">
        <div className="col-md-8 shadow rounded pb-4 mb-5">
        <form onSubmit={handleSubmit}>
          <h4 className='text-center mt-4'>Add a new Vehicle</h4>
      <div><p>{success?success:error}</p></div>
      <div className='my-2'>
        <label className='my-1'>Car Model:</label>
        <input className='my-1' type="text" value={carModel} onChange={(e) => setCarModel(e.target.value)} required />
      </div>
      <div className='my-2'>
        <label className='my-1'>Price:</label>
        <input className='my-1' type="text" value={price} onChange={(e) => setPrice(e.target.value)} required />
      </div>
      <div className='my-2'>
        <label className='my-1'>Phone:</label>
        <input className='my-1' type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      </div>
      <div className='my-2'>

        <label className='my-1'>City:</label>
        <div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
  <label class="form-check-label" for="flexRadioDefault1">
    Lahore
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" value="Lahore" checked={city === 'Lahore'} onChange={() => setCity('Lahore')} type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
  <label class="form-check-label" value="Karachi" checked={city === 'Karachi'} onChange={() => setCity('Karachi')} for="flexRadioDefault2">
    Karachi
  </label>
</div>
        {/* <label>
          Lahore
          <input type="radio" value="Lahore" checked={city === 'Lahore'} onChange={() => setCity('Lahore')} />
        </label>
        <label>
          Karachi
          <input type="radio" value="Karachi" checked={city === 'Karachi'} onChange={() => setCity('Karachi')} />
        </label> */}
      </div>
      <div className='my-2'>
        <label className='my-1'>Number of Pictures:</label>
        <select  className='my-1' value={numPictures} onChange={(e) => setNumPictures(e.target.value)}>
          <option value="">Select</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
      <div className='my-2'>
        {pictures.map((picture, index) => (
          <img key={index} src={picture} alt={`Picture ${index + 1}`} style={{ maxWidth: '100px', maxHeight: '100px', marginRight: '5px' }} />
        ))}
      </div>
<label htmlFor="" className='my-1'>Upload images</label>
      <input className='my-1' type="file" accept='image/*' onChange={handleImage}  />
      <button type="submit" className='btn my-2' disabled={loading}>{loading?"Adding...":"Add New"}</button>
    </form>
        </div>
      </div>
    </div>
   
  );
};

export default AddVehicleForm;
