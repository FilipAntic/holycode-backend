import {getPlaceByIdFromApi} from "../app/services/places.services";

describe('Sum function', () =>{
    test('Returns correct value', async () =>{
        const place = await getPlaceByIdFromApi('GXvPAor1ifNfpF0U5PTG0w');
        console.log(place);
        expect(place.displayed_where).toBe('Stampfenbachstrasse 38, 8006 Zürich');
    })
})
