export default generateHeaders = () => {
    return {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
};