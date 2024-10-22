const urlApi = process.env.NEXT_PUBLIC_API_URL;

if (!urlApi) {
  throw new Error("Url no existe");
}

export { urlApi };
