export const usePostRequest = (url: string, onResponse: (json: any) => void) => {
  const postRequest = async (body: any) => {
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((responseJson: any) => {
        onResponse(responseJson);
      })
      .catch((e) => {
        console.log('Error during POST request:', url, 'body:', body, e);
      });
  };

  return { postRequest };
};
