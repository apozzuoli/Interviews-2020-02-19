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

app.get('/timeline', async(request: any, response: any) => {

    const timeline = new DailyImage();
    const datesRequest = request.query.dates;

    const times = datesRequest.split(',');


    var dates = [];
    // fill dates array with date objects
    for (var i = 0 ; i < times.length ; i++) {
        dates[i] = new Date(times[i]);
    }

    // sort the dates
    dates.sort((a,b) => a.getTime() - b.getTime());

    var result = [];

    // make an image request in order of dates
    for (var i = 0 ; i < dates.length ; i++) {
        var img = await timeline.getImageForDate(moment(dates[i]).format('YYYY-MM-DD'))
        result[i] = img;
    }

    response.send('{timeline: ' + JSON.stringify(result) + '}');

} );

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );
