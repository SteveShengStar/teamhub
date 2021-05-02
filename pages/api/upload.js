const data = require("../../backend/data/index");
var formidable = require('formidable');

const fs = require('fs');

export default async (req, res) => {

    await data.initIfNotStarted();
    if (req.method === 'POST') {

        //const authStatus = await data.auth.checkAnyUser(req.headers['authorization'], res);

        //if (authStatus) {
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
                                let parts = fileData.split("\n");

                                // console.log(parts);
                                // console.log(parts.length);

                                for (let i = 1; i < parts.length; i++) {    // Skip the first line, which contains CSV file headers
                                    let subparts = parts[i].split(",");

                                    if (subparts.length !== 13) break;

                                    let name = subparts[1].trim();
                                    let firstName = name.split(" ")[0].trim();
                                    let lastName = name.split(" ")[1].trim();
                                    // let email = subparts[2];

                                    let program = subparts[4].split(" ")[0].trim();
                                    let term = subparts[4].split(" ")[1].trim();

                                    let subteam = subparts[6].trim();
                                    let lead = subparts[7].trim() === "Yes" ? true : false;


                                    let allMemberTypes = await data.memberTypes.getAll();

                                    var memberType;
                                    if (lead) {
                                        memberType = allMemberTypes.find(t => t.name === "Project Lead").name
                                    } else {
                                        memberType = allMemberTypes.find(t => t.name === "Member").name
                                    }

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
        //}
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