import * as danfo from "danfojs-node";
import * as fs from "fs/promises";

const schools = [
    'Keller Elementary',
    'Juanita Elementary',
    'Twain Elementary',
    'Rush Elementary',
    'McAuliffe Elementary',
    'Bell Elementary',
    'Alcott Elementary',
    'Kirk Elementary',
    'Einstein Elementary',
    'Rockwell Elementary',
    'Rose Hill Elementary',
    'Franklin Elementary',
    'Dickinson Elementary',
    'Thoreau Elementary',
    'Summer School',
    'Sandburg Elementary',
    'Redmond Elementary',
    'Baker Elementary',
    'Barton Elementary',
    'Smith Elementary',
    'Muir Elementary',
    'Carson Elementary',
    'Wilder Elementary',
    'Mead Elementary',
    'Special Services',
    'Lakeview Elementary',
    'Rosa Parks Elementary',
    'Audubon Elementary',
    'Mann Elementary',
    'Discovery Elementary',
    'Frost Elementary',
    'Blackwell Elementary',
    'Community School',
    'Explorer Elementary',
    'Emerson K-12',
    'Contractual School',
    'Environmental',
    'Timberline Middle School',
    'Redmond Middle School',
    'Rose Hill Middle School',
    'Finn Hill Middle School',
    'Kamiakin Middle School',
    'Evergreen Middle School',
    'Kirkland Middle School',
    'Inglewood Middle School',
    'International',
    'Stella Schola',
    'Northstar Middle School',
    'Renaissance',
    'Eastlake High School',
    'WaNIC Summer School',
    'Redmond High School',
    'Lake Washington High School',
    'STEM School',
    'Emerson High School',
    'WaNIC Skill Center',
    'WANIC Skill Center',
    'WANIC Summer School',
    'Futures School'
];

function titleCase(input: string): string {
    try {
        return input
            .toLowerCase()
            .replace(/(?:^|\s)\w/g, match => match.toUpperCase());
    } catch (e) {
        console.log(typeof input)
        return "#ERR!";
    }
}

function pbcopy(data: string) {
    const proc = require('child_process').spawn('pbcopy');
    proc.stdin.write(data); proc.stdin.end();
}

void (async () => {
    /*let df = await danfo.readCSV("./exportUsers_2023-12-16.csv");

    df = df.query(df["userType"].eq("Member"));
    df = df.drop({columns: ["mail", "userType", "accountEnabled", "streetAddress", "usageLocation", "state", "country", "city", "postalCode", "ageGroup", "invitationState", "identityIssuer", "mobilePhone", "consentProvidedForMinor", "legalAgeGroupClassification", "creationType", "directorySynced", "alternateEmailAddress", "companyName", "createdDateTime", "telephoneNumber", "officeLocation", "displayName"]});
    df = df.asType("jobTitle", "int32");
    df = df.dropNa({axis: 1});
    df = df.rename({userPrincipalName: "email", givenName: "firstName", surname: "lastName", jobTitle: "grade", department: "school"});
    df = df.sortValues("grade");

    const firstName = df["firstName"].values;
    const lastName = df["lastName"].values;
    df = df.drop({columns: ["firstName", "lastName"]});
    df = df.addColumn("fullName", firstName.map((x, i) => titleCase(String(x)) + " " + titleCase(String(lastName[i]))));

    const school = df.column("school");
    df = df.drop({columns: "school"});
    df = df.addColumn("school", school.map(Object.fromEntries(schools.map((school, index) => ([school, index])))));

    df = df.asType("school", "int32");
    df = df.dropNa({axis: 1});

    await fs.writeFile("./users_2023_12_16.csv", danfo.toCSV(df) as string);

    df = await danfo.readCSV("./exportGroup_2023-12-18.csv");
    df = df.query(df["groupType"].eq("Microsoft 365"));
    df = df.drop({columns: ["groupType", "membershipType", "securityEnabled", "source", "mailEnabled", "isAssignableToRole", "onPremisesSyncEnabled"]});

    await fs.writeFile("./groups_2023_12_18.csv", danfo.toCSV(df) as string);*/
    let df = await danfo.readCSV("./users.csv");
    import("nanoid").then(nnid => {
        const records = df.values.map(x => ({email: x[0], id: x[1], grade: x[2], name: x[3], school: x[4], _id: nnid.nanoid(12)}));
        /*const records = df.values.map((x: (string | number)[]) => ({email: x[0], id: x[1], grade: x[2], name: x[3], school: x[4]}))
        console.log(records[0]);
        /!*console.log(JSON.stringify(records).substring(0, 100))*!/
        pbcopy(JSON.stringify(records));*/
        const query = records.map(x => `UPDATE user:${x._id} CONTENT { email: '${x.email}', grade: ${x.grade}, id: user:${x._id}, identifier: '${x.id}', name: '${x.name.replace("'", "\\''")}', school: ${x.school} };`).join("\n");
        pbcopy(query);
    })
    // UPDATE user:bz7n33823d4tczu5mkdb CONTENT { email: 's-jgiri@lwsd.org', grade: 8, id: user:bz7n33823d4tczu5mkdb, identifier: 'hi', name: 'Jai Giri', school: 42 };
})();