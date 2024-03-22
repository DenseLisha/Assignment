

/// storage.js
export const getPassengersData = () => {
    const data = localStorage.getItem('passengers');
    return data ? JSON.parse(data) : [];
  };
  
  export const storePassengersData = (passengers) => {
    localStorage.setItem('passengers', JSON.stringify(passengers));
  };
  
  