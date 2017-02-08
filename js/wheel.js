// define all of parameters of the wheel
var padding = {top:20, right:40, bottom:0, left:0},
            w = 400 - padding.left - padding.right,
            h = 400 - padding.top  - padding.bottom,
            r = Math.min(w, h)/2,
            rotation = 0,
            oldrotation = 0,
            picked = 100000,
            oldpick = [],
            color = d3.scale.category20();//category20c()
// database questions
var data = [
            {"label":"Question 1",  "value":"padding",  "question":"What CSS property is used for specifying the area between the content and its border?"}, // padding
            {"label":"Question 2",  "value":"nycda",  "question":"What is your school?"}, 
            {"label":"Question 3",  "value":"color",  "question":"What CSS property is used for changing the color of text?"}, //color
            {"label":"Question 4",  "value":"oggi",  "question":"How is your TA?"}, 
            {"label":"Question 5",  "value":"nyc",  "question":"Where is NYCDA Main Campus?"}, //font-size
            {"label":"Question 6",  "value":"background-color",  "question":"What CSS property is used for changing the background color of a box?"}, //background-color
            {"label":"Question 7",  "value":"nesting",  "question":"Which word is used for specifying an HTML tag that is inside another tag?"}, //nesting
            {"label":"Question 8",  "value":"bottom",  "question":"Which side of the box is the third number in: margin:1px 1px 1px 1px; ?"}, //bottom
            {"label":"Question 9",  "value":"sans-serif",  "question":"What are the fonts that don't have serifs at the ends of letters called?"}, //sans-serif
            {"label":"Question 10", "value":"period", "question":"With CSS selectors, what character prefix should one use to specify a class?"}, //period
            {"label":"Question 11", "value":"pound sign", "question":"With CSS selectors, what character prefix should one use to specify an ID?"}, //pound sign
            {"label":"Question 12", "value":"body", "question":"In an HTML document, which tag holds all of the content people see?"}, //<body>
            {"label":"Question 13", "value":"ul", "question":"In an HTML document, which tag indicates an unordered list?"}, //<ul>
            {"label":"Question 14", "value":"h1", "question":"In an HTML document, which tag indicates the most important heading of your document?"}, //<h1>
            {"label":"Question 15", "value":"margin", "question":"What CSS property is used for specifying the area outside a box?"}, //margin
            {"label":"Question 16", "value":"<>", "question":"What type of bracket is used for HTML tags?"}, //< >
            {"label":"Question 17", "value":"{}", "question":"What type of bracket is used for CSS rules?"}, // { }
            {"label":"Question 18", "value":"p", "question":"Which HTML tag is used for specifying a paragraph?"}, //<p>
            {"label":"Question 19", "value":"doctype", "question":"What should always be the very first line of code in your HTML?"}, //<!DOCTYPE html>
            {"label":"Question 20", "value":"head", "question":"What HTML tag holds all of the metadata tags for your page?"}, //<head>
            {"label":"Question 21", "value":"colon", "question":"In CSS, what character separates a property from a value?"}, // colon
            {"label":"Question 22", "value":"style", "question":"What HTML tag holds all of your CSS code?"}, // <style>
            {"label":"Question 23", "value":"html", "question":"What file extension should you use for your web pages?"}, // .html
            {"label":"Question 24", "value":"html", "question":"Which coding language is used for marking up content and structure on a web page?"}, // HTML
            {"label":"Question 25", "value":"css", "question":"Which coding language is used for specifying the design of a web page?"}, // CSS
            {"label":"Question 26", "value":"javascript", "question":"Which coding language is used for adding functionality to a web page?"}, // JavaScript
            {"label":"Question 27", "value":"border", "question":"What CSS property is used for making the edges of a box visible?"}, // border
            {"label":"Question 28", "value":"semi colon", "question":"What character symbol is used at the end of each CSS statement?"},//semi-colon
            {"label":"Question 29", "value":"100%", "question":"By default, how wide is a <div> box?"}, //100%
            {"label":"Question 30", "value":"comma", "question":"What character symbol do I use to specify multiple CSS selectors in one code block?"} //comma
];
// import d3js
var svg = d3.select('#chart')
    .append("svg")
    .data([data])
    .attr("width",  w + padding.left + padding.right)
    .attr("height", h + padding.top + padding.bottom);
    
var container = svg.append("g")
    .attr("class", "chartholder")
    .attr("transform", "translate(" + (w/2 + padding.left) + "," + (h/2 + padding.top) + ")");
var vis = container
    .append("g");
    
var pie = d3.layout.pie().sort(null).value(function(d){return 1;});
// declare an arc generator function
var arc = d3.svg.arc().outerRadius(r);
// select paths, use arc generator to draw
var arcs = vis.selectAll("g.slice")
    .data(pie)
    .enter()
    .append("g")
    .attr("class", "slice");
    
arcs.append("path")
    .attr("fill", function(d, i){ return color(i); })
    .attr("d", function (d) { return arc(d); });
// add the text
arcs.append("text").attr("transform", function(d){
        d.innerRadius = 0;
        d.outerRadius = r;
        d.angle = (d.startAngle + d.endAngle)/2;
        return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius -10) +")";
    })
    .attr("text-anchor", "end")
    .text( function(d, i) {
        return data[i].label;
    });
container.on("click", spin);


function spin(d){    
    container.on("click", null);
    //all slices have been seen, all done
    console.log("OldPick: " + oldpick.length, "Data length: " + data.length);
    if(oldpick.length == data.length){
        console.log("done");
        container.on("click", null);
        return;
    }
    var  ps       = 360/data.length,
         pieslice = Math.round(1440/data.length),
         rng      = Math.floor((Math.random() * 1440) + 360);
        
    rotation = (Math.round(rng / ps) * ps); //degree value how long it will spin
    picked = Math.round(data.length - (rotation % 360)/ps); //the value of which slice or which question that is picked
    picked = picked >= data.length ? (picked % data.length) : picked; // condition if the number slice picked is bigger than number of questions
    
    if(oldpick.indexOf(picked) !== -1){
        d3.select(this).call(spin);
        return;
    } else {
        oldpick.push(picked);
    }
    
    rotation += 90 - Math.round(ps/2);
    vis.transition()
        .duration(3000)
        .attrTween("transform", rotTween)
        .each("end", function(){
            //mark question as seen by blacking it out 
            d3.select(".slice:nth-child(" + (picked + 1) + ") path")
                .attr("fill", "#111");
            //populate question
            d3.select("#question h1")
                .text(data[picked].question);
                
            //populate answer using function from index.js
			guessAnswer(data[picked].value)
			console.log("answer "+data[picked].value)
			
			// event click on wheel
			$(".letter-button").on("click", function() {
				$(this).addClass("active")
				console.log("you clicked "+$(event.target).text())			
				showAnswer(checkAnswer($(event.target).text(),data[picked].value),data[picked].value)
			})
              
            oldrotation = rotation;   
            container.on("click", spin);
        });
}

//make arrow
svg.append("g")
    .attr("transform", "translate(" + (w + padding.left + padding.right) + "," + ((h/2)+padding.top) + ")")
    .append("path")
    .attr("d", "M-" + (r*.15) + ",0L0," + (r*.05) + "L0,-" + (r*.05) + "Z")
    .style({"fill":"black"});

//draw spin white circle in the middle
container.append("circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", 60)
    .style({"fill":"white","cursor":"pointer"});
    
//spin text
container.append("text")
    .attr("x", 0)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .text("SPIN")
    .style({"font-weight":"bold", "font-size":"30px"});


function rotTween(to) {
  var i = d3.interpolate(oldrotation % 360, rotation);
  return function(t) {
    return "rotate(" + i(t) + ")";
  };
}


