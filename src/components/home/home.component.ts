import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import p5 from 'p5';
import html2canvas from "html2canvas";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private http: HttpClient){}
  url ="http://localhost:5000/process";
  body: any;
  sketch: any;
  @ViewChild('screen') screen: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;
    Loading = false;
    Result = false;
    Refresh = false;
    capturedImage: any;
    images: any;
    canvas1: any;
    sw = 2;
    c = [];
    strokeColor = 0;
    title = 'PatternRecognitionProject';
    fileData: any;

    selectFile(event) {
        this.fileData = event.target.files[0];

        if (this.fileData.type === 'image/jpeg' || this.fileData.type === 'application/pdf' || this.fileData.type === 'image/png') {
        
        }
        else {
            alert('file type should be image of pdf');
            return;
        }

    }

    ngOnInit()
    {
        const sketch = s => {
            s.setup = () => {
              const canvas2 = s.createCanvas(256, 256);
              // creating a reference to the div here positions it so you can put things above and below
              // where the sketch is displayed
              canvas2.parent('sketch-holder');

              s.background(255);
              s.strokeWeight(this.sw);

              this.c[0] = s.color(0, 0, 0);
              this.c[1] = s.color(0, 0, 0);
              this.c[2] = s.color(0, 0, 0);
              this.c[3] = s.color(0, 0, 0);
              this.c[4] = s.color(0, 0, 0);
              this.c[5] = s.color(0, 0, 0);
              this.c[6] = s.color(0, 0, 0);

              s.rect(0, 0, s.width, s.height);

              s.stroke(this.c[this.strokeColor]);
            };

            s.draw = () => {
              if (s.mouseIsPressed) {
                if (s.mouseButton === s.LEFT) {
                  s.line(s.mouseX, s.mouseY, s.pmouseX, s.pmouseY);
                } else if (s.mouseButton === s.CENTER) {
                  s.background(255);
                }
              }
            };

            s.mouseReleased = () => {
              // modulo math forces the color to swap through the array provided
              this.strokeColor = (this.strokeColor + 1) % this.c.length;
              s.stroke(this.c[this.strokeColor]);
              // console.log(`color is now ${this.c[this.strokeColor]}`);
            };

            s.keyPressed = () => {
              if (s.key === 'c') {
                window.location.reload();
              }
            };
          };
            this.canvas1 = new p5(sketch);
        }

        Clear()
        {
          window.location.reload();
        }

        Process()
        { 
          this.Loading = true;
          html2canvas(this.screen.nativeElement, {width: 256, height:256}).then(canvas => {
            this.sketch = canvas.toDataURL();
          });

          setTimeout(()=>
          {
            if (this.fileData && this.fileData!=null)
            {
              this.body = this.fileData
            }
            else
            {
              this.body = this.sketch
            }
            
            this.http.post<any>(this.url,this.body).subscribe(
              (data) =>
              {
                this.images = data;
                console.log(data);
              },
              (err) =>
              {
                console.log(err);
              }
              );

          }, 600);
          setTimeout(()=>
          {
            this.Loading = false;
            this.Result = true;
            this.Refresh = true;
          }, 2500);
        }

        Capture()
        {
          html2canvas(this.screen.nativeElement, {width: 256, height:256}).then(canvas => {
            this.canvas.nativeElement.src = canvas.toDataURL();
            this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
            this.downloadLink.nativeElement.download = 'sketch.png';
            this.downloadLink.nativeElement.click();
          });
        }

        _Refresh()
        {
          this.Result = false;
          this.fileData = null;
          this.Clear();
        }


}
