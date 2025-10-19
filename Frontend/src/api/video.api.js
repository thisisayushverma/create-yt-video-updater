const handleGetAllVideo =async ()=>{
    try {
        const response =await  fetch(`${import.meta.env.VITE_BACKEND_URL}/video/all-video`,{
            credentials:"include",
            method:"GET"
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        throw error
    }
}

export {
    handleGetAllVideo
}