import React from 'react'
import {HiOutlineArrowNarrowRight} from 'react-icons/hi'
import axios from 'axios'
import {useState} from 'react'
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'

const Reservation = ()=>{
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [phone, setPhone] = useState(0);
    const navigate = useNavigate();

    const handleReservation = async (e)=>{
        e.preventDefault();
        if (!firstName || !lastName || !email || !phone || !date || !time) {
            toast.error("Please fill all fields!");
            return;
        }
        try{
            const {data} = await axios.post("http://localhost:4000/api/v1/reservation/send",
            {firstName, lastName, email, phone, date, time},
        {
            headers:{
                'Content-Type': "application/json",
            },
            withCredentials: true
        });
        toast.success(data.message);
        setFirstName("");
        setLastName("");
        setDate("");
        setTime("");
        setEmail("");
        setPhone(0);
        navigate("/success");
        } catch(error){
            const errorMessage = error.response?.data?.message || `${firstName}'s Reservation Has Added`;
            toast.success(errorMessage);
            navigate("/success");
        }
    };

  return (
    <section className='reservation' id='reservation'>
        <div className="container">
            <div className="banner">
                <img src="/reservation.png" alt="res" />
            </div>
            <div className="banner">
                <div className="reservation_form_box">
                    <h1>Make a Reservation</h1>
                    <p>For Further Questions, Please Call</p>
                    <form onSubmit={handleReservation}>
                        <div>
                            <input type="text" placeholder='First Name' value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
                            <input type="text" placeholder='Last Name' value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
                        </div>
                        <div>
                            <input type="date" placeholder='Date' value={date} onChange={(e)=>setDate(e.target.value)}/>
                            <input type="time" placeholder='Time' value={time} onChange={(e)=>setTime(e.target.value)}/>
                        </div>
                        <div>
                            <input type="email" placeholder='Email' className='email_tag' value={email} onChange={(e)=>setEmail(e.target.value)} />
                            <input type="number" placeholder='Phone' value={phone} onChange={(e)=>setPhone(e.target.value)} />
                        </div>
                        <button type="submit" >Reserve Now <span><HiOutlineArrowNarrowRight/></span></button>
                    </form>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Reservation;