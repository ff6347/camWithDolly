// camWithDolly.jsx
// creates a cam with a dolly
// not a big thing - but you can set the right zoom
// normally via script you can only create a 50mm cam
// so it uses to an expression to set the right zoom
// the idea came with SZ and some beer
// the day after i saw that tutorial below by David Biederbeck
// that has the super expression to set the right zoom:
// https://vimeo.com/45686886
// on the cams FOCUS DISTANCE
// length(POSITIONCAM,POSITION TARGET)

/* ------------------------------------------------ */
// Copyright (c)  2012 
// Fabian "fabiantheblind" Morón Zirfas  
// fabiantheblind.info
// Permission is hereby granted, free of charge, to any 
// person obtaining a copy of this software and associated
// documentation files (the "Software"), to deal in the Software
// without restriction, including without limitation the rights 
// to use, copy, modify, merge, publish, distribute, sublicense,
// and/or sell copies of the Software, and to  permit persons to 
// whom the Software is furnished to do so, subject to 
// the following conditions:  
// The above copyright notice and this permission notice
// shall be included in all copies or substantial portions of the Software.  
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
// IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF  CONTRACT,
// TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTIO
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.  

// see also http://www.opensource.org/licenses/mit-license.php


/* 

Camera 200 mm   640,360,-7111.11110817
Camera 135 mm   640,360,-4799.9999991
Camera 80 mm    640,360,-2844.44444487
Camera 50 mm    640,360,-1777.77777773
Camera 35 mm    640,360,-1244.44444457
Camera 28 mm    640,360,-995.55555564
Camera 24 mm    640,360,-853.33333336
Camera 20 mm    640,360,-711.11111113
Camera 15 mm    640,360,-533.33333329

 */

main();
function main(){

    app.beginUndoGroup("build 50mm Cam With Dolly");
    var curComp = app.project.activeItem;
    if (!curComp || !(curComp instanceof CompItem))
    {
        alert("Please select a Composition.");
        return;
    }

var cam = curComp.layers.addCamera("Cam1",[curComp.width/2,curComp.height/2]);
var dolly = curComp.layers.addNull();

  // make a unique name for the null
  dolly.source.name =  "dolly Cam1";
    dolly.threeDLayer = true;
    var strength = dolly("ADBE Effect Parade").addProperty("ADBE Slider Control");
        strength.name = "strength";  

     var perSecond = dolly("ADBE Effect Parade").addProperty("ADBE Slider Control");
    perSecond.name = "perSecond";
    dolly.position.expression = "wiggle(effect(\"perSecond\")(\"ADBE Slider Control-0001\"),effect(\"strength\")(\"ADBE Slider Control-0001\"));\n";
    cam.parent = dolly;
    cam.position.setValue([0,0,-1500]);

app.endUndoGroup();


// app.beginUndoGroup("XXXXXXXXXXXX");
//     var curComp = app.project.activeItem;
//     if (!curComp || !(curComp instanceof CompItem))
//     {
//         alert("Please select a Composition.");
//         return;
//     }


//      var myLayers = curComp.selectedLayers;
//     if(myLayers.length > 0){
        
//     var theLayers = new Array();
    


//     for (var i = 0; i < curComp.selectedLayers.length; i++) 
//     {
//         theLayers[i] =  curComp.selectedLayers[i];
        
//         }

//     for (var j = 0; j < theLayers.length; j++) 
//     {
//       // var layer = theLayers[j];
//       // var mask = layer.mask(0);
//       // var prop = mask.property("maskFeather");
//       //   prop.setValue([10,10]);
 
//     }
// }else{
//             alert("Please select at least one layer.");

//     return;
//     };
// // alert("reomved "+theLayers.length+" effects from selection");
// app.endUndoGroup();
}