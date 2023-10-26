import XLSX from 'xlsx';

var workbook = XLSX.readFile("ClubData.xlsx");
var sheet_name_list = workbook.SheetNames;

export default function exportValues(){
    return new Promise((resolve, reject) => {
        let data = [];
        sheet_name_list.forEach(function(y) {
            var worksheet = workbook.Sheets[y];
            var headers = {};
            for(let z in worksheet){
                if(z[0] === "!") continue;
                var col = z.substring(0, 1);
                var row = parseInt(z.substring(1));
                var value = worksheet[z].v;
                if (row == 1){
                    headers[col] = value;
                    continue;
                }
                if (!data[row]) data[row] = {};
                data[row][headers[col]] = value;
            }
            data.shift();
            data.shift(); 
        });
        resolve(data);
    });
}