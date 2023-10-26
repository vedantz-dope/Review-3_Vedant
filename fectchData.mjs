export var clubName = [];
export var facultyCoordinator = [];
export var Contact = [];

export default async function fetchData(){
    try{
        let promise = await fetch('http://localhost:80/',{
            method: 'GET'
        })
        let data = await promise.json();
        // console.log(data);
        for (let i=0; i<data.length; i++){
            clubName[i] = data[i].Clubs;
            facultyCoordinator[i] = data[i].FacultyCoordinator;
            Contact[i] = data[i].Contact;
        }
        // console.log(clubName);
        // console.log(facultyCoordinator);
        // console.log(Contact);
        return clubName, facultyCoordinator, Contact, data.length;
    } catch(error){
        console.log("Some Error Occured");
        console.log(error);
    }
}

// fetchData();