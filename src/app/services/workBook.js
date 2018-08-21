var Excel = require('exceljs');
const path = require('path');

class WorkBook {

    constructor() { 
        this._file = "sdsds";
        this._type = "";
        console.error("Inside workbo0k"+this);
     }
    
    readData(req, res) {
        console.log("Inside workbo0k"+this);
        this._file = req.body;
        this._type = this._file.type;
        this.createWorkBook(res);
    }
    createWorkBook(res) {
        var workBook = new Excel.Workbook();
        workBook.creator = "AJAY";
        workBook.created = new Date(2018, 8, 17);

        var workSheet = workBook.addWorksheet("sheet1", { properties: { tabColor: { argb: 'FF00FF00' } } });

        workSheet.columns = [
            { header: "ID", key: 'id', width: 10 },
            { header: "NAME", key: 'name', width: 20 },
            { header: "PHONE NUMBER", key: 'pno', width: 20 }
        ];
        workSheet.addRow([1, "myfirstExcel1", 121212121212]).commit();
        workSheet.addRow([2, "myfirstExcel1", 121212121212]).commit();
        workSheet.addRow([3, "myfirstExcel1", 121212121212]).commit();
        workSheet.addRow([4, "myfirstExcel1", 121212121212]).commit();
        workSheet.addRow([5, "myfirstExcel1", 121212121212]).commit();
        workSheet.addRow([6, "myfirstExcel1", 121212121212]).commit();
        workSheet.addRow([7, "myfirstExcel1", 121212121212]).commit();

        // workBook.xlsx.writeFile('./temp.xlsx').then(() => {
        //     console.log("file has written")
        // });

        workBook.csv.writeFile('./public/temp.'+this._type).then(() => {
            console.log("file has written");
            res.setHeader('Content-disposition', 'attachment; filename=data.'+this._type);
            res.set('Content-Type', 'text/'+this._type);
            res.sendFile(path.resolve('./public/temp.'+this._type), (err) => {
                if (err) {
                    console.log("error in downloading file", err);
                }
            })
        });
    };
}




module.exports = WorkBook;