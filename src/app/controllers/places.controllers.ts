import {Request, Response} from 'express'
import {getPlaceByIdFromApi, getPlacesFromApi} from "../services/places.services";
import {ApiPlaces} from "../models/places";
import {entries, get, groupBy, lowerCase, set, values} from 'lodash';
export const getPlace = async (req: Request<{ id: string }>, res: Response) => {
    const placeId = req.params.id;
    try {
        const place = await getPlaceByIdFromApi(placeId);
        return res.json(transformData(place, true));
    } catch (e) {
        console.log(e);
        return res.json(null);
    }
}

export const getPlaces = async (req: Request<undefined, undefined, undefined, {
    searchQuery: string
}>, res: Response) => {
    const searchQuery = lowerCase(req.query.searchQuery || '');
    console.log('Get All Places', searchQuery);
    try {
        const places = await getPlacesFromApi();
        const data = places.map(place => transformData(place))
            .filter(value => lowerCase(value.name).includes(searchQuery) || lowerCase(value.address).includes(searchQuery))
        return res.json(data);
    } catch (e) {
        console.log(e);
        return res.json(null);
    }
}

const transformData = (place: ApiPlaces, long?: boolean) => ({
    id: place.local_entry_id,
    name: place.displayed_what,
    address: place.displayed_where,
    ...(long ? {openingHours: groupOpeningHours(place.opening_hours)} : {})
})

export const groupOpeningHours = (data: any) => {
    const openingHours = dayOfTheWeek.reduce((prev, curr)=> {
        const currentVal = get(data.days,curr)
        if(currentVal){
            set(prev, curr, currentVal);
        } else {
            set(prev, curr, [{type: "CLOSED"}]);
        }
        return prev;
    }, {});
    // Group days with same opening hours
    const groupedHours = values(groupBy(entries(openingHours), ([, hours]) => JSON.stringify(hours)));
    // Format the grouped data
    const formatted = {
        days: groupedHours.reduce((acc, group) => {
            if (group.length === 1) {
                acc[group[0][0]] = group[0][1];
            } else {
                acc[`${group[0][0]} - ${group[group.length - 1][0]}`] = group[0][1];
            }
            return acc;
        }, {})
    };

    // Update the original data with grouped hours


    return formatted.days;
}

const dayOfTheWeek = ["monday","tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday"];
