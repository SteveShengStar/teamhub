const data = require("../../backend/data/index");
var formidable = require('formidable')

export default async (req, res) => {

    if (req.method === 'POST') {
        await data.initIfNotStarted();
        try {
            var form = new formidable.IncomingForm({ keepExtensions: true });
            var fields = {};

            form.parse(req)
                .on('fileBegin', (name, file) => {      // Set the local directory path for storing this uploaded file
                    file.path = 'uploads/' + file.name
                    fields[name] = file.path
                })
                .on('field', (name, value) => {         // Collect name/value pairs inside "fields" object
                    fields[name] = value
                })
                .on('end', () => {
                    console.log(fields);

                    res.setHeader('Content-Type', 'application/json');
                    res.statusCode = 200;
                    res.end( JSON.stringify({message: "Success."}) );
                });
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 500;
            res.end( JSON.stringify({message: "An error occurred while classifying the data."}) );
        }
    } else {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 404;
        res.end( JSON.stringify({message: "Endpoint could not be found."}) );
    }
}
export const config = {
    api: {
        bodyParser: false,
    },
};