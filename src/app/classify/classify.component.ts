import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Component({
  selector: 'app-classify',
  templateUrl: './classify.component.html',
  styleUrls: ['./classify.component.scss']
})
export class ClassifyComponent implements OnInit {

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }
  folder_no:String ="0"
  folder_id:string
  filesuploaded:boolean = false
  FileData=new FormData()
  uploadFile(event):void {
    let files = event.target.files
    let i = 0
      for (i = 0; i < files.length; i++) {
        this.folder_id = this.folder_no + "_" + String(i)
        console.log(this.folder_id)
        this.FileData.append(this.folder_id, files[i])
        console.log(files[i].name)
      }
      this.filesuploaded = true
  }
  submitFile():void
  {
    this.http.post("http://127.0.0.1:5000/file-msg", this.FileData)
      .subscribe((result) => {
        console.log("result:",result)
      }, (error) => console.log('i got error from files from eml', error))   
      
  }
}
