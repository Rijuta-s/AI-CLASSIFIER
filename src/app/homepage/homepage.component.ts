import { Component, OnInit } from '@angular/core';
import { generating_folder } from 'src/app/homepage/mock-folders';
import { Folder } from 'src/app/homepage/folder';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http'


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  model:string;
  
  hyperparameter(event):void {
    this.model = event.target.value;    
  }
  folder_rename:boolean
  rename():void{
    this.folder_rename = true
    }
  show(x:string):void{
    this.model=x
  }
  block(x:string):void{
    this.model=x
  }
//generating-folders,adding data and selecting  filetype
  file_types: String
  file_type(event): void{
    this.file_types = event.target.value
  }

  Folders_generated: Folder[] =[]
  no_of_folders: number = 0
  folder_generated: boolean
  
  generate_folder(event): void
  {this.no_of_folders=event.target.value;
    this.folder_generated = true;
    this.Folders_generated = generating_folder(this.no_of_folders)
  }
//uploading files in folders
  
  Folders=[]
  folder_id: string
  folders_submitted:boolean = false
  FileData = new FormData
  
  uploadFile(event,folder_id){
    console.log(event)
    console.log(folder_id)
    let files=event.target.files
    console.log(files)
    this.Folders.push({folder_id,
    file:files}) 
    }

  onfoldersubmit(){
    this.folders_submitted = true
    console.log("Uploading file...");
    this.FileData.append("totalfolders", String(this.no_of_folders))
    
    this.Folders.forEach(folder => {
      let i = 0
      for (i = 0; i < folder.file.length; i++) {
        this.folder_id = folder.folder_id + "_" + String(i)
        console.log(this.folder_id)
        this.FileData.append(this.folder_id, folder.file[i])
        console.log(folder.file[i].name)
      }
      this.FileData.append(folder.folder_id,String(i))
    })
    }

  Folders_submit():boolean{
      if(this.Folders.length === 0 ){
        return true
      }
    }
//refresh and retrain commands
    onselectrefresh():void{
      this.no_of_folders=0;
      this.folder_generated = false;
    }
    reloadPage(){
      location.reload(true);
    }

 //form-data
  Details = new FormGroup({
    name: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    databasename: new FormControl(''),
 })

  hyperparameters= new FormGroup({
    LR: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    zip: new FormControl('')
  })
  
  details_submitted:boolean = false
  detail = new FormData()
  onDetails_Submit() {
    this.details_submitted = true
    this.detail.append("name", this.Details.get('name').value)
    this.detail.append("username", this.Details.get('username').value)
    this.detail.append("email", this.Details.get('email').value)
    this.detail.append("databasename", this.Details.get('databasename').value)
    console.log(this.Details.value);
  }
  onHyperParameters_Submit() {
    // TODO: Use EventEmitter with form value
    console.log(this.hyperparameters.value);
  }

  OnTrain(){
    if (!(this.folders_submitted && this.details_submitted && !(this.file_types === "false"))) {
      if(!(this.folders_submitted || this.details_submitted || !(this.file_types === "false"))){
        alert("Please submit details,folders and select 'file-type'")
      }
      else
      {if(!(this.folders_submitted || this.details_submitted)){
        alert("Please submit details,folders")
        }
      if(!(this.folders_submitted)){
        alert("Please submit folders")
        }
      if(!(this.details_submitted)){
        alert("Please submit details")
        }
      else{
        alert("Select file-type")
        }
      }
    }
    else {    
      this.http.post("http://127.0.0.1:5000", this.detail)
      .subscribe((result:{}) => {
        console.log("result",result)
      }, (error) => console.log('i got error from details', error))
      
      if (this.file_types === "eml") {this.http.post("http://127.0.0.1:5000/file-eml", this.FileData)
      .subscribe((result) => {
        console.log("result:",result)
      }, (error) => console.log('i got error from files from eml', error))   
      }
      
      if (this.file_types === "msg") {   
      this.http.post("http://127.0.0.1:5000/file-msg", this.FileData)
      .subscribe((result) => {
        console.log("result:",result)
      }, (error) => console.log('i got error from files from msg', error ))}
    }
  }



}
