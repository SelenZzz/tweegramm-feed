export const useGetRequest = (
  url: string,
  onResponse: (json: any) => void,
  onError?: () => void,
) => {
  const toUrlParams = (urlStr: string, body: any) => {
    const url = new URL(urlStr);
    Object.keys(body).forEach((key) => url.searchParams.append(key, body[key]));
    return url.toString();
  };

  const getRequest = async (body: any) => {
    const paramUrl = toUrlParams(url, body);

    fetch(paramUrl, { method: 'GET' })
      .then((response) => response.json())
      .then((responseJson: any) => {
        onResponse(responseJson);
      })
      .catch((e) => {
        console.log('Error during GET request:', e);
        if (onError) onError();
      });
  };

  return { getRequest };
};
