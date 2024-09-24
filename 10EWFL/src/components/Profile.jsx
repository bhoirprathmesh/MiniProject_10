import { useEffect, useState } from 'react';
import UserAvatar from '../assets/UserAvatar.png';

function Profile() {

    const [profileData,setProfileData] = useState( {
      email: "abc@gmail.com",
      Name: "ABCD",
      greenPoints: 0,
      role: "Normal"
    });

    async function getProfileDataReq()
    {
      const token = localStorage.getItem('token');
      const response = await fetch("http://localhost:4000/profile/getProfileDetails",{

        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },

      });

      if(!response.ok){
          console.log("not ok in sendLoginRequestWithToken");
      }
      else{
        const data = await response.json() ;
        setProfileData(data.ProfileDetails);
      }
    }

    useEffect(()=>{
      getProfileDataReq();
    },[]);

  return (
    <div className=" w-full h-[88vh] flex justify-center bg-white   ">
        
        <div className=" w-[90%] flex gap-10 mt-[10vh] h-[40vh] border-2 border-gray-500 shadow-xl bg-green-200 rounded-2xl ">

          {/* left */}
          <div className=" w-[30%] p-2 flex flex-col items-center h-full  ">

              <img src={UserAvatar} alt="" className=" w-[130px] h-[130px] border border-black rounded-xl " />
              <h1 className=' font-semibold '>Green Points</h1>
              <h1 className=' font-bold text-green-600 '> {profileData.greenPoints} </h1>

          </div>

          {/* right */}
          <div className=" w-[70%] flex flex-col items-center justify-center gap-2 h-full font-montserrat  ">

              <div className=' flex justify-start gap-2  w-[50%] '> 
                <p>Name </p>
                <p>:</p>
                <p>{profileData.Name}</p>
              </div>

              <div className=' flex justify-start gap-2  w-[50%] '> 
                <p>Email </p>
                <p>:</p>
                <p>{profileData.email}</p>
              </div>

              <div className=' flex justify-start gap-2  w-[50%] '> 
                <p>Role </p>
                <p>:</p>
                <p> {profileData.role} </p>
              </div>


          </div>

        </div>

    </div>
  )
}

export default Profile