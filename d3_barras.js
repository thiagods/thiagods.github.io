var margin = 25;
var width = 300;
var height = 150;

function desenha_barras(data, cidade, ano){

	var max = d3.max(data);

	var x = d3.scaleBand()
				.domain([1,2,3,4,5,6,7,8,9,10,11,12])
				.range([0,width]);
			
	var y = d3.scaleLinear()
				.domain([0,max+Math.ceil(max*0.1)])
				.range([height,0]);


	var div_bar = d3.select("body")
					.append("div")   
					.attr("class", "tooltip")               
					.style("opacity", 0);

	var chart = d3.select(".chart");
	var titulo = cidade + " - " + ano.toString();

	chart.attr("width",width + 2*margin)
			.attr("height",height + 4*margin)
			.append("g")
			.attr("transform","translate(" + (margin+20) + "," + margin + ")")
			.selectAll("rect")
			.data(data)
			.enter().append("rect")
			.attr("width",margin-1)
			.attr("height",function(d) { return height - y(d); })
			.attr("x",function(d,i) { return x(i); })
			.attr("y",function(d) { return y(d); })
			.on('mouseover', mouseover_bar)
			.on('mouseout', mouseout_bar);

	chart.append("text")
        .attr("x", (width / 2)+margin+20)             
        .attr("y", margin)
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        // .style("text-decoration", "underline")  
        .text(titulo);

	chart.append("g")
			.attr("transform", "translate(" + (margin+20) + "," + margin + ")")
			.call(d3.axisLeft(y));

	chart.append("text")             
	      .attr("transform", "translate(" + (width-100) + " ," + (height + margin + 35) + ")")
	      .style("text-anchor", "middle")
	      .text("Meses");

	chart.append("g")
			.attr("transform", "translate(" + (margin+20) + "," + (height+margin) + ")")
			.call(d3.axisBottom(x));

	chart.append("text")
	      .attr("transform", "rotate(-90)")
	      .attr("y", 0 - margin.left-15)
	      .attr("x",0 - (height / 2)-margin)
	      .attr("dy", "1em")
	      .style("text-anchor", "middle")
	      .text("Ocorrências");  

	function mouseover_bar(d){
		var dados_totais = get_ocorrencias_totais();
		
		div_bar.transition()       
				.duration(200)      
				.style("opacity", .9);

		div_bar.html(d)
				.style("left", (d3.event.pageX) + "px")     
				.style("top", (d3.event.pageY - 28) + "px")      
				.style("height", 20 + "px")      
				.style("background", "black")      
				.style("color", "white")      
	}

	function mouseout_bar(d){
		 div_bar.transition()       
				.duration(200)
				.style("opacity", .0);
	}
}

function atualiza_barras(cidade, ano){
	$(".chart").empty();

	if(cidade != null && ano != null){
			var data = get_ocorrencias_meses(cidade, ano);
		if(data != null){
			desenha_barras(data, cidade, ano);
		} else {
			alert(cidade + " não possui dados sobre ocorrências");
		}
	}	
}