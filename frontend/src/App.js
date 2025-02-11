import {useEffect, useState} from "react";
import axios from "axios";


const App = () => {
  const [applications, setApplications] = useState([])
  useEffect(() => {
    axios.get('/api/application').then(({data}) => {
      setApplications(data)
    })
  },[])
  return (
      <div>
        {
          applications.map(application=><div key={application.id}>{JSON.stringify(application.id)}</div>)
        }
      </div>
  );
};

export {App};
