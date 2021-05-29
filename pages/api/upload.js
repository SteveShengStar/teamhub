const data = require("../../backend/data/index");
var formidable = require('formidable');

const fs = require('fs');

export default async (req, res) => {

    await data.initIfNotStarted();
    if (req.method === 'POST') {
        console.log(req.headers);
        // const authStatus = await data.auth.checkAnyUser(req.headers['Authorization'], res);

        if (true) {
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
                        fs.readFile(fields['file'], 'utf8', async function (err, fileData) {
                            if (err) {
                                res.setHeader('Content-Type', 'application/json');
                                res.statusCode = 500;
                                res.end( JSON.stringify({message: "An error occurred while processing the data."}) );
                                return;
                            } else {
                                let parts = fileData.split("\n");           // Begin parsing the CSV file. Split the CSV file, line-by-line

                                for (let i = 1; i < parts.length; i++) {    // Skip the first line, which contains CSV file headers
                                    let subparts = parts[i].split(",");
                                    
                                    console.log(subparts.length)
                                    if (subparts.length !== 13) break;      // Stop parsing the file and exit if the uploaded CSV files doesn't have 13 columns of data

                                    let name = subparts[1].trim();          // Remove all whitespace from the front and back of the word
                                    let firstName = name.split(" ")[0].trim();      // Extract the first name from the current row of the CSV file
                                    let lastName = name.split(" ")[1].trim();       // Extract the last name from the current row of the CSV file
                                    // let email = subparts[2];

                                    let program = subparts[4].split(" ")[0].trim(); // Extract the school program from the current row of the CSV file
                                    let term = subparts[4].split(" ")[1].trim();    // Extract the school term (1A, 1B, 2A) from the current row of the CSV file

                                    let subteam = subparts[6].trim();               // Extract the subteam (ie. "Electrical" team, "Mechanical" team, "Web" team)
                                    let lead = subparts[7].trim() === "Yes" ? true : false;

                                    
                                    // Get the different types/categories of members stored in the database (ie. "Member" -- normal member, "Project Lead" -- leader of a project)
                                    let allMemberTypes = await data.memberTypes.getAll();
                                    var memberType;
                                    if (lead) {
                                        memberType = allMemberTypes.find(t => t.name === "Project Lead").name
                                    } else {
                                        memberType = allMemberTypes.find(t => t.name === "Member").name
                                    }
                                    console.log(firstName)
                                    console.log(lastName)

                                    // Update the database with data extracted from the CSV file.
                                    await data.members.updateMember({"name.first": firstName, "name.last": lastName}, 
                                                                    { subteams: [subteam],
                                                                      program: program,
                                                                      memberType: memberType}
                                                                    );
                                    await data.members.updateMember({ "name.first": firstName, "name.last": lastName}, 
                                                                    { $set: {'stream.currentSchoolTerm' : term}});
                                }

                                res.setHeader('Content-Type', 'application/json');
                                res.statusCode = 200;
                                res.end( JSON.stringify({message: "Successfully processed the data."}) );
                                return;
                            }
                        });
                    });
            } catch (error) {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 500;
                res.end( JSON.stringify({message: "An error occurred while processing the data."}) );
            }
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