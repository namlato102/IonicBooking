import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild, Input } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss']
})
export class ImagePickerComponent implements OnInit {
  @ViewChild('filePicker', { static: false })
  filePickerRef!: ElementRef<HTMLInputElement>;

  @Output() imagePick = new EventEmitter<String | File | any>(); //to emit an event
  @Input() showPreview = false;
  selectedImage: string | undefined;
  usePicker = false;

  constructor(
    private platform: Platform
  ) {}
 
  ngOnInit() {
    console.log('Mobile:', this.platform.is('mobile'));
    console.log('Hybrid:', this.platform.is('hybrid'));
    console.log('iOS:', this.platform.is('ios'));
    console.log('Android:', this.platform.is('android'));
    console.log('Desktop:', this.platform.is('desktop'));
    if (
      (this.platform.is('mobile') && !this.platform.is('hybrid')) ||
      this.platform.is('desktop')
    ) {
      this.usePicker = true;
    }
  }

  onPickImage() {
    //assuming we r running on platform that camera is not available that when click go to file user
    if (!Capacitor.isPluginAvailable('Camera')) {
      this.filePickerRef.nativeElement.click();
      return;
    }
    Camera.getPhoto({
      quality: 50,
      source: CameraSource.Prompt, //asked whether we want to use camera or image gallary
      correctOrientation: true,
      height: 320,
      width: 200,
      resultType: CameraResultType.Base64 //the image is encoded into string and can convert to file (if we want to)
      //resultType: CameraResultType.DataUrl
    })
      .then(image => {
        this.selectedImage = `data:image/jpeg;base64,${image.base64String}`; //only availeble if Base64 is chosen
        //this.selectedImage=  image.dataUrl;
        this.imagePick.emit(image.base64String);
        //this.imagePick.emit(image.dataUrl);
      })
      .catch(error => {
        console.log(error);
        if (this.usePicker) {
          this.filePickerRef.nativeElement.click();
        }
        return false;
      });
  }

  onFileChosen(event: Event) {
    console.log(event)
    //const pickedFile = (event.target as HTMLInputElement).files[0];
    const inputElement = event.target as HTMLInputElement;
    if (!inputElement || !inputElement.files || inputElement.files.length === 0) {
      return;
    }
    const pickedFile = inputElement.files[0];

    if (!pickedFile) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.result !== null && fileReader.result !== undefined) {
        const dataUrl = fileReader.result.toString();
        this.selectedImage = dataUrl;
        this.imagePick.emit(pickedFile);
      } else {
        // Handle the case where fr.result is null or undefined.
        console.error('Error reading the file.');
        
      }
    };
    fileReader.readAsDataURL(pickedFile);//convert to 64string async task
  }

  

}
