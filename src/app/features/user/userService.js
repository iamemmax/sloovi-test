import axios from "axios";
const API_URL = "https://stage.api.sloovi.com"


export const Login = async (userData) => {
  // console.log(userData);
  const response = await axios.post(`${API_URL}/login`, userData, {
    headers: {

      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },

  });
  return response.data;
};


// Assign User
export const AssignUser = async (company_id, token) => {
  const response = await axios.get(`${API_URL}/team?product=outreach&company_id=${company_id}`, {
    headers: {

      'Accept': 'application/json',

      'Authorization': 'Bearer ' + token,
    },

  });
  console.log(response.data);
  return response.data;
};





// export const AddTask = async (userData, company_id, token) => {
//   const response = await axios.post(`${API_URL}/task/lead_465c14d0e99e4972b6b21ffecf3dd691`, {
//     userData,
//     headers: {

//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//       'Authorization': 'Bearer ' + token,

//     }
//   });
//   // console.log(response.data);
//   console.log({userData});
//   return response.data;
// };



export const AddTask = async (userData, company_id, token) => {

  // var d = new Date();  // -> "7:38:05 AM"

  var hms = userData?.task_time;  // time input string
  var a = hms.split(':'); // split it at the colons
  // minutes are worth 60 seconds. Hours are worth 60 minutes.
  var taskTimeSeconds = (+a[0]) * 60 * 60 + (+a[1]);

  const response = await axios.post(`${API_URL}/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=${company_id}`,
    { ...userData, task_time: taskTimeSeconds }, {
    headers: {

      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,

    }
  }
  );
  console.log({ hms, a });
  return response.data;
};

// export const UpdateTask = async (userData, company_id, token) => {

//   console.log(id)
//   console.log({ hms, a });
//   return response.data;
// };


export const GetTask = async (company_id, token) => {
  const response = await axios.get(`${API_URL}/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=${company_id}`, {
    headers: {

      'Accept': 'application/json',

      'Authorization': 'Bearer ' + token,
    },

  });
  console.log(response.data);
  return response.data;
};


export const DeleteTask = async (id, company_id, token) => {
  const response = await axios.delete(`${API_URL}/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${id}?company_id=${company_id}`, {
    headers: {

      'Accept': 'application/json',

      'Authorization': 'Bearer ' + token,
    },

  });
  console.log(response.data);
  console.log(id);
  return response.data;
};




