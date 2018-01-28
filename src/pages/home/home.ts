import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { Printer, PrintOptions } from '@ionic-native/printer';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	printers: any;

  constructor(public navCtrl: NavController, private bluetoothSerial: BluetoothSerial, private printer: Printer) {
  	this.printers = [];
  }

  read()
  {
  	
  	console.log('read', this.printer)
  	var avail= this.printer.isAvailable()
  	console.log(avail)
  	if(avail)
  	{
	  	let options: PrintOptions = {
		     name: "8C:DE:52:DA:9E:AB",
		     printerId: "8C:DE:52:DA:9E:AB",
		     duplex: true,
		     landscape: true,
		     grayscale: true
		   };
		let content = 'hello world';
		this.printer.print(content, options).then(function(res){
			console.info(res)

		}, function(err){
			console.error(err)
		});
  		
  	}

  	this.bluetoothSerial.discoverUnpaired()
  	.then((res)=>{
		this.printers = res;
  		console.log(res)
  	})
  }

  connect(item)
  {
  	console.log(item)
  /*	var connected = this.bluetoothSerial.connect(item.address)
  	console.log(connected)
  	this.bluetoothSerial.isConnected()
  	.then(function(res){
  		console.log(res)

  	}, function(err){
  		console.error(err)
  	})*/
  	this.print(item.address)
  }

  print(address)
  {
  	let printData="Test hello this is a test \n\n\n\n Hello Test 123 123 123\n\n\n"

    
    let xyz=this.bluetoothSerial.connect(address).subscribe(data=>{
      this.bluetoothSerial.write(printData).then(dataz=>{
        console.log("WRITE SUCCESS",dataz);

        xyz.unsubscribe();
      },errx=>{
        console.log("WRITE FAILED",errx);
      });
      },err=>{
        console.log("CONNECTION ERROR",err);
        
      });
  }
}
