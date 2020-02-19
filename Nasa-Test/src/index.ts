import express from 'express';
import moment from 'moment';
import { DailyImage } from './nasa/daily-image';

const app = express();
app.use(express.json());
const port = 8002; // default port to listen

// define a route handler for the default home page
app.get( '/', async ( request: any, response: any ) => {
    response.send({});
} );

// Handle get requests to /nasa
app.get( '/daily', async ( request: any, response: any ) => {
    const daily = new DailyImage();
    // Sends in today's date as a formatted string
    const result = await daily.getImageForDate(moment().format('YYYY-MM-DD'));
    // Sends back the result of the image getter
    response.send(result);
} );

/** Fetches the pictures of the day for each date in the request
* Idea would be to take in the string, split it by its commas, then sort by the
* date. Make a series of requests with those dates to DailyImage then return the
* image output.
*
*
* @param request the dates separated by commas
*
*/
app.get('/timeline', async(request: string, response: string[]) => {

    /* array of times*/
    const times[] = request.split(",");

    /*daily image class*/
    const img = new DailyImage();

    const dates[];
    // fill dates array with date objects
    for (i = 0 ; i < times.length ; i++) {
        dates[i] = new Date(times[i]);
    }

    /*sort the dates*/
    const sortedDates = dates.sort((a,b) => b.date - a.date);

    const result[];

    //make an image request in order of dates
    for (i = 0 ; i < sortedDates.length ; i++) {
        result[i] = await img.getImageForDate(sortedDates[i].format('YYYY-MM-DD'));
    }

    response.send(result);

} );

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );
