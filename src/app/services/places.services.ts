import axios from "axios";
import {ApiPlaces} from "../models/places";

const places = ['GXvPAor1ifNfpF0U5PTG0w', 'ohGSnJtMIC5nPfYRi_HTAg'];
const apiUrl = 'https://storage.googleapis.com/coding-session-rest-api'
export const getPlaceByIdFromApi = async (id: string): Promise<ApiPlaces> => {
    const response = await axios.get(`${apiUrl}/${id}`);
    return response.data;
}
export const getPlacesFromApi = (): Promise<Awaited<ApiPlaces>[]> =>
    Promise.all(places.map(getPlaceByIdFromApi));
