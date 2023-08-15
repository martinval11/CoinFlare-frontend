export default async function request<Response>(
  url: string,
  config: RequestInit = {}
): Promise<void | Response> {
  return fetch(url, config)
    .then((response) => {
      if (response.ok) return response;
      throw new Error(`Error: ${response.status}`);
    })
    .then((response) => response.json())
    .then((data) => data as Response)
    .catch((error) => console.error(error));
}
